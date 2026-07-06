import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from '../styles/SmokeHistory.styles';

export type SmokeLog = {
  id: string;
  loggedAt: string;
};

type SmokeHistoryProps = {
  logs: SmokeLog[];
};

const SmokeHistory: React.FC<SmokeHistoryProps> = ({ logs }) => {
  const formatDay = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });

  const formatYear = (date: Date) =>
    date.getFullYear().toString();

  const renderItem = ({ item }: { item: SmokeLog }) => {
    const date = new Date(item.loggedAt);

    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.day}>{formatDay(date)}</Text>
          <Text style={styles.time}>{formatTime(date)}</Text>
        </View>

        <View style={styles.rightContainer}>
          <Text style={styles.date}>{formatDate(date)}</Text>
          <Text style={styles.year}>{formatYear(date)}</Text>
        </View>
      </View>
    );
  };

  return (

    <FlatList
      data={logs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.empty}>No cigarettes logged yet 🚭</Text>
      }
    />
  );
};

export default SmokeHistory;