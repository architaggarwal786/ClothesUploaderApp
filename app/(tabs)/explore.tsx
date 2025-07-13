import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'; // 👈 add this

const BACKEND_URL = 'http://192.168.158.139:5000';

const ExploreScreen = () => {
  const [clothes, setClothes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // 👈 detect tab focus

  const fetchClothes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/clothes`);
      setClothes(res.data.reverse());
    } catch (err) {
      console.error('❌ Failed to fetch clothes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true); // show spinner on tab re-focus
      fetchClothes();
    }
  }, [isFocused]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.images[0]?.path }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>{item.type} - {item.subType}</Text>
      <Text style={styles.meta}>{item.gender}, {item.season}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#000" style={{ marginTop: 100 }} />;

  return (
    <FlatList
      data={clothes}
      keyExtractor={(item) => item._id?.toString() || item.id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 6,
    padding: 8,
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
  text: {
    fontWeight: '600',
    marginTop: 8,
  },
  meta: {
    fontSize: 12,
    color: '#555',
  },
});

export default ExploreScreen;
