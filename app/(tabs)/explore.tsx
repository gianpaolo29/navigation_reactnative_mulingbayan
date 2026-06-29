import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const PEOPLE = [
  { id: '1', name: 'Doc Calvin Placio', specialization: 'Cardiologist' },
  { id: '2', name: 'Doc Harrold Chaps', specialization: 'Pediatrician' },
  { id: '3', name: 'Doc Oliver', specialization: 'General Physician' },
  { id: '4', name: 'Dr. Maria Santos', specialization: 'Dermatologist' },
  { id: '5', name: 'Dr. Arnel Mendoza', specialization: 'Neurologist' },
];

export default function PeopleScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filtered = PEOPLE.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialization.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search people or specialization"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>ACTIVE NOW ({filtered.length})</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.personRow}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar} />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{item.name}</Text>
              <Text style={styles.personSpec}>{item.specialization}</Text>
            </View>
            <Pressable onPress={() => router.push({ pathname: '/(tabs)/chat/[id]', params: { id: item.id, name: item.name } })}>
              <AntDesign name="message" size={24} color="#3B82F6" />
            </Pressable>
          </View>
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
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d9d9d9',
  },
  onlineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 3,
  },
  personSpec: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 80,
  },
});
