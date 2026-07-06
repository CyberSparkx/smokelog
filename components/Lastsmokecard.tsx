import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, AppState, AppStateStatus } from 'react-native';
import { styles, colors } from '../styles/Lastsmokecard.styles';

interface LastSmokeCardProps {
  lastSmokedAt: number | null;
}

interface Elapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ONE_SECOND = 1000;


const MIN_VALID_TIMESTAMP = new Date('2020-01-01T00:00:00Z').getTime();
const FUTURE_TOLERANCE_MS = 5 * 60 * 1000; // allow 5 min of clock skew

function isValidTimestamp(value: unknown, nowTs: number): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= MIN_VALID_TIMESTAMP &&
    value <= nowTs + FUTURE_TOLERANCE_MS
  );
}

function getElapsed(fromTs: number, nowTs: number): Elapsed {
  const diffMs = Math.max(0, nowTs - fromTs);
  const totalSeconds = Math.floor(diffMs / ONE_SECOND);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatClockTime(ts: number): string {
  const date = new Date(ts);
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

const LastSmokeCard: React.FC<LastSmokeCardProps> = ({ lastSmokedAt }) => {
  const [now, setNow] = useState(() => Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(Date.now()), ONE_SECOND);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const onChange = (state: AppStateStatus) => {
      if (state === 'active') setNow(Date.now());
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  if (lastSmokedAt === null) {
    return (
      <View style={styles.card}>
        <View style={styles.accentBar} />
        <View style={styles.headerRow}>
          <Text style={styles.eyebrow}>Time since last</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={{ paddingVertical: 24, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.textSecondary,
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            No cigarettes logged yet.{'\n'}Tap the button below to start tracking.
          </Text>
        </View>
      </View>
    );
  }

  if (!isValidTimestamp(lastSmokedAt, now)) {
    if (__DEV__) {
      console.warn(
        `[LastSmokeCard] Ignored invalid lastSmokedAt value:`,
        lastSmokedAt
      );
    }
    return (
      <View style={styles.card}>
        <View style={[styles.accentBar, { backgroundColor: colors.warning }]} />
        <View style={styles.headerRow}>
          <Text style={styles.eyebrow}>Time since last</Text>
          <View style={styles.warningBadge}>
            <View style={styles.warningDot} />
            <Text style={styles.warningText}>DATA ISSUE</Text>
          </View>
        </View>

        <View style={{ paddingVertical: 24, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.textSecondary,
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            We couldn&apos;t read your last log time.{'\n'}Log a new one to reset tracking.
          </Text>
        </View>
      </View>
    );
  }

  const { days, hours, minutes, seconds } = getElapsed(lastSmokedAt, now);
  const showDays = days > 0;

  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />

      <View style={styles.headerRow}>
        <Text style={styles.eyebrow}>Time since last</Text>
        <View style={styles.liveBadge}>
          <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.timeRow}>
        {showDays && (
          <>
            <View style={styles.timeSegment}>
              <Text style={styles.timeValue}>{days}</Text>
              <Text style={styles.timeUnit}>{days === 1 ? 'day' : 'days'}</Text>
            </View>
            <Text style={styles.timeColon}>:</Text>
          </>
        )}

        <View style={styles.timeSegment}>
          <Text style={styles.timeValue}>{pad(hours)}</Text>
          <Text style={styles.timeUnit}>hrs</Text>
        </View>
        <Text style={styles.timeColon}>:</Text>

        <View style={styles.timeSegment}>
          <Text style={styles.timeValue}>{pad(minutes)}</Text>
          <Text style={styles.timeUnit}>min</Text>
        </View>
        <Text style={styles.timeColon}>:</Text>

        <View style={styles.timeSegment}>
          <Text style={styles.timeValue}>{pad(seconds)}</Text>
          <Text style={styles.timeUnit}>sec</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <Text style={styles.footerLabel}>Last logged</Text>
        <Text style={styles.footerValue}>{formatClockTime(lastSmokedAt)}</Text>
      </View>
    </View>
  );
};

export default LastSmokeCard;
