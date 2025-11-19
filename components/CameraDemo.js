import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CameraDemo({ status }) {
  const granted = status === 'granted';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Camera demo</Text>
      {granted ? (
        <Text style={styles.text}>
          Camera permission is <Text style={styles.strong}>granted</Text>. You can now show a
          camera preview or open a camera screen from here.
        </Text>
      ) : (
        <Text style={styles.text}>
          Grant the <Text style={styles.strong}>Camera</Text> permission above to enable this
          demo.
        </Text>
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
});


