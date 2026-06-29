import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0032fb',
        tabBarInactiveTintColor: '#999',
        headerStyle: { backgroundColor: '#5B21B6' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitle: 'Stack Navigation',
        headerLeft: () => (
          <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons
              name="menu"
              size={28}
              color="#fff"
              style={{ marginLeft: 16 }}
            />
          </Pressable>
        ),
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="message-processing-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'People',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
