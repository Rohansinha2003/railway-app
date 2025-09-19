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

type NotificationSettings = {
  allNotifications: boolean;
  inspectionReminders: boolean;
  maintenanceAlerts: boolean;
  issueReports: boolean;
  systemUpdates: boolean;
  weeklyReports: boolean;
  emergencyAlerts: boolean;
  qrScanNotifications: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    allNotifications: true,
    inspectionReminders: true,
    maintenanceAlerts: true,
    issueReports: true,
    systemUpdates: false,
    weeklyReports: true,
    emergencyAlerts: true,
    qrScanNotifications: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTestNotification = () => {
    Alert.alert(
      'Test Notification',
      'This is a test notification to verify your settings are working correctly.',
      [{ text: 'OK' }]
    );
  };

  const NotificationItem = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onToggle 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={20} color="#1E40AF" />
        </View>
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{title}</Text>
          {subtitle && <Text style={styles.notificationSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E7EB', true: '#1E40AF' }}
        thumbColor={value ? 'white' : '#9CA3AF'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.testButton} onPress={handleTestNotification}>
            <Text style={styles.testButtonText}>Test</Text>
          </TouchableOpacity>
        </View>

        {/* Master Toggle */}
        <View style={styles.masterToggle}>
          <View style={styles.masterToggleLeft}>
            <Ionicons name="notifications" size={24} color="#1E40AF" />
            <View style={styles.masterToggleText}>
              <Text style={styles.masterToggleTitle}>All Notifications</Text>
              <Text style={styles.masterToggleSubtitle}>Enable or disable all notifications</Text>
            </View>
          </View>
          <Switch
            value={notifications.allNotifications}
            onValueChange={() => handleToggle('allNotifications')}
            trackColor={{ false: '#E5E7EB', true: '#1E40AF' }}
            thumbColor={notifications.allNotifications ? 'white' : '#9CA3AF'}
          />
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>
          <NotificationItem
            icon="search-outline"
            title="Inspection Reminders"
            subtitle="Reminders for scheduled inspections"
            value={notifications.inspectionReminders}
            onToggle={() => handleToggle('inspectionReminders')}
          />
          <NotificationItem
            icon="construct-outline"
            title="Maintenance Alerts"
            subtitle="Alerts for maintenance schedules"
            value={notifications.maintenanceAlerts}
            onToggle={() => handleToggle('maintenanceAlerts')}
          />
          <NotificationItem
            icon="warning-outline"
            title="Issue Reports"
            subtitle="Notifications about reported issues"
            value={notifications.issueReports}
            onToggle={() => handleToggle('issueReports')}
          />
          <NotificationItem
            icon="cog-outline"
            title="System Updates"
            subtitle="App updates and system changes"
            value={notifications.systemUpdates}
            onToggle={() => handleToggle('systemUpdates')}
          />
          <NotificationItem
            icon="document-text-outline"
            title="Weekly Reports"
            subtitle="Weekly summary reports"
            value={notifications.weeklyReports}
            onToggle={() => handleToggle('weeklyReports')}
          />
          <NotificationItem
            icon="alert-circle-outline"
            title="Emergency Alerts"
            subtitle="Critical safety and emergency notifications"
            value={notifications.emergencyAlerts}
            onToggle={() => handleToggle('emergencyAlerts')}
          />
          <NotificationItem
            icon="qr-code-outline"
            title="QR Scan Notifications"
            subtitle="Notifications related to QR scanning"
            value={notifications.qrScanNotifications}
            onToggle={() => handleToggle('qrScanNotifications')}
          />
        </View>

        {/* Delivery Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Methods</Text>
          <NotificationItem
            icon="phone-portrait-outline"
            title="Push Notifications"
            subtitle="Receive notifications on your device"
            value={notifications.pushNotifications}
            onToggle={() => handleToggle('pushNotifications')}
          />
          <NotificationItem
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive notifications via email"
            value={notifications.emailNotifications}
            onToggle={() => handleToggle('emailNotifications')}
          />
          <NotificationItem
            icon="chatbubble-outline"
            title="SMS Notifications"
            subtitle="Receive notifications via SMS"
            value={notifications.smsNotifications}
            onToggle={() => handleToggle('smsNotifications')}
          />
        </View>

        {/* Notification History */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.historyButton}>
            <Ionicons name="time-outline" size={20} color="#1E40AF" />
            <Text style={styles.historyButtonText}>Notification History</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Clear All Notifications */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.clearButton}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
            <Text style={styles.clearButtonText}>Clear All Notifications</Text>
          </TouchableOpacity>
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
  testButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  testButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  masterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  masterToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  masterToggleText: {
    marginLeft: 12,
  },
  masterToggleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  masterToggleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationLeft: {
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
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1E40AF',
    marginLeft: 12,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
});
