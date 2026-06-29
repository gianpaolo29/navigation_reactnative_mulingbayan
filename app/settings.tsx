import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

type SettingRowProps = {
  iconColor: string;
  label: string;
  value?: string;
};

function SettingRow({ iconColor, label, value }: SettingRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconDot, { backgroundColor: iconColor }]} />
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        <MaterialIcons name="chevron-right" size={22} color="#ccc" />
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>JM</Text>
          </View>
          <Text style={styles.profileName}>Jason Magsino</Text>
          <Text style={styles.editProfile}>Edit Profile</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFILE</Text>
          <View style={styles.card}>
            <SettingRow iconColor="#4DD0E1" label="Active Status" value="On" />
            <View style={styles.divider} />
            <SettingRow iconColor="#2196F3" label="Username" value="m.me/johndoe" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.card}>
            <SettingRow iconColor="#F44336" label="Notifications & Sounds" value="On" />
            <View style={styles.divider} />
            <SettingRow iconColor="#212121" label="Dark Mode" value="System" />
            <View style={styles.divider} />
            <SettingRow iconColor="#4CAF50" label="Data Saver" value="Off" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT & LEGAL</Text>
          <View style={styles.card}>
            <SettingRow iconColor="#BDBDBD" label="Account Settings" />
            <View style={styles.divider} />
            <SettingRow iconColor="#FF9800" label="Report Technical Problem" />
            <View style={styles.divider} />
            <SettingRow iconColor="#BDBDBD" label="Legal & Policies" />
          </View>
        </View>

        <Text style={styles.versionText}>Messenger Clone v1.0.0</Text>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => router.push('/(tabs)')}>
        <MaterialIcons name="keyboard-return" size={24} color="#3B82F6" />
        <Text style={styles.backText}>Back to Chats</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  editProfile: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 14,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    fontSize: 15,
    color: '#999',
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 62,
  },
  versionText: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontSize: 14,
    marginTop: 30,
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
    gap: 6,
  },
  backText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3B82F6',
  },
});
