import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [settings, setSettings] = useState({
    autoSync: true,
    locationTracking: true,
    biometricAuth: false,
    pushNotifications: true,
    emailNotifications: true,
    soundEffects: true,
    hapticFeedback: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDarkModeToggle = () => {
    toggleTheme();
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setSettings({
              autoSync: true,
              locationTracking: true,
              biometricAuth: false,
              pushNotifications: true,
              emailNotifications: true,
              soundEffects: true,
              hapticFeedback: true,
            });
            Alert.alert('Success', 'Settings have been reset to default');
          }
        }
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onToggle, 
    type = 'toggle' 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value?: boolean;
    onToggle?: () => void;
    type?: 'toggle' | 'navigation';
  }) => (
    <View style={[styles.settingItem, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#374151' : '#F3F4F6' }]}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#1E40AF' : '#EBF4FF' }]}>
          <Ionicons name={icon as any} size={20} color={isDarkMode ? 'white' : '#1E40AF'} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: colors.icon }]}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {type === 'toggle' ? (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: isDarkMode ? '#374151' : '#E5E7EB', true: '#1E40AF' }}
            thumbColor={value ? 'white' : '#9CA3AF'}
          />
        ) : (
          <Ionicons name="chevron-forward" size={16} color={colors.icon} />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>Appearance</Text>
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            value={isDarkMode}
            onToggle={handleDarkModeToggle}
          />
        </View>

        {/* Sync & Data Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>Sync & Data</Text>
          <SettingItem
            icon="sync-outline"
            title="Auto Sync"
            subtitle="Automatically sync data when online"
            value={settings.autoSync}
            onToggle={() => handleToggle('autoSync')}
          />
          <SettingItem
            icon="location-outline"
            title="Location Tracking"
            subtitle="Allow location-based features"
            value={settings.locationTracking}
            onToggle={() => handleToggle('locationTracking')}
          />
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>Security</Text>
          <SettingItem
            icon="finger-print-outline"
            title="Biometric Authentication"
            subtitle="Use fingerprint or face ID"
            value={settings.biometricAuth}
            onToggle={() => handleToggle('biometricAuth')}
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>Notifications</Text>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive push notifications"
            value={settings.pushNotifications}
            onToggle={() => handleToggle('pushNotifications')}
          />
          <SettingItem
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive email updates"
            value={settings.emailNotifications}
            onToggle={() => handleToggle('emailNotifications')}
          />
        </View>

        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>Accessibility</Text>
          <SettingItem
            icon="volume-high-outline"
            title="Sound Effects"
            subtitle="Play sound for interactions"
            value={settings.soundEffects}
            onToggle={() => handleToggle('soundEffects')}
          />
          <SettingItem
            icon="phone-portrait-outline"
            title="Haptic Feedback"
            subtitle="Vibrate on touch interactions"
            value={settings.hapticFeedback}
            onToggle={() => handleToggle('hapticFeedback')}
          />
        </View>

        {/* Advanced Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>Advanced</Text>
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            type="navigation"
          />
          <SettingItem
            icon="time-outline"
            title="Time Zone"
            subtitle="Asia/Kolkata"
            type="navigation"
          />
          <SettingItem
            icon="folder-outline"
            title="Storage"
            subtitle="Manage app data"
            type="navigation"
          />
        </View>

        {/* Reset Section */}
        <View style={styles.section}>
          <TouchableOpacity style={[styles.resetButton, { backgroundColor: colors.background, borderColor: isDarkMode ? '#374151' : '#FEE2E2' }]} onPress={handleResetSettings}>
            <Ionicons name="refresh-outline" size={20} color="#EF4444" />
            <Text style={styles.resetButtonText}>Reset All Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  settingRight: {
    marginLeft: 12,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
});
