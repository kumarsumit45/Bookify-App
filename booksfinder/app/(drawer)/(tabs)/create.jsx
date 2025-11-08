import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Image, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useMemo } from 'react'
import { useRouter } from 'expo-router'
import createStyles from "../../../assets/styles/create.styles"
import {Ionicons} from "@expo/vector-icons"
import { useThemeStore } from '../../../store/themeStore'
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import {useAuthStore} from "../../../store/authStore"
import { base_url } from '../../../constants/api'

const CreateScreen = () => {
  const [title,setTitle] = useState("")
  const [caption,setCaption] = useState("")
  const [rating,setRating] = useState(3)
  const [image,setImage] = useState(null)
  const [imageBase64,setImageBase64] = useState(null)
  const [loading,setLoading] = useState(false)

  const router = useRouter();
  const {token} = useAuthStore();
  const { colors } = useThemeStore();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const pickImage = async ()=>{
    try {
      if (Platform.OS !== "web"){
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status);

        if (status !== "granted"){
          Alert.alert("permission Denied","We need camera roll permission to upload an image");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:"images",
        allowsEditing: true,
        aspect:[4,3],
        quality:0.3,
        base64: true,
      })

      if(!result.canceled){
        setImage(result.assets[0].uri)

        if(result.assets[0].base64){
          setImageBase64(result.assets[0].base64)
        }else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri,{
            encoding: FileSystem.EncodingType.Base64,
          })
          setImageBase64(base64)
        }
      }
    } catch (error) {
      console.log("Error while picking image.",error);
      Alert.alert("Error","There was a problem selecting your image");
    }
  }

  const handelSubmit = async()=>{
    if(!title ||!caption || !imageBase64 || !rating){
      Alert.alert("Error","Please fill in all the fields");
      return;
    }

    // Check if user is authenticated
    if(!token){
      Alert.alert("Authentication Error","Please log in again to post a book");
      console.log("No token found. User needs to log in.");
      return;
    }

    try {
      setLoading(true)
      console.log("Starting book submission...");
      console.log("Token:", token ? "Present" : "Missing");

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length-1];
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      console.log("Sending request to:", `${base_url}/api/books`);
      console.log("Image size (KB):", Math.round(imageDataUrl.length / 1024));

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${base_url}/api/books`,{
        method:"POST",
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          title,
          caption,
          rating:rating.toString(),
          image:imageDataUrl,
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId);

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if(!response.ok){
        // Try to get error message, but handle if it's not JSON
        let errorMessage = "Something went wrong";
        try {
          const data = await response.json();
          console.log("Error response data:", data);
          errorMessage = data.message || errorMessage;
        } catch (e) {
          // If it's not JSON, get the text (likely HTML error page)
          const text = await response.text();
          console.log("Server returned non-JSON response:", text.substring(0, 200));
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Success response:", data);

      Alert.alert("Success","Your book recommendation has been posted.");

      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      router.push("/");

    } catch (error) {
      console.log("Error creating post:", error);
      console.log("Error message:", error.message);
      console.log("Error name:", error.name);

      if (error.name === 'AbortError') {
        Alert.alert(
          "Timeout Error",
          "Request took too long. The server might be sleeping (Render free tier). Please wait 30 seconds and try again."
        );
      } else {
        Alert.alert("Error", error.message || "Something went wrong. Check console for details.");
      }
    }finally{
      setLoading(false);
    }


  }

  const renderRatingPicker = ()=>{
    const stars = [];
    for(let i =1;i <= 5;i++){
      stars.push(
        <TouchableOpacity key={i} onPress={()=> setRating(i)} style={styles.starButton}>
          <Ionicons
            name={i <= rating ? "star" :"star-outline" }
            size={32}
            color={i <= rating ?"#f4b400" : colors.textSecondary}
          />
        </TouchableOpacity>
      )
    }
    return <View style={styles.ratingContainer}>{stars}</View>
  }


  return (
    <KeyboardAvoidingView
      style={{flex:1}}
      behavior="height"
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>

        <View style={styles.card}>

          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>
          </View>

          <View style={styles.form}>
            {/* Book title */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Book Title"
                  placeholderTextColor={colors.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* rating */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {/* <View style={styles.ratingContainer}> */}
               {
                renderRatingPicker()
               }
              {/* </View> */}

            </View>

            {/* Imafe */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {
                  image ? (
                    <Image source={{uri:image}} style={styles.previewImage}/>
                  ):(
                    <View style={styles.placeholderContainer}>
                      <Ionicons name="image-outline" size={40} color={colors.textSecondary} />
                      <Text style={styles.placeholderText}>Tap to select image.</Text>
                    </View>
                  )
                }




              </TouchableOpacity>
            </View>

            {/* Caption */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={colors.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handelSubmit} disabled={loading}>
              {
                loading ?(
                  <ActivityIndicator color={colors.white} />
                ):(
                  <>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={20}
                      color={colors.white}
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Share</Text>
                  </>
                )
              }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}

export default CreateScreen
