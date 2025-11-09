import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import  { useState, useMemo } from 'react'
import createStyles from '../../assets/styles/signup.styles'
import { Ionicons } from '@expo/vector-icons'
import { useThemeStore } from '../../store/themeStore'
import { router } from 'expo-router'
import Devloper_Info from "../../components/Devloper_Info"
import { useAuthStore } from '../../store/authStore'


const Signup = () => {
  const [username,setUsername] = useState("")
  const [email,setEmail] =useState("");
  const [password,setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false)

  const {user,loading ,register} =useAuthStore()
  const { colors } = useThemeStore()
  const styles = useMemo(() => createStyles(colors), [colors])

  const handelSignup = async()=>{
    
    const result = await register(username,email,password);
    if(!result.success) Alert.alert("Error", result.error);
  }
  return (
    <KeyboardAvoidingView behavior="height" style={{flex:1}}>

      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Bookify Store📑</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} style={styles.inputIcon}/>
                <TextInput
                  style={styles.input}
                  placeholder='sumit45'
                  placeholderTextColor={colors.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* Email input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} style={styles.inputIcon}/>
                <TextInput
                  style={styles.input}
                  placeholder='abc@gmail.com'
                  placeholderTextColor={colors.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>
            {/* password input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} style={styles.inputIcon}/>
                <TextInput
                  style={styles.input}
                  placeholder='********'
                  placeholderTextColor={colors.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity activeOpacity={0.7}  style={styles.eyeIcon}
                  onPress={()=>setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {/* button */}
            <TouchableOpacity style={styles.button} onPress={handelSignup} disabled={loading}>
              {
                loading ? (
                  <ActivityIndicator color={colors.white} />
                ):(
                  <Text style={styles.buttonText}>Sign Up</Text>
                )
              }
            </TouchableOpacity>

            {/* footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={()=> router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
         <Devloper_Info/>
      </View>
       


    </KeyboardAvoidingView>
  )
}

export default Signup