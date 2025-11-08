import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useMemo } from 'react'
import createStyles from "../../assets/styles/login.styles"
import {Ionicons} from "@expo/vector-icons"
import { useThemeStore } from '../../store/themeStore'
import {Link} from "expo-router"
import Devloper_Info from '../../components/Devloper_Info'
import { useAuthStore } from '../../store/authStore'

const Login = () => {
  const [email,setEmail] =useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);


  const {user,loading,login,token} = useAuthStore()
  const { colors } = useThemeStore()
  const styles = useMemo(() => createStyles(colors), [colors])

  const handelLogin = async()=>{
    const result = await login(email,password);
    if(!result.success) Alert.alert("Error",result.error);
   
  }
  return (
    <KeyboardAvoidingView behavior="height" style={{flex:1}}>
    <View style={styles.container}> 
      <View style={styles.topIllustration}>
        <Image 
           source={require("../../assets/images/i.png")}
           style={styles.illustrationImage}
           resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* Email input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter your email'
                placeholderTextColor={colors.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enetr your password"
                placeholderTextColor={colors.placeholderText}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"

              />
              <TouchableOpacity
                onPress={()=>setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                   name={showPassword ? "eye-outline" : "eye-off-outline"}
                   size={20}
                   color={colors.primary}
                />
              </TouchableOpacity>
            </View> 
          </View>

          {/* button */}
          <TouchableOpacity
             style={styles.button}
             onPress={handelLogin}
             disabled={loading}>
            {
              loading ? (<ActivityIndicator  color={colors.white}/>)
              : (<Text style={styles.buttonText}>Login</Text>)
            }
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>        
      </View>
       <Devloper_Info/>
    </View>
    </KeyboardAvoidingView>
  )
}

export default Login