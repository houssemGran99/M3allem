import { Lang } from '../i18n/translations';

const UNITS_FR = { justNow: "à l'instant", min: (n: number) => `il y a ${n} min`, h: (n: number) => `il y a ${n}h`, d: (n: number) => `il y a ${n}j` };
const UNITS_AR = { justNow: 'الآن', min: (n: number) => `من ${n} دقيقة`, h: (n: number) => `من ${n} ساعة`, d: (n: number) => `من ${n} يوم` };

export function timeAgo(iso: string, lang: Lang): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const units = lang === 'ar' ? UNITS_AR : UNITS_FR;

  if (minutes < 1) return units.justNow;
  if (minutes < 60) return units.min(minutes);
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return units.h(hours);
  const days = Math.floor(hours / 24);
  return units.d(days);
}
