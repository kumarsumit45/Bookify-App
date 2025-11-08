import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeStore } from '../store/themeStore'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreen = ({children}) => {
    const insets = useSafeAreaInsets();
    const { colors } = useThemeStore();

  return (
    <View style={[styles.container,{paddingTop:insets.top, backgroundColor: colors.background}]}>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
export default SafeScreen