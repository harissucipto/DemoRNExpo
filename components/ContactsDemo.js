import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsDemo({ status }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'granted') {
      setLoading(true);
      setError(null);
      Contacts.getContactsAsync({
        pageSize: 3,
        sort: Contacts.SortTypes.FirstName,
      })
        .then((result) => setContacts(result.data ?? []))
        .catch((err) => setError(err?.message ?? 'Failed to read contacts'))
        .finally(() => setLoading(false));
    } else {
      setContacts([]);
      setError(null);
      setLoading(false);
    }
  }, [status]);

  const granted = status === 'granted';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Contacts demo</Text>
      {!granted && (
        <Text style={styles.text}>
          Grant the <Text style={styles.strong}>Contacts</Text> permission above to read a few
          sample contacts.
        </Text>
      )}
      {granted && loading && (
        <View style={styles.row}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={[styles.text, styles.loadingText]}>Loading contacts…</Text>
        </View>
      )}
      {granted && !loading && error && (
        <Text style={[styles.text, styles.errorText]}>{error}</Text>
      )}
      {granted && !loading && contacts.length > 0 && (
        <View style={styles.list}>
          {contacts.map((contact) => (
            <Text key={contact.id} style={styles.text}>
              {contact.name || 'Unnamed contact'}
            </Text>
          ))}
        </View>
      )}
      {granted && !loading && !error && contacts.length === 0 && (
        <Text style={styles.text}>No contacts found on this device.</Text>
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


