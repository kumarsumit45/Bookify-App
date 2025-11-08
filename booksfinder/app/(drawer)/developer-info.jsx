import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';
import { useRouter } from 'expo-router';

const DeveloperInfo = () => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const handleLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/sumit-kumar-yadav950/');
  };

  const handleGitHub = () => {
    Linking.openURL('https://github.com/kumarsumit45');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:sumit.yadav160801@gmail.com');
  };

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

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={120} color={colors.primary} />
          </View>

          <Text style={[styles.name, { color: colors.textDark }]}>Sumit Kumar Yadav</Text>
          <Text style={[styles.role, { color: colors.primary }]}>Full Stack Mobile Developer</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>Building amazing cross-platform mobile applications</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>About Developer</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Passionate software developer with expertise in React Native, Node.js, and modern Mobile technologies.
            Dedicated to creating user-friendly and efficient mobile applications.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Skills</Text>
          <View style={styles.skillsContainer}>
            <View style={[styles.skillTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>React Native</Text>
            </View>
            <View style={[styles.skillTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>JavaScript</Text>
            </View>
            <View style={[styles.skillTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>Node.js</Text>
            </View>
            <View style={[styles.skillTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>Expo</Text>
            </View>
            <View style={[styles.skillTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>MongoDB</Text>
            </View>
            <View style={[styles.skillTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>REST APIs</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Connect</Text>

          <TouchableOpacity style={[styles.contactItem, { backgroundColor: colors.white }]} onPress={handleLinkedIn} activeOpacity={0.7}>
            <Ionicons name="logo-linkedin" size={28} color={colors.primary} />
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textDark }]}>LinkedIn</Text>
              <Text style={[styles.contactValue, { color: colors.textSecondary }]}>@Sumit Kumar</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactItem, { backgroundColor: colors.white }]} onPress={handleGitHub} activeOpacity={0.7}>
            <Ionicons name="logo-github" size={28} color={colors.primary} />
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textDark }]}>GitHub</Text>
              <Text style={[styles.contactValue, { color: colors.textSecondary }]}>View Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactItem, { backgroundColor: colors.white }]} onPress={handleEmail} activeOpacity={0.7}>
            <Ionicons name="mail-outline" size={28} color={colors.primary} />
            <View style={styles.contactTextContainer}>
              <Text style={[styles.contactLabel, { color: colors.textDark }]}>Email</Text>
              <Text style={[styles.contactValue, { color: colors.textSecondary }]}>sumit.yadav160801@gmail.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>Made with</Text>
          <Ionicons name="heart" size={16} color="#FF6B6B" style={styles.heartIcon} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>by Sumit Kumar Yadav</Text>
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
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
  },
  heartIcon: {
    marginHorizontal: 5,
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

export default DeveloperInfo;
