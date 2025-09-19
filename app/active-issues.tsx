import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface ActiveIssue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved';
  location: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo?: string;
  componentId: string;
  category: string;
}

export default function ActiveIssuesScreen() {
  const { colors, isDarkMode } = useTheme();
  const [issues, setIssues] = useState<ActiveIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<ActiveIssue[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  useEffect(() => {
    // Mock data for demonstration
    const mockIssues: ActiveIssue[] = [
      {
        id: '1',
        title: 'Signal Failure at Platform 1',
        description: 'Signal lights not responding to commands from control room',
        severity: 'high',
        status: 'open',
        location: 'Platform 1, Station A',
        reportedBy: 'John Smith',
        reportedAt: '2024-01-15 14:30',
        componentId: 'SIG-001',
        category: 'Signaling'
      },
      {
        id: '2',
        title: 'Track Sensor Malfunction',
        description: 'Track occupancy sensor showing false readings',
        severity: 'medium',
        status: 'in-progress',
        location: 'Track Section B-2',
        reportedBy: 'Sarah Johnson',
        reportedAt: '2024-01-14 09:15',
        assignedTo: 'Mike Wilson',
        componentId: 'TS-205',
        category: 'Sensors'
      },
      {
        id: '3',
        title: 'Switch Point Stuck',
        description: 'Switch point not moving to correct position',
        severity: 'critical',
        status: 'open',
        location: 'Junction C',
        reportedBy: 'David Brown',
        reportedAt: '2024-01-15 16:45',
        componentId: 'SP-301',
        category: 'Switches'
      },
      {
        id: '4',
        title: 'Power Unit Overheating',
        description: 'Power unit temperature exceeding normal limits',
        severity: 'high',
        status: 'in-progress',
        location: 'Substation D',
        reportedBy: 'Lisa Davis',
        reportedAt: '2024-01-10 11:20',
        assignedTo: 'Tom Anderson',
        componentId: 'PU-401',
        category: 'Power'
      },
      {
        id: '5',
        title: 'Communication Interference',
        description: 'Radio communication experiencing static and dropouts',
        severity: 'medium',
        status: 'resolved',
        location: 'Control Room E',
        reportedBy: 'Mark Wilson',
        reportedAt: '2024-01-08 13:10',
        assignedTo: 'Jane Smith',
        componentId: 'CH-501',
        category: 'Communication'
      }
    ];
    
    setIssues(mockIssues);
    setFilteredIssues(mockIssues);
  }, []);

  const filterIssues = useCallback(() => {
    let filtered = issues;

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(issue => issue.status === filter);
    }

    // Apply severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.severity === severityFilter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  }, [issues, filter, severityFilter, searchQuery]);

  useEffect(() => {
    filterIssues();
  }, [filterIssues]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleIssuePress = (issue: ActiveIssue) => {
    Alert.alert(
      issue.title,
      `Description: ${issue.description}\n\nLocation: ${issue.location}\nSeverity: ${issue.severity}\nStatus: ${issue.status}\nReported by: ${issue.reportedBy}\nReported at: ${issue.reportedAt}${issue.assignedTo ? `\nAssigned to: ${issue.assignedTo}` : ''}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log('View details') },
        { text: 'Assign', onPress: () => console.log('Assign issue') }
      ]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#DC2626';
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#EF4444';
      case 'in-progress': return '#F59E0B';
      case 'resolved': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-circle';
      case 'high': return 'warning';
      case 'medium': return 'information-circle';
      case 'low': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  const FilterButton = ({ title, value, isActive, onPress }: { title: string; value: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        { backgroundColor: isActive ? '#1E40AF' : isDarkMode ? '#374151' : '#F3F4F6' }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterButtonText,
        { color: isActive ? 'white' : colors.text }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Active Issues</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.searchBar, { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }]}>
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search issues..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Buttons - Status */}
      <View style={styles.filterContainer}>
        <Text style={[styles.filterLabel, { color: colors.text }]}>Status:</Text>
        <FilterButton title="All" value="all" isActive={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterButton title="Open" value="open" isActive={filter === 'open'} onPress={() => setFilter('open')} />
        <FilterButton title="In Progress" value="in-progress" isActive={filter === 'in-progress'} onPress={() => setFilter('in-progress')} />
        <FilterButton title="Resolved" value="resolved" isActive={filter === 'resolved'} onPress={() => setFilter('resolved')} />
      </View>

      {/* Filter Buttons - Severity */}
      <View style={styles.filterContainer}>
        <Text style={[styles.filterLabel, { color: colors.text }]}>Severity:</Text>
        <FilterButton title="All" value="all" isActive={severityFilter === 'all'} onPress={() => setSeverityFilter('all')} />
        <FilterButton title="Critical" value="critical" isActive={severityFilter === 'critical'} onPress={() => setSeverityFilter('critical')} />
        <FilterButton title="High" value="high" isActive={severityFilter === 'high'} onPress={() => setSeverityFilter('high')} />
        <FilterButton title="Medium" value="medium" isActive={severityFilter === 'medium'} onPress={() => setSeverityFilter('medium')} />
        <FilterButton title="Low" value="low" isActive={severityFilter === 'low'} onPress={() => setSeverityFilter('low')} />
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
        <Text style={[styles.statsText, { color: colors.text }]}>
          {filteredIssues.length} issues found
        </Text>
      </View>

      {/* Issues List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredIssues.map((issue) => (
          <TouchableOpacity
            key={issue.id}
            style={[styles.issueCard, { backgroundColor: colors.background, borderColor: isDarkMode ? '#374151' : '#E5E7EB' }]}
            onPress={() => handleIssuePress(issue)}
          >
            <View style={styles.issueHeader}>
              <View style={styles.issueInfo}>
                <Text style={[styles.issueTitle, { color: colors.text }]}>
                  {issue.title}
                </Text>
                <Text style={[styles.issueLocation, { color: colors.icon }]}>
                  {issue.location}
                </Text>
              </View>
              <View style={styles.badgeContainer}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(issue.severity) }]}>
                  <Ionicons name={getSeverityIcon(issue.severity)} size={14} color="white" />
                  <Text style={styles.badgeText}>{issue.severity}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(issue.status) }]}>
                  <Text style={styles.badgeText}>{issue.status}</Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.issueDescription, { color: colors.icon }]} numberOfLines={2}>
              {issue.description}
            </Text>
            
            <View style={styles.issueDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="folder-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {issue.category}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {issue.reportedBy}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {issue.reportedAt}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  issueCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  issueInfo: {
    flex: 1,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  issueLocation: {
    fontSize: 14,
  },
  badgeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  issueDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  issueDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
});
