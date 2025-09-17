import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Alert, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import NotificationPopup from '@/components/NotificationPopup';

export default function HomeScreen() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleQRScan = () => {
    router.push('/qr-scanner');
  };

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    router.push('/notifications');
  };

  const handleMetricPress = (metric: string) => {
    Alert.alert(metric, `View details for ${metric}`);
  };

  const handleNavigationCard = (card: string) => {
    Alert.alert(card, `Navigate to ${card}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Railway QR Tracking</Text>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            {user?.profilePicture ? (
              <Image 
                source={{ uri: user.profilePicture }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <Ionicons name="person" size={20} color="#6B7280" />
              </View>
            )}
          </TouchableOpacity>
        </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeIcon}>
          <Ionicons name="document-text-outline" size={16} color="#6B7280" />
        </View>
        <Text style={styles.welcomeText}>Welcome, {user?.name || 'Inspector'}</Text>
      </View>

      {/* QR Scan Button */}
      <View style={styles.qrSection}>
        <TouchableOpacity style={styles.qrButton} onPress={handleQRScan}>
          <Ionicons name="qr-code-outline" size={48} color="white" />
        </TouchableOpacity>
        <Text style={styles.qrText}>Tap to scan component QR</Text>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <TouchableOpacity style={styles.metricCard} onPress={() => handleMetricPress('Tracked')}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Tracked</Text>
            <Ionicons name="trending-up-outline" size={16} color="#10B981" />
          </View>
          <Text style={styles.metricValue}>1,248</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.metricCard} onPress={() => handleMetricPress('Active Issues')}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Active Issues</Text>
            <Ionicons name="warning-outline" size={16} color="#EF4444" />
          </View>
          <Text style={styles.metricValue}>12</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.metricCard} onPress={() => handleMetricPress('Maintenance')}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Maintenance</Text>
            <Ionicons name="construct-outline" size={16} color="#F59E0B" />
          </View>
          <Text style={styles.metricValue}>34</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Cards */}
      <View style={styles.navigationGrid}>
        <TouchableOpacity 
          style={styles.navCard} 
          onPress={() => handleNavigationCard('Reports & Alerts')}
        >
          <Text style={styles.navCardTitle}>Reports & Alerts</Text>
          <Text style={styles.navCardSubtitle}>Trends and upcoming inspections</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navCard} 
          onPress={() => handleNavigationCard('Profile')}
        >
          <Text style={styles.navCardTitle}>Profile</Text>
          <Text style={styles.navCardSubtitle}>Settings & preferences</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navCard} 
          onPress={() => handleNavigationCard('Public Grievance')}
        >
          <Text style={styles.navCardTitle}>Public Grievance</Text>
          <Text style={styles.navCardSubtitle}>Report an issue with photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navCard} 
          onPress={() => handleNavigationCard('Sample Part Detail')}
        >
          <Text style={styles.navCardTitle}>Sample Part Detail</Text>
          <Text style={styles.navCardSubtitle}>Explore component information</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      {/* Notification Popup */}
      <NotificationPopup
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        onViewAll={handleViewAllNotifications}
      />
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
  },
  headerButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  profileButton: {
    padding: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  welcomeIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrButton: {
    width: 120,
    height: 120,
    backgroundColor: '#1E40AF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  qrText: {
    fontSize: 14,
    color: '#6B7280',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    minWidth: '30%',
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 100, // Extra space for bottom navigation
    gap: 12,
  },
  navCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  navCardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});
