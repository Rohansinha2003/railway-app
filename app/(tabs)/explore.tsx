import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TimelineScreen() {
  const timelineData = [
    {
      id: '1',
      time: '10:30 AM',
      title: 'Component Inspection',
      description: 'Tracked component #RC-001 for routine maintenance',
      type: 'inspection',
      status: 'completed'
    },
    {
      id: '2',
      time: '09:15 AM',
      title: 'Issue Reported',
      description: 'Active issue detected on component #RC-045',
      type: 'issue',
      status: 'active'
    },
    {
      id: '3',
      time: '08:45 AM',
      title: 'Maintenance Scheduled',
      description: 'Component #RC-023 scheduled for maintenance',
      type: 'maintenance',
      status: 'scheduled'
    },
    {
      id: '4',
      time: 'Yesterday',
      title: 'QR Scan Completed',
      description: 'Scanned 15 components during inspection round',
      type: 'scan',
      status: 'completed'
    },
    {
      id: '5',
      time: 'Yesterday',
      title: 'Report Generated',
      description: 'Weekly inspection report generated and sent',
      type: 'report',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#EF4444';
      case 'scheduled': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inspection': return 'search-outline';
      case 'issue': return 'warning-outline';
      case 'maintenance': return 'construct-outline';
      case 'scan': return 'qr-code-outline';
      case 'report': return 'document-text-outline';
      default: return 'ellipse-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Timeline</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

      {/* Timeline */}
      <View style={styles.timelineContainer}>
        {timelineData.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, { backgroundColor: getStatusColor(item.status) }]}>
                <Ionicons name={getTypeIcon(item.type)} size={12} color="white" />
              </View>
              {index < timelineData.length - 1 && <View style={styles.timelineLine} />}
            </View>
            
            <View style={styles.timelineContent}>
              <View style={styles.timelineHeader}>
                <Text style={styles.timelineTime}>{item.time}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.timelineTitle}>{item.title}</Text>
              <Text style={styles.timelineDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Load More */}
      <TouchableOpacity style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load More</Text>
        <Ionicons name="chevron-down" size={16} color="#1E40AF" />
      </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  filterButton: {
    padding: 8,
  },
  timelineContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra space for bottom navigation
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineTime: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 32,
  },
  loadMoreText: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '600',
  },
});
