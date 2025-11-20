import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function FormDemo({ title, onSubmitForm, lastSubmitted }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const [submitError, setSubmitError] = useState('');

  const validateName = (value) => {
    const trimmed = value.trim();
    let message = '';

    if (!trimmed) {
      message = 'Name is required.';
    } else if (trimmed.length < 2) {
      message = 'Name must be at least 2 characters.';
    }

    setErrors((prev) => ({ ...prev, name: message }));
    return !message;
  };

  const validateEmail = (value) => {
    const trimmed = value.trim();
    let message = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      message = 'Email is required.';
    } else if (!emailRegex.test(trimmed)) {
      message = 'Please enter a valid email address.';
    }

    setErrors((prev) => ({ ...prev, email: message }));
    return !message;
  };

  const validate = () => {
    const okName = validateName(name);
    const okEmail = validateEmail(email);

    if (!okName && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (okName && !okEmail && emailInputRef.current) {
      emailInputRef.current.focus();
    }

    return okName && okEmail;
  };

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) {
      setSubmitError('Please fix the fields highlighted in red before submitting.');
      return;
    }

    setSubmitError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    onSubmitForm({ name: trimmedName, email: trimmedEmail });
    setName('');
    setEmail('');
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        ref={nameInputRef}
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          validateName(text);
        }}
      />
      {errors.name ? <Text style={styles.fieldError}>{errors.name}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        ref={emailInputRef}
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.fieldError}>{errors.email}</Text> : null}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

      {lastSubmitted && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Last submitted from parent state:</Text>
          <Text style={styles.summaryText}>Name: {lastSubmitted.name}</Text>
          <Text style={styles.summaryText}>Email: {lastSubmitted.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  inputError: {
    borderColor: '#b91c1c',
    backgroundColor: '#fef2f2',
  },
  fieldError: {
    color: '#b91c1c',
    marginTop: 4,
    fontSize: 13,
  },
  button: {
    marginTop: 16,
    borderRadius: 999,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  submitError: {
    color: '#b91c1c',
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
  },
  summaryCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1d4ed8',
  },
  summaryText: {
    fontSize: 13,
    color: '#1f2937',
  },
});


