import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { useThemeStore } from "../../../store/themeStore"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'

import DrawerToggle from "../../../components/DrawerToggle"

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useThemeStore();


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDark,
        tabBarStyle: {
          height: 70 + insets.bottom,
          backgroundColor: colors.background,
          paddingTop: 5,
          paddingBottom: insets.bottom
        }
      }}
     >
        <Tabs.Screen name='index'
            options={{
              title: "Home",
              headerShown: false,
              headerLeft: () => <DrawerToggle />,
              headerStyle: {
                backgroundColor: colors.background,
                height: 50,
                elevation: 0,
                shadowOpacity: 0,
              },
              tabBarIcon: ({ size, color }) => (<Ionicons name="home-outline" size={size} color={color} />)
            }}/>
        <Tabs.Screen
          name='create'
          options={{
              title: "Create",
              tabBarIcon: ({ size, color }) => (<Ionicons name="add-circle-outline" size={size} color={color} />)
            }}
          />
        <Tabs.Screen
          name='profile'
          options={{
              title: "Profile",
              tabBarIcon: ({ size, color }) => (<Ionicons name="person-outline" size={size} color={color} />)
            }}
          />
    </Tabs>
  )
}

export default TabLayout