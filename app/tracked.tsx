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

interface TrackedComponent {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastScanned: string;
  qrCode: string;
  category: string;
}

export default function TrackedScreen() {
  const { colors, isDarkMode } = useTheme();
  const [components, setComponents] = useState<TrackedComponent[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<TrackedComponent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'maintenance'>('all');

  useEffect(() => {
    // Mock data for demonstration
    const mockComponents: TrackedComponent[] = [
      {
        id: '1',
        name: 'Signal Box A-101',
        location: 'Platform 1, Station A',
        status: 'active',
        lastScanned: '2024-01-15 14:30',
        qrCode: 'QR001',
        category: 'Signaling'
      },
      {
        id: '2',
        name: 'Track Sensor B-205',
        location: 'Track Section B-2',
        status: 'maintenance',
        lastScanned: '2024-01-14 09:15',
        qrCode: 'QR002',
        category: 'Sensors'
      },
      {
        id: '3',
        name: 'Switch Point C-301',
        location: 'Junction C',
        status: 'active',
        lastScanned: '2024-01-15 16:45',
        qrCode: 'QR003',
        category: 'Switches'
      },
      {
        id: '4',
        name: 'Power Unit D-401',
        location: 'Substation D',
        status: 'inactive',
        lastScanned: '2024-01-10 11:20',
        qrCode: 'QR004',
        category: 'Power'
      },
      {
        id: '5',
        name: 'Communication Hub E-501',
        location: 'Control Room E',
        status: 'active',
        lastScanned: '2024-01-15 13:10',
        qrCode: 'QR005',
        category: 'Communication'
      }
    ];
    
    setComponents(mockComponents);
    setFilteredComponents(mockComponents);
  }, []);

  const filterComponents = useCallback(() => {
    let filtered = components;

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(component => component.status === filter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredComponents(filtered);
  }, [components, filter, searchQuery]);

  useEffect(() => {
    filterComponents();
  }, [filterComponents]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleComponentPress = (component: TrackedComponent) => {
    Alert.alert(
      component.name,
      `Location: ${component.location}\nStatus: ${component.status}\nLast Scanned: ${component.lastScanned}\nQR Code: ${component.qrCode}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log('View details') }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#6B7280';
      case 'maintenance': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'checkmark-circle';
      case 'inactive': return 'close-circle';
      case 'maintenance': return 'construct';
      default: return 'help-circle';
    }
  };

  const FilterButton = ({ title, value, isActive }: { title: string; value: string; isActive: boolean }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        { backgroundColor: isActive ? '#1E40AF' : isDarkMode ? '#374151' : '#F3F4F6' }
      ]}
      onPress={() => setFilter(value as any)}
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tracked Components</Text>
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
            placeholder="Search components..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FilterButton title="All" value="all" isActive={filter === 'all'} />
        <FilterButton title="Active" value="active" isActive={filter === 'active'} />
        <FilterButton title="Maintenance" value="maintenance" isActive={filter === 'maintenance'} />
        <FilterButton title="Inactive" value="inactive" isActive={filter === 'inactive'} />
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
        <Text style={[styles.statsText, { color: colors.text }]}>
          {filteredComponents.length} components found
        </Text>
      </View>

      {/* Components List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredComponents.map((component) => (
          <TouchableOpacity
            key={component.id}
            style={[styles.componentCard, { backgroundColor: colors.background, borderColor: isDarkMode ? '#374151' : '#E5E7EB' }]}
            onPress={() => handleComponentPress(component)}
          >
            <View style={styles.componentHeader}>
              <View style={styles.componentInfo}>
                <Text style={[styles.componentName, { color: colors.text }]}>
                  {component.name}
                </Text>
                <Text style={[styles.componentLocation, { color: colors.icon }]}>
                  {component.location}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(component.status) }]}>
                <Ionicons name={getStatusIcon(component.status)} size={16} color="white" />
                <Text style={styles.statusText}>{component.status}</Text>
              </View>
            </View>
            
            <View style={styles.componentDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="folder-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {component.category}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="qr-code-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {component.qrCode}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {component.lastScanned}
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
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: 14,
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
  componentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  componentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  componentLocation: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  componentDetails: {
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
