import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useThemeStore } from "../store/themeStore";


const Devloper_Info = () => {
    const { colors } = useThemeStore();

    const handelPress =()=>{
        Linking.openURL('https://www.linkedin.com/in/sumit-kumar-yadav950/')

    }
  return (
    <View style={styles.container}>
      <Text style={[styles.linkText, { color: colors.textSecondary }]}>This app is developed by </Text>
      <TouchableOpacity
      activeOpacity={0.6}
      onPress={handelPress}
     >
        <Text style={[styles.link, { color: colors.primary }]}>@Sumit Kumar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position:"static",
    // borderWidth:1,
    paddingTop:40,
    marginTop:0
  },
  link:{
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
  }
});
export default Devloper_Info;
