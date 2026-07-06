import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatCardProps = {
  count: number;
  label: string;
};

const StatCard: React.FC<StatCardProps> = ({ count, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>
        Cigarette{count !== 1 ? 's' : ''} {label}
      </Text>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    color: '#B3B3B3',
    textAlign: 'center',
  },
});