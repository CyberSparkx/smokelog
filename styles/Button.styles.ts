import { StyleSheet, TextStyle } from 'react-native';
import { theme } from './Theme';

export const baseTextStyle: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
};

export const textStyles = StyleSheet.create({
  primary: {
    color: theme.textOnAccent,
  },
  secondary: {
    color: theme.textPrimary,
  },
  ghost: {
    color: theme.accent,
  },
});

export const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    backgroundColor: theme.accent,
    shadowColor: theme.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  secondary: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.cardBorderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.accent,
  },
  disabled: {
    opacity: 0.5,
  },
});