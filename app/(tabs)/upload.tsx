 import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const BACKEND_URL = 'http://192.168.158.139:5000';

const UploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;
    setUploading(true);

    const formData = new FormData();
    const filename = imageUri.split('/').pop()!;
    const type = `image/${filename.split('.').pop()}`;

    formData.append('images', {
      uri: imageUri,
      name: filename,
      type,
    } as any);
console.log("Uploading image: ", imageUri);

    try {
      const res = await axios.post(`${BACKEND_URL}/upload-clothes`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Upload Successful', 'Clothes info detected and uploaded automatically!');
    } catch (err) {
      console.error(err);
      Alert.alert('Upload Failed', 'Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Pick an Image" onPress={pickImage} />
      <Button title="Upload" onPress={uploadImage} disabled={!imageUri || uploading} />
      {uploading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default UploadScreen;
