import { View, Text } from "react-native";
import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import createStyles from "../assets/styles/profile.styles";
import { useThemeStore } from "../store/themeStore";
import { formatMemberSince } from "../lib/utils";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>🗓️ Joined {formatMemberSince(user.createdAt)}</Text>
      </View>
    </View>
  );
}
