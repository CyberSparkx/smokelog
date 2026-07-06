import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0F1115',
  card: '#171A21',
  cardBorder: '#242832',
  accent: '#FF6B57',
  accentSoft: 'rgba(255, 107, 87, 0.12)',
  live: '#4ADE80',
  warning: '#F5A623',
  warningSoft: 'rgba(245, 166, 35, 0.12)',
  textPrimary: '#F5F6F8',
  textSecondary: '#8B93A3',
  textFaint: '#565D6B',
  divider: '#242832',
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 28,
    paddingHorizontal: 24,
    // Soft elevated shadow, iOS + Android
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },

  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.live,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.live,
    letterSpacing: 0.4,
  },

  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    gap: 6,
  },
  warningDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.warning,
  },
  warningText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.warning,
    letterSpacing: 0.4,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 6,
  },
  timeSegment: {
    alignItems: 'center',
    minWidth: 58,
  },
  timeValue: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  timeUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textFaint,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  timeColon: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textFaint,
    marginHorizontal: 2,
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 20,
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footerValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '700',
  },

  accentBar: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.accent,
    opacity: 0.9,
  },
});