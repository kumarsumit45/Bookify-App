import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useThemeStore } from "../store/themeStore";
import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'

const DrawerToggle = () => {
  const navigation = useNavigation();
  const { colors } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    //   style={{ marginLeft: 0, marginTop: 0 }}
    >
      <Ionicons name="menu" size={32} color={colors.primary} />
    </TouchableOpacity>
  );
}

export default DrawerToggle