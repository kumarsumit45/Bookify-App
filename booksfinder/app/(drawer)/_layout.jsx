import { View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeStore } from '../../store/themeStore';

const DrawerLayout = () => {
  const { colors } = useThemeStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.textDark,
          drawerStyle: {
            backgroundColor: colors.background,
            justifyContent:"center"
          },
          drawerLabelStyle: {
            marginLeft: 0,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            drawerLabel: 'Home',
            headerShown: false,
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="developer-info"
          options={{
            title: 'Developer Info',
            drawerLabel: 'Developer Info',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="code-slash-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="theme"
          options={{
            title: 'Theme',
            drawerLabel: 'Theme',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="color-palette-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
