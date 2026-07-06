import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },

  item: {
    backgroundColor: '#1F1F1F',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  day: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  time: {
    marginTop: 4,
    fontSize: 14,
    color: '#A1A1AA',
  },

  rightContainer: {
    alignItems: 'flex-end',
  },

  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  year: {
    marginTop: 4,
    fontSize: 14,
    color: '#A1A1AA',
  },

  separator: {
    height: 12,
  },

  empty: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 16,
    color: '#9CA3AF',
  },
});

export default styles;