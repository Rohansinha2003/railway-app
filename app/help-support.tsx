import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HelpSupportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqData = [
    {
      id: '1',
      question: 'How do I scan a QR code?',
      answer: 'Tap the large blue QR button on the dashboard, then point your camera at the QR code. The app will automatically detect and scan the code.',
    },
    {
      id: '2',
      question: 'What if the QR code is not scanning?',
      answer: 'Make sure the QR code is well-lit and not damaged. Try cleaning your camera lens and ensure the code is within the scanning frame.',
    },
    {
      id: '3',
      question: 'How do I report an issue?',
      answer: 'Go to the Public Grievance section on the dashboard, fill out the form with details and attach photos if needed.',
    },
    {
      id: '4',
      question: 'How do I change my password?',
      answer: 'Go to Profile > Edit Profile > Change Password. You will need to enter your current password and create a new one.',
    },
    {
      id: '5',
      question: 'How do I enable notifications?',
      answer: 'Go to Profile > Notifications and toggle the notification types you want to receive.',
    },
  ];

  const supportOptions = [
    {
      icon: 'call-outline',
      title: 'Call Support',
      subtitle: '+91 1800-123-4567',
      action: () => Linking.openURL('tel:+9118001234567'),
    },
    {
      icon: 'mail-outline',
      title: 'Email Support',
      subtitle: 'support@railway.gov.in',
      action: () => Linking.openURL('mailto:support@railway.gov.in'),
    },
    {
      icon: 'chatbubble-outline',
      title: 'Live Chat',
      subtitle: 'Available 24/7',
      action: () => Alert.alert('Live Chat', 'Live chat feature coming soon!'),
    },
    {
      icon: 'document-text-outline',
      title: 'Submit Ticket',
      subtitle: 'Create a support ticket',
      action: () => Alert.alert('Support Ticket', 'Ticket submission feature coming soon!'),
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `Searching for: "${searchQuery}"`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionItem}>
              <Ionicons name="qr-code-outline" size={24} color="#1E40AF" />
              <Text style={styles.quickActionText}>How to Scan QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Ionicons name="warning-outline" size={24} color="#F59E0B" />
              <Text style={styles.quickActionText}>Report Issue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Ionicons name="settings-outline" size={24} color="#10B981" />
              <Text style={styles.quickActionText}>App Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Ionicons name="person-outline" size={24} color="#8B5CF6" />
              <Text style={styles.quickActionText}>Profile Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleFAQ(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#6B7280"
                />
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.supportItem}
              onPress={option.action}
            >
              <View style={styles.supportLeft}>
                <View style={styles.supportIconContainer}>
                  <Ionicons name={option.icon as any} size={20} color="#1E40AF" />
                </View>
                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>{option.title}</Text>
                  <Text style={styles.supportSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>September 2024</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>Railway Department</Text>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons name="star-outline" size={20} color="#F59E0B" />
            <Text style={styles.feedbackButtonText}>Rate This App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#1E40AF" />
            <Text style={styles.feedbackButtonText}>Send Feedback</Text>
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
  placeholder: {
    width: 40,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  searchButton: {
    backgroundColor: '#1E40AF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
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
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  quickActionItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  faqItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supportIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E40AF',
    marginLeft: 8,
  },
});
