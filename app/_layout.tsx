import { View, Text, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { MessagesProvider } from '@/context/messages-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={drawerStyles.title}>Drawer Menus</Text>
      <View style={drawerStyles.divider} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const drawerStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 4,
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <MessagesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerActiveTintColor: '#5B21B6',
            drawerActiveBackgroundColor: '#F3E8FF',
            headerShown: false,
            drawerLabelStyle: { fontSize: 16 },
          }}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Home',
              headerShown: false,
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Account Settings',
              headerShown: true,
              headerStyle: { backgroundColor: '#5B21B6' },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="modal"
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </MessagesProvider>
  );
}
