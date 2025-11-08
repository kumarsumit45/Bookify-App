import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';
import { THEMES } from '../../constants/colors';
import { useRouter } from 'expo-router';

const Theme = () => {
  const { currentTheme, colors, setTheme } = useThemeStore();
  const router = useRouter();

  const themeCards = Object.entries(THEMES).map(([key, theme]) => ({
    key,
    ...theme,
  }));

  const handleThemeSelect = (themeKey) => {
    setTheme(themeKey);
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

        <View style={styles.iconContainer}>
          <Ionicons name="color-palette-outline" size={80} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.primary }]}>Choose Your Theme</Text>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Select a color theme to personalize your Books Finder experience. The theme will be
          applied across the entire app.
        </Text>

        <View style={styles.themesContainer}>
          {themeCards.map((theme) => {
            const isSelected = currentTheme === theme.key;
            return (
              <TouchableOpacity
                key={theme.key}
                style={[
                  styles.themeCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 3 : 1,
                  },
                ]}
                onPress={() => handleThemeSelect(theme.key)}
                activeOpacity={0.7}
              >
                <View style={styles.themeHeader}>
                  <Text style={[styles.themeName, { color: colors.textDark }]}>
                    {theme.name}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </View>

                <View style={styles.colorPalette}>
                  <View style={styles.colorRow}>
                    <View
                      style={[
                        styles.colorBox,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    />
                    <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
                      Primary
                    </Text>
                  </View>

                  <View style={styles.colorRow}>
                    <View
                      style={[
                        styles.colorBox,
                        { backgroundColor: theme.colors.background },
                        { borderWidth: 1, borderColor: colors.border },
                      ]}
                    />
                    <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
                      Background
                    </Text>
                  </View>

                  <View style={styles.colorRow}>
                    <View
                      style={[
                        styles.colorBox,
                        { backgroundColor: theme.colors.cardBackground },
                        { borderWidth: 1, borderColor: colors.border },
                      ]}
                    />
                    <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
                      Card
                    </Text>
                  </View>
                </View>

                {isSelected && (
                  <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.selectedText}>Active</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoTitle, { color: colors.textDark }]}>
            About Themes
          </Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Your selected theme will be saved and applied automatically when you open the app.
            You can change your theme at any time from this screen.
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
    marginVertical: 20,
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
    marginBottom: 30,
  },
  themesContainer: {
    gap: 20,
  },
  themeCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  themeName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  colorPalette: {
    gap: 10,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  colorLabel: {
    fontSize: 14,
  },
  selectedBadge: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
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

export default Theme;
