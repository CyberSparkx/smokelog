// Single source of truth for design tokens. Import from here instead of
// hardcoding hex values in individual component style files, so the app
// theme can be changed in one place.

export const theme = {
  background: '#0F1115',
  card: '#171A21',
  cardBorder: '#242832',
  cardBorderStrong: '#2E3340',

  accent: '#a3473b', // primary brand / CTA color
  accentPressed: '#76392f', // slightly darker, for pressed/active states
  accentSoft: 'rgba(255, 107, 87, 0.12)',

  live: '#4ADE80',
  warning: '#F5A623',
  warningSoft: 'rgba(245, 166, 35, 0.12)',

  textPrimary: '#F5F6F8',
  textSecondary: '#8B93A3',
  textFaint: '#565D6B',
  textOnAccent: '#FFFFFF',

  divider: '#242832',
};

export type Theme = typeof theme;