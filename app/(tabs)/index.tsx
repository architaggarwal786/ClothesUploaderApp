 import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#D15B9B', '#9B46E6']} // Pink to Purple Gradient
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to ClothesUploaderApp 👕</Text>
      <Text style={styles.subtitle}>
        Use the tabs below to upload clothes or explore more.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#fff', // White text to contrast with gradient background
  },
  subtitle: {
    fontSize: 18,
    color: '#fff', // White text for the subtitle
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
