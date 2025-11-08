import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen"
import { StatusBar } from "expo-status-bar";
import {useAuthStore} from "../store/authStore"
import { useThemeStore } from "../store/themeStore";
import { useEffect } from "react";
export default function RootLayout() {

  const router = useRouter();
  const segments = useSegments();

  const {checkAuth,user,token}= useAuthStore()
  const { loadTheme, colors } = useThemeStore();

  useEffect(()=>{
    checkAuth();
    loadTheme();
  },[])

  useEffect(()=>{
    const inAuthScreen = segments[0] === "(auth)"
    const isSignedIn = user && token;

    // if(!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    // else if (isSignedIn && inAuthScreen) router.replace("/(drawer)")

    const timeout = setTimeout(() => {
    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(drawer)");
  },0);

  return () => clearTimeout(timeout);

  },[user,token,segments])

  return (
    <SafeAreaProvider>
      <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)"  options={{headerShown:false}}/>
        <Stack.Screen name="(auth)" />

      </Stack>
      </SafeScreen>
      <StatusBar style="dark" backgroundColor={colors.background}/>
    </SafeAreaProvider>
  );
}
