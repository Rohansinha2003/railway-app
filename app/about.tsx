import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AboutScreen() {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open the link');
    });
  };

  const handleRateApp = () => {
    Alert.alert(
      'Rate App',
      'Thank you for using Railway QR Tracking! Would you like to rate this app?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Rate Now', onPress: () => Alert.alert('Thank you!', 'Rating feature coming soon!') }
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert('Share App', 'Share feature coming soon!');
  };

  const InfoItem = ({ 
    icon, 
    title, 
    value, 
    onPress 
  }: {
    icon: string;
    title: string;
    value: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity 
      style={styles.infoItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.infoLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={20} color="#1E40AF" />
        </View>
        <Text style={styles.infoTitle}>{title}</Text>
      </View>
      <View style={styles.infoRight}>
        <Text style={styles.infoValue}>{value}</Text>
        {onPress && <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={styles.placeholder} />
        </View>

        {/* App Logo and Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.appLogo}>
            <Text style={styles.logoText}>*</Text>
          </View>
          <Text style={styles.appName}>Railway QR Tracking</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Track components across their lifecycle with secure QR scanning
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleRateApp}>
            <Ionicons name="star-outline" size={20} color="#F59E0B" />
            <Text style={styles.actionButtonText}>Rate App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShareApp}>
            <Ionicons name="share-outline" size={20} color="#1E40AF" />
            <Text style={styles.actionButtonText}>Share App</Text>
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <InfoItem
            icon="calendar-outline"
            title="Release Date"
            value="September 2024"
          />
          <InfoItem
            icon="build-outline"
            title="Build Number"
            value="1.0.0 (100)"
          />
          <InfoItem
            icon="phone-portrait-outline"
            title="Platform"
            value="iOS & Android"
          />
          <InfoItem
            icon="language-outline"
            title="Language"
            value="English"
          />
        </View>

        {/* Developer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <InfoItem
            icon="business-outline"
            title="Organization"
            value="Indian Railways"
          />
          <InfoItem
            icon="mail-outline"
            title="Contact Email"
            value="support@railway.gov.in"
            onPress={() => handleOpenLink('mailto:support@railway.gov.in')}
          />
          <InfoItem
            icon="globe-outline"
            title="Website"
            value="www.railway.gov.in"
            onPress={() => handleOpenLink('https://www.railway.gov.in')}
          />
        </View>

        {/* Legal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <InfoItem
            icon="document-text-outline"
            title="Terms of Service"
            value="View Terms"
            onPress={() => Alert.alert('Terms of Service', 'Terms of service coming soon!')}
          />
          <InfoItem
            icon="shield-outline"
            title="Privacy Policy"
            value="View Policy"
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy coming soon!')}
          />
          <InfoItem
            icon="information-circle-outline"
            title="Open Source Licenses"
            value="View Licenses"
            onPress={() => Alert.alert('Open Source Licenses', 'License information coming soon!')}
          />
        </View>

        {/* Technology Stack */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology</Text>
          <InfoItem
            icon="logo-react"
            title="Framework"
            value="React Native"
          />
          <InfoItem
            icon="logo-javascript"
            title="Language"
            value="TypeScript"
          />
          <InfoItem
            icon="logo-nodejs"
            title="Runtime"
            value="Expo"
          />
        </View>

        {/* Credits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credits</Text>
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>
              Built with ❤️ for the Indian Railways
            </Text>
            <Text style={styles.creditsSubtext}>
              This app helps railway inspectors and maintenance teams track and manage railway components efficiently using QR code technology.
            </Text>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            © 2024 Indian Railways. All rights reserved.
          </Text>
          <Text style={styles.copyrightSubtext}>
            This app is developed for internal use by railway personnel.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E40AF',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  infoRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  creditsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  creditsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  creditsSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  copyrightSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
  copyrightSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
