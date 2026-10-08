import { IAEStep } from '../models/ArtisanProfile';

export function defaultAEJourney(): IAEStep[] {
  return [
    {
      key: 'cin',
      title: { fr: 'CIN vérifiée', ar: 'بطاقة التعريف موثّقة' },
      sub: { fr: 'En cours', ar: 'جارية' },
      state: 'now',
    },
    {
      key: 'e-houwiya',
      title: { fr: 'E-Houwiya activée', ar: 'الهوية الرقمية فعالة' },
      sub: { fr: 'À venir', ar: 'قريبا' },
      state: 'upcoming',
    },
    {
      key: 'ae-card',
      title: { fr: 'Demande de carte envoyée', ar: 'طلب البطاقة مبعوث' },
      sub: { fr: 'À venir', ar: 'قريبا' },
      state: 'upcoming',
    },
    {
      key: 'cnss',
      title: { fr: 'Couverture CNSS', ar: 'تغطية الصندوق الاجتماعي' },
      sub: { fr: 'En attente de la carte', ar: 'في انتظار البطاقة' },
      state: 'upcoming',
    },
  ];
}
