import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db';
import { User } from '../models/User';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { Category } from '../models/Category';
import { CreditPack } from '../models/CreditPack';
import { ServiceRequest } from '../models/ServiceRequest';
import { Quote } from '../models/Quote';
import { Review } from '../models/Review';
import { CreditTransaction } from '../models/CreditTransaction';

const CATEGORIES = [
  { slug: 'plumbing', name: { fr: 'Plomberie', ar: 'السباكة' }, icon: 'droplet', tint: 'blue' as const },
  { slug: 'electrical', name: { fr: 'Électricité', ar: 'الكهرباء' }, icon: 'zap', tint: 'amber' as const },
  { slug: 'cleaning', name: { fr: 'Ménage', ar: 'التنظيف' }, icon: 'wind', tint: 'brand' as const },
  { slug: 'handyman', name: { fr: 'Bricolage', ar: 'إصلاحات' }, icon: 'tool', tint: 'sub' as const },
  { slug: 'climate', name: { fr: 'Climatisation', ar: 'التكييف' }, icon: 'thermometer', tint: 'sub' as const },
  { slug: 'paint', name: { fr: 'Peinture', ar: 'الصباغة' }, icon: 'edit-3', tint: 'sub' as const },
];

const CREDIT_PACKS = [
  { name: { fr: 'Découverte', ar: 'تجربة' }, credits: 10, price: 20, popular: false },
  { name: { fr: 'Artisan', ar: 'صنايعي' }, credits: 30, price: 45, popular: true },
  { name: { fr: 'Pro', ar: 'برو' }, credits: 60, price: 80, popular: false },
];

const DEMO_PASSWORD = 'password123';

async function wipe() {
  await Promise.all([
    User.deleteMany({}),
    ArtisanProfile.deleteMany({}),
    Category.deleteMany({}),
    CreditPack.deleteMany({}),
    ServiceRequest.deleteMany({}),
    Quote.deleteMany({}),
    Review.deleteMany({}),
    CreditTransaction.deleteMany({}),
  ]);
}

async function seed() {
  await connectDB();
  console.log('[seed] wiping existing data...');
  await wipe();

  console.log('[seed] creating categories...');
  const categories = await Category.insertMany(CATEGORIES);
  const plumbing = categories.find((c) => c.slug === 'plumbing')!;

  console.log('[seed] creating credit packs...');
  await CreditPack.insertMany(CREDIT_PACKS);

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  console.log('[seed] creating demo client...');
  const client = await User.create({
    name: 'Amira Haddad',
    email: 'amira.haddad@email.com',
    passwordHash,
    role: 'client',
    phone: '+216 20 123 456',
    city: 'Tunis',
    language: 'fr',
  });

  console.log('[seed] creating demo artisans...');
  const mohamedUser = await User.create({
    name: 'Mohamed Belhaj',
    email: 'mohamed.belhaj@email.com',
    passwordHash,
    role: 'worker',
    phone: '+216 22 987 654',
    city: 'Tunis',
    language: 'fr',
  });

  await ArtisanProfile.create({
    user: mohamedUser._id,
    roleLabel: { fr: 'Plombier · Menzah', ar: 'صبّاب · المنزه' },
    categories: [plumbing._id],
    area: 'Menzah 6',
    priceMin: 30,
    priceMax: 50,
    verified: true,
    credentials: [
      { type: 'cin', label: { fr: 'CIN vérifiée', ar: 'بطاقة تعريف موثوقة' }, status: 'live' },
      { type: 'ae', label: { fr: 'Auto-entrepreneur n° AE-2026-0417', ar: 'بطاقة صانع حر رقم AE-2026-0417' }, status: 'live' },
      { type: 'referral', label: { fr: 'Parrainé par Ahmed T., artisan vérifié', ar: 'معرّف من طرف أحمد ت.، صنايعي موثوق' }, status: 'live' },
      { type: 'cnss', label: { fr: 'Couverture CNSS active', ar: 'تغطية الصندوق الاجتماعي نشطة' }, status: 'live' },
    ],
    ratingSum: 700.7,
    ratingCount: 143,
    jobCount: 62,
    completionPct: 98,
    onTimePct: 96,
    replyTimeMinutes: 45,
    creditBalance: 12,
    aeJourney: [
      { key: 'cin', title: { fr: 'CIN vérifiée', ar: 'بطاقة التعريف موثّقة' }, sub: { fr: 'Terminé', ar: 'كمل' }, state: 'done' },
      { key: 'e-houwiya', title: { fr: 'E-Houwiya activée', ar: 'الهوية الرقمية فعالة' }, sub: { fr: 'Terminé', ar: 'كمل' }, state: 'done' },
      { key: 'ae-card', title: { fr: 'Demande de carte envoyée', ar: 'طلب البطاقة مبعوث' }, sub: { fr: 'Réponse sous 15 jours', ar: 'الرد خلال 15 يوم' }, state: 'now' },
      { key: 'cnss', title: { fr: 'Couverture CNSS', ar: 'تغطية الصندوق الاجتماعي' }, sub: { fr: 'En attente de la carte', ar: 'في انتظار البطاقة' }, state: 'upcoming' },
    ],
  });

  const hediUser = await User.create({
    name: 'Hedi Karray',
    email: 'hedi.karray@email.com',
    passwordHash,
    role: 'worker',
    city: 'Tunis',
    language: 'fr',
  });
  await ArtisanProfile.create({
    user: hediUser._id,
    roleLabel: { fr: 'Plombier · Ennasr', ar: 'صبّاب · النصر' },
    categories: [plumbing._id],
    area: 'Ennasr',
    priceMin: 25,
    priceMax: 45,
    verified: true,
    credentials: [{ type: 'cin', label: { fr: 'CIN vérifiée', ar: 'بطاقة تعريف موثوقة' }, status: 'live' }],
    ratingSum: 451.2,
    ratingCount: 96,
    jobCount: 40,
    creditBalance: 6,
  });

  const walidUser = await User.create({
    name: 'Walid Trabelsi',
    email: 'walid.trabelsi@email.com',
    passwordHash,
    role: 'worker',
    city: 'Tunis',
    language: 'fr',
  });
  await ArtisanProfile.create({
    user: walidUser._id,
    roleLabel: { fr: 'Plombier · La Marsa', ar: 'صبّاب · المرسى' },
    categories: [plumbing._id],
    area: 'La Marsa',
    priceMin: 25,
    priceMax: 40,
    verified: false,
    creditBalance: 3,
    ratingSum: 142.6,
    ratingCount: 31,
    jobCount: 18,
  });

  console.log('[seed] creating a demo service request with quotes...');
  const request = await ServiceRequest.create({
    client: client._id,
    category: plumbing._id,
    description:
      "Fuite sous l'évier de la cuisine depuis ce matin, j'ai mis une bassine en attendant. Le robinet d'arrêt est sous l'escalier.",
    photos: [],
    address: { line: 'Rue 12, Menzah 6', city: 'Tunis' },
    budgetMin: 30,
    budgetMax: 50,
    status: 'open',
    unlockedBy: [mohamedUser._id, hediUser._id],
  });

  await Quote.create([
    { request: request._id, artisan: mohamedUser._id, price: 35, timeSlot: "Aujourd'hui, 15h", message: "Je peux passer avant 16h, j'ai le matériel" },
    { request: request._id, artisan: hediUser._id, price: 40, timeSlot: 'Demain, 9h', message: 'Disponible demain matin si besoin' },
  ]);

  console.log('[seed] creating a completed request with a review...');
  const pastRequest = await ServiceRequest.create({
    client: client._id,
    category: plumbing._id,
    description: 'Remplacement du joint de robinet dans la salle de bain.',
    photos: [],
    address: { line: 'Rue 12, Menzah 6', city: 'Tunis' },
    status: 'completed',
  });
  const pastQuote = await Quote.create({
    request: pastRequest._id,
    artisan: mohamedUser._id,
    price: 30,
    timeSlot: 'Le 2 mars',
    status: 'accepted',
  });
  pastRequest.acceptedQuote = pastQuote._id;
  await pastRequest.save();
  await Review.create({
    request: pastRequest._id,
    client: client._id,
    artisan: mohamedUser._id,
    rating: 5,
    text: "Arrivé à l'heure, il m'a montré le joint cassé avant de le remplacer. A tout nettoyé après.",
  });

  console.log('\n[seed] done. Demo accounts (password for all: "%s"):', DEMO_PASSWORD);
  console.log('  client: amira.haddad@email.com');
  console.log('  worker: mohamed.belhaj@email.com (verified, 12 credits)');
  console.log('  worker: hedi.karray@email.com');
  console.log('  worker: walid.trabelsi@email.com');

  await disconnectDB();
}

seed().catch((err) => {
  console.error('[seed] failed', err);
  process.exit(1);
});
