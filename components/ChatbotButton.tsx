 import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // ✅ useRouter instead of useNavigation

export default function ChatbotButton() {
  const router = useRouter(); // ✅ hook

  return (
    <TouchableOpacity
      style={styles.button}
     // onPress={() => router.push('/chatbot-screen')} // ✅ Use .push and path string
    >
      <Image
        source={require('../assets/images/chatbot.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 100,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 6,
    elevation: 8,
  },
  image: {
    width: 60,
    height: 60,
  },
});
