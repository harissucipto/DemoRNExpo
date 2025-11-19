import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function LocationDemo({ status }) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'granted') {
      setLoading(true);
      setError(null);
      Location.getCurrentPositionAsync({})
        .then((pos) => setPosition(pos))
        .catch((err) => setError(err?.message ?? 'Failed to fetch location'))
        .finally(() => setLoading(false));
    } else {
      setPosition(null);
      setError(null);
      setLoading(false);
    }
  }, [status]);

  const granted = status === 'granted';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Location demo</Text>
      {!granted && (
        <Text style={styles.text}>
          Grant the <Text style={styles.strong}>Location</Text> permission above to see your
          current coordinates.
        </Text>
      )}
      {granted && loading && (
        <View style={styles.row}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={[styles.text, styles.loadingText]}>Getting current position…</Text>
        </View>
      )}
      {granted && !loading && error && (
        <Text style={[styles.text, styles.errorText]}>{error}</Text>
      )}
      {granted && !loading && position && (
        <View style={styles.coords}>
          <Text style={styles.text}>
            <Text style={styles.strong}>Latitude:</Text> {position.coords.latitude.toFixed(5)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>Longitude:</Text> {position.coords.longitude.toFixed(5)}
          </Text>
        </View>
      )}
      {granted && !loading && !position && !error && (
        <Text style={styles.text}>Location is granted, but no coordinates yet.</Text>
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
    gap: 8,
  },
  loadingText: {
    marginLeft: 8,
  },
  errorText: {
    color: '#b91c1c',
  },
  coords: {
    marginTop: 4,
  },
});


