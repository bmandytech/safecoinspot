// BiometricLogin.js
import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricLogin() {
  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Error', 'Biometric authentication is not available');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      Alert.alert('Success', 'You are authenticated!');
      // TODO: Navigate or log the user in
    } else {
      Alert.alert('Failed', 'Authentication failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Login</Text>
      <Button title="Login with Face ID / Fingerprint" onPress={handleBiometricAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2f3542',
  },
});