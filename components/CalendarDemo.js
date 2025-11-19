import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function CalendarDemo({ status }) {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'granted') {
      setLoading(true);
      setError(null);
      Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
        .then((result) => setCalendars(result ?? []))
        .catch((err) => setError(err?.message ?? 'Failed to read calendars'))
        .finally(() => setLoading(false));
    } else {
      setCalendars([]);
      setError(null);
      setLoading(false);
    }
  }, [status]);

  const granted = status === 'granted';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Calendar demo</Text>
      {!granted && (
        <Text style={styles.text}>
          Grant the <Text style={styles.strong}>Calendar</Text> permission above to see available
          calendars.
        </Text>
      )}
      {granted && loading && (
        <View style={styles.row}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={[styles.text, styles.loadingText]}>Loading calendars…</Text>
        </View>
      )}
      {granted && !loading && error && (
        <Text style={[styles.text, styles.errorText]}>{error}</Text>
      )}
      {granted && !loading && calendars.length > 0 && (
        <View style={styles.list}>
          {calendars.slice(0, 3).map((calendar) => (
            <Text key={calendar.id} style={styles.text}>
              {calendar.title || 'Untitled calendar'}
            </Text>
          ))}
        </View>
      )}
      {granted && !loading && !error && calendars.length === 0 && (
        <Text style={styles.text}>No calendars found on this device.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#4b5563',
  },
  strong: {
    fontWeight: '700',
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
  errorText: {
    color: '#b91c1c',
  },
  list: {
    marginTop: 4,
  },
});


