import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {useLocalSearchParams, useRouter} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, Image } from 'expo-image';
import { useThemeStore } from '../store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { formatPublishDate } from '../lib/utils';

const bookdetails = () => {
    const { title,image,caption,rating,username,profileImage,createdAt } = useLocalSearchParams();
    const {colors} = useThemeStore();
    const router = useRouter();

    const renderRatingStars = (rating) => {
      const stars = [];
      const numRating = parseInt(rating) || 0;
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <Ionicons
            key={i}
            name={i <= numRating ? "star" : "star-outline"}
            size={20}
            color={i <= numRating ? "#f4b400" : colors.textSecondary}
            style={{ marginRight: 2 }}
          />
        );
      }
      return stars;
    };

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false} style={{top:-30}}>
        <ImageBackground
          source={{uri:image}}
          style={styles.imageBG}
          contentFit="cover"
        >
          <View style={styles.imageOverlay} />
        </ImageBackground>

        <TouchableOpacity
          style={[styles.backContainer,{backgroundColor:colors.white}]}
          activeOpacity={0.7}
          onPress={()=> router.back()}
        >
          <Ionicons name="arrow-back" size={30} color={colors.primary}/>
        </TouchableOpacity>

        <View style={[styles.contentCard, {backgroundColor: colors.cardBackground, borderColor: colors.border}]}>
          <View style={styles.userSection}>
            <Image
              source={{ uri: profileImage || 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
            <View style={styles.userTextContainer}>
              <Text style={[styles.recommendedBy, {color: colors.textSecondary}]}>
                Recommended by
              </Text>
              <Text style={[styles.username, {color: colors.textPrimary}]}>
                {username || 'Anonymous'}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, {backgroundColor: colors.border}]} />

          <Text style={[styles.bookTitle, {color: colors.textPrimary}]}>
            {title}
          </Text>

          <View style={styles.ratingContainer}>
            {renderRatingStars(rating)}
            <Text style={[styles.ratingText, {color: colors.textSecondary}]}>
              ({rating}/5)
            </Text>
          </View>

          <View style={[styles.captionContainer, {backgroundColor: colors.inputBackground, borderColor: colors.border}]}>
            <Ionicons name="chatbox-outline" size={20} color={colors.primary} style={styles.captionIcon} />
            <Text style={[styles.captionLabel, {color: colors.textSecondary}]}>
              Review
            </Text>
          </View>

          <Text style={[styles.caption, {color: colors.textDark}]}>
            {caption || 'No review provided.'}
          </Text>

          <View style={[styles.dateContainer, {borderTopColor: colors.border}]}>
            <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.date, {color: colors.textSecondary}]}>
              Shared on {formatPublishDate(createdAt)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    imageBG:{
        height:420,
        width:"100%",
        position:"relative",
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    backContainer:{
        height:50,
        width:50,
        borderRadius:25,
        borderWidth:1.5,
        position:"absolute",
        top:10,
        left:15,
        alignItems:"center",
        justifyContent:"center",
        zIndex:10,
    },
    contentCard: {
        marginTop: -50,
        marginHorizontal: 16,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 30,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    userTextContainer: {
        flex: 1,
    },
    recommendedBy: {
        fontSize: 12,
        marginBottom: 2,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        marginBottom: 16,
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        lineHeight: 32,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingText: {
        fontSize: 14,
        marginLeft: 8,
        fontWeight: '500',
    },
    captionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
    },
    captionIcon: {
        marginRight: 8,
    },
    captionLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    caption: {
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
    },
    date: {
        fontSize: 13,
        marginLeft: 6,
    },
})
export default bookdetails