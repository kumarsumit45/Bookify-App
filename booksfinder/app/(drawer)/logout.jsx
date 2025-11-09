import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
// import COLORS from '../../constants/colors'
import { useThemeStore } from "../../store/themeStore";
import { usePathname, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

const LogoutScreen = () => {
  const { colors } = useThemeStore();
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleCancel = () => {
    setTimeout(() => {
      router.push("/(tabs)");
    },0);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: handleCancel,
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            console.log("User logged out");
            logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
     if (pathname === '/logout' || pathname === '/(drawer)/logout') {
      handleLogout();
    }
  }, [pathname]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons name="log-out-outline" size={80} color={colors.button} />
        </View>
        <Text style={[styles.title, { color: colors.textDark }]}>
          Logging Out...
        </Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          Please wait while we sign you out
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    // backgroundColor:"yellow"
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    // backgroundColor: COLORS.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    // color: COLORS.textDark,
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    // color: COLORS.textSecondary,
    textAlign: "center",
  },
});
export default LogoutScreen;
