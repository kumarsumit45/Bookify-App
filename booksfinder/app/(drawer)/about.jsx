import { View, Text, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';
import { useRouter } from 'expo-router';
import {Image } from "expo-image"

const About = () => {
  const { colors } = useThemeStore();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.cardBackground }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Image 
           style={styles.logoImg} 
           source={require("../../assets/images/translogoblack.png") } 
           contentFit="fill" />
          {/* <Ionicons name="book-outline" size={80} color={colors.primary} /> */}
        </View>

        <Text style={[styles.title, { color: colors.primary }]}>About Bookify</Text>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          BookiFy is a comprehensive mobile application designed to help book enthusiasts
          discover, organize, and share their favorite books.
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Features</Text>
          <View style={styles.featureItem}>
            <Ionicons name="search-outline" size={24} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Search and discover new books</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Create and manage your book collection</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="person-outline" size={24} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Personalized user profiles</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="share-social-outline" size={24} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>Share your favorite reads</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Version</Text>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Mission</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Our mission is to connect readers with the books they love and create a
            community of passionate book enthusiasts.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent:"center",
    alignSelf:"center",
    marginVertical: 20,
    backgroundColor:"#fff",
    borderRadius:300,
    height:200,
    width:200

  },
  logoImg:{
    height:150,
    width:"100%",
    // top:40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  versionText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default About;
