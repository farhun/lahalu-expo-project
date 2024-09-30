import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Gap } from '@/components/Gap';

interface Topic {
  id: string;
  name: string;
  members: string;
  description: string;
  image: any;
}

const topics: Topic[] = [
  {
    id: '1',
    name: 'User #~αʳdøм',
    members: '240+ member',
    description: 'Topik ini dibuat untuk para orang random 😂😂😂 (sawer 5 koin kalo original)',
    image: require('../../assets/images/categories/relate.jpg'),
  },
  {
    id: '2',
    name: 'Lahelu Big Family topic',
    members: '250+ member',
    description: 'Sama aja kayak yang di wa',
    image: require('../../assets/images/categories/relate.jpg'),
  },
  {
    id: '3',
    name: 'Meme original',
    members: '1,300+ member',
    description: 'Komunitas pembuat meme original. bukan meme repost atau daur ulang, tunjukan kreasimu disini.',
    image: require('../../assets/images/categories/relate.jpg'),
  },
  {
    id: '4',
    name: 'Komunitas user random',
    members: '270+ member',
    description: '',
    image: require('../../assets/images/categories/relate.jpg'),
  },
];

export default function TopikScreen() {
  const [selectionBar, setSelectionBar] = useState('Topik');

  const renderItem = ({ item }: { item: Topic }) => (
    <View style={styles.topicContainer}>
      <Image source={item.image} style={styles.topicImage} />
      <View style={styles.topicInfo}>
        <Text style={styles.topicName}>{item.name}</Text>
        <Text style={styles.topicMembers}>{item.members}</Text>
        <Text style={styles.topicDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Gabung</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Selection Bar Section */}
      <View style={styles.selectionBarContainer}>
        {['Topik', 'Sudah Gabung'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setSelectionBar(item)}
            style={[styles.selectionBarItem, selectionBar === item ? styles.selectionBarSelected : null]}
          >
            <Text style={selectionBar === item ? styles.selectionBarSelectedText : styles.selectionBarNotSelectedText}>
              {item}
            </Text>
            <Gap height={5} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Topic List */}
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flatListContent: {
    paddingBottom: 20, // Avoid content being too close to the bottom
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topicImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  topicInfo: {
    flex: 1,
    marginLeft: 15,
  },
  topicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  topicMembers: {
    fontSize: 14,
    color: '#666',
  },
  topicDescription: {
    fontSize: 12,
    color: '#888',
  },
  joinButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectionBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  selectionBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  selectionBarSelected: {
    borderBottomWidth: 3,
    borderBottomColor: '#55a4ff',
  },
  selectionBarSelectedText: {
    color: '#55a4ff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  selectionBarNotSelectedText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});