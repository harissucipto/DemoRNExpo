import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as Calendar from 'expo-calendar';
import CameraDemo from './components/CameraDemo';
import LocationDemo from './components/LocationDemo';
import ContactsDemo from './components/ContactsDemo';
import CalendarDemo from './components/CalendarDemo';
import FormDemo from './components/FormDemo';

const PERMISSIONS = [
  {
    id: 'camera',
    label: 'Camera',
    description: 'Needed to take photos or scan barcodes.',
    request: async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return status;
    },
  },
  {
    id: 'location',
    label: 'Location (Foreground)',
    description: 'Used for location-aware features like nearby stores.',
    request: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status;
    },
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Lets the app read your contacts to help with sharing or invites.',
    request: async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      return status;
    },
  },
  {
    id: 'calendar',
    label: 'Calendar',
    description: 'Allows reading your calendars for scheduling and reminders.',
    request: async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      return status;
    },
  },
];

export default function App() {
  const [statuses, setStatuses] = useState(
    PERMISSIONS.reduce((acc, curr) => {
      acc[curr.id] = 'unknown';
      return acc;
    }, {}),
  );

  const [lastFormSubmission, setLastFormSubmission] = useState(null);

  const handleRequest = async (permission) => {
    setStatuses((prev) => ({ ...prev, [permission.id]: 'checking…' }));
    try {
      const status = await permission.request();
      setStatuses((prev) => ({ ...prev, [permission.id]: status }));
    } catch (error) {
      setStatuses((prev) => ({ ...prev, [permission.id]: 'error' }));
      console.warn(`Failed requesting ${permission.id}:`, error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
      <Text style={styles.heading}>Permission Playground</Text>
      <Text style={styles.subheading}>
        Tap a card to request that permission. Use this as a Snack template to
        verify behavior on-device.
      </Text>

      {PERMISSIONS.map((permission) => (
        <Pressable
          key={permission.id}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => handleRequest(permission)}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{permission.label}</Text>
              <Text style={styles.cardDescription}>
                {permission.description}
              </Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>
                {statuses[permission.id] ?? 'unknown'}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}

      <View style={styles.demoSection}>
        <Text style={styles.demoHeading}>Demos (after permission granted)</Text>
        <CameraDemo status={statuses.camera} />
        <LocationDemo status={statuses.location} />
        <ContactsDemo status={statuses.contacts} />
        <CalendarDemo status={statuses.calendar} />
      </View>

        <View style={styles.demoSection}>
          <Text style={styles.demoHeading}>Form & Props/State Demo</Text>
          <FormDemo
            title="Simple registration form"
            onSubmitForm={setLastFormSubmission}
            lastSubmitted={lastFormSubmission}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  container: {
    flexGrow: 1,
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusPill: {
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textTransform: 'uppercase',
  },
  demoSection: {
    marginTop: 24,
  },
  demoHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
});
