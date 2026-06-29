import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const MESSAGES = [
  {
    id: '1',
    name: 'Doc Calvin Placio',
    preview: 'Ayan, mas mabuti para mabilis natin ma-finalize...',
  },
  {
    id: '2',
    name: 'Doc Harrold Chaps',
    preview: 'Sige, i-send mo na lang sa email ko yung draft.',
  },
  {
    id: '3',
    name: 'Doc Oliver',
    preview: 'Naka-leave ako bukas, sa Huwebes na natin ituloy...',
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filtered = MESSAGES.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <EvilIcons
            name="search"
            size={24}
            color="#999"
            style={styles.searchIcon}
        />

        <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Message List</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.messageRow}
            onPress={() => router.push({ pathname: '/(tabs)/chat/[id]', params: { id: item.id, name: item.name } })}
          >
            <View style={styles.avatar} />
            <View style={styles.messageContent}>
              <Text style={styles.messageName}>{item.name}</Text>
              <Text style={styles.messagePreview} numberOfLines={1}>
                {item.preview}
              </Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#000',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d9d9d9',
    marginRight: 14,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 3,
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 80,
  },
});
