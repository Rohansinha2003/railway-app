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

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  componentId: string;
  componentName: string;
  location: string;
  scheduledDate: string;
  dueDate: string;
  assignedTo?: string;
  category: string;
  estimatedDuration: string;
  actualDuration?: string;
}

export default function MaintenanceScreen() {
  const { colors, isDarkMode } = useTheme();
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<MaintenanceTask[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed' | 'overdue'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');

  useEffect(() => {
    // Mock data for demonstration
    const mockTasks: MaintenanceTask[] = [
      {
        id: '1',
        title: 'Signal Box Calibration',
        description: 'Calibrate signal timing and response parameters',
        priority: 'high',
        status: 'scheduled',
        componentId: 'SIG-001',
        componentName: 'Signal Box A-101',
        location: 'Platform 1, Station A',
        scheduledDate: '2024-01-20 09:00',
        dueDate: '2024-01-20 17:00',
        assignedTo: 'John Smith',
        category: 'Signaling',
        estimatedDuration: '4 hours'
      },
      {
        id: '2',
        title: 'Track Sensor Replacement',
        description: 'Replace faulty track occupancy sensor',
        priority: 'urgent',
        status: 'in-progress',
        componentId: 'TS-205',
        componentName: 'Track Sensor B-205',
        location: 'Track Section B-2',
        scheduledDate: '2024-01-15 08:00',
        dueDate: '2024-01-15 16:00',
        assignedTo: 'Mike Wilson',
        category: 'Sensors',
        estimatedDuration: '6 hours',
        actualDuration: '4 hours'
      },
      {
        id: '3',
        title: 'Switch Point Lubrication',
        description: 'Lubricate switch point mechanism and test operation',
        priority: 'medium',
        status: 'completed',
        componentId: 'SP-301',
        componentName: 'Switch Point C-301',
        location: 'Junction C',
        scheduledDate: '2024-01-12 10:00',
        dueDate: '2024-01-12 14:00',
        assignedTo: 'David Brown',
        category: 'Switches',
        estimatedDuration: '3 hours',
        actualDuration: '2.5 hours'
      },
      {
        id: '4',
        title: 'Power Unit Inspection',
        description: 'Inspect power unit for overheating and electrical issues',
        priority: 'high',
        status: 'overdue',
        componentId: 'PU-401',
        componentName: 'Power Unit D-401',
        location: 'Substation D',
        scheduledDate: '2024-01-10 09:00',
        dueDate: '2024-01-10 15:00',
        assignedTo: 'Tom Anderson',
        category: 'Power',
        estimatedDuration: '5 hours'
      },
      {
        id: '5',
        title: 'Communication System Update',
        description: 'Update communication hub firmware and test connectivity',
        priority: 'low',
        status: 'scheduled',
        componentId: 'CH-501',
        componentName: 'Communication Hub E-501',
        location: 'Control Room E',
        scheduledDate: '2024-01-25 14:00',
        dueDate: '2024-01-25 18:00',
        assignedTo: 'Jane Smith',
        category: 'Communication',
        estimatedDuration: '3 hours'
      }
    ];
    
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  const filterTasks = useCallback(() => {
    let filtered = tasks;

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.status === filter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.componentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filter, priorityFilter, searchQuery]);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleTaskPress = (task: MaintenanceTask) => {
    Alert.alert(
      task.title,
      `Description: ${task.description}\n\nComponent: ${task.componentName}\nLocation: ${task.location}\nPriority: ${task.priority}\nStatus: ${task.status}\nScheduled: ${task.scheduledDate}\nDue: ${task.dueDate}\nAssigned to: ${task.assignedTo || 'Unassigned'}\nEstimated Duration: ${task.estimatedDuration}${task.actualDuration ? `\nActual Duration: ${task.actualDuration}` : ''}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log('View details') },
        { text: 'Start Task', onPress: () => console.log('Start task') }
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3B82F6';
      case 'in-progress': return '#F59E0B';
      case 'completed': return '#10B981';
      case 'overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'alert-circle';
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Maintenance</Text>
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
            placeholder="Search maintenance tasks..."
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
        <FilterButton title="Scheduled" value="scheduled" isActive={filter === 'scheduled'} onPress={() => setFilter('scheduled')} />
        <FilterButton title="In Progress" value="in-progress" isActive={filter === 'in-progress'} onPress={() => setFilter('in-progress')} />
        <FilterButton title="Completed" value="completed" isActive={filter === 'completed'} onPress={() => setFilter('completed')} />
        <FilterButton title="Overdue" value="overdue" isActive={filter === 'overdue'} onPress={() => setFilter('overdue')} />
      </View>

      {/* Filter Buttons - Priority */}
      <View style={styles.filterContainer}>
        <Text style={[styles.filterLabel, { color: colors.text }]}>Priority:</Text>
        <FilterButton title="All" value="all" isActive={priorityFilter === 'all'} onPress={() => setPriorityFilter('all')} />
        <FilterButton title="Urgent" value="urgent" isActive={priorityFilter === 'urgent'} onPress={() => setPriorityFilter('urgent')} />
        <FilterButton title="High" value="high" isActive={priorityFilter === 'high'} onPress={() => setPriorityFilter('high')} />
        <FilterButton title="Medium" value="medium" isActive={priorityFilter === 'medium'} onPress={() => setPriorityFilter('medium')} />
        <FilterButton title="Low" value="low" isActive={priorityFilter === 'low'} onPress={() => setPriorityFilter('low')} />
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }]}>
        <Text style={[styles.statsText, { color: colors.text }]}>
          {filteredTasks.length} tasks found
        </Text>
      </View>

      {/* Tasks List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[styles.taskCard, { backgroundColor: colors.background, borderColor: isDarkMode ? '#374151' : '#E5E7EB' }]}
            onPress={() => handleTaskPress(task)}
          >
            <View style={styles.taskHeader}>
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, { color: colors.text }]}>
                  {task.title}
                </Text>
                <Text style={[styles.taskComponent, { color: colors.icon }]}>
                  {task.componentName}
                </Text>
                <Text style={[styles.taskLocation, { color: colors.icon }]}>
                  {task.location}
                </Text>
              </View>
              <View style={styles.badgeContainer}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                  <Ionicons name={getPriorityIcon(task.priority)} size={14} color="white" />
                  <Text style={styles.badgeText}>{task.priority}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                  <Text style={styles.badgeText}>{task.status}</Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.taskDescription, { color: colors.icon }]} numberOfLines={2}>
              {task.description}
            </Text>
            
            <View style={styles.taskDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {task.scheduledDate}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {task.assignedTo || 'Unassigned'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color={colors.icon} />
                <Text style={[styles.detailText, { color: colors.icon }]}>
                  {task.estimatedDuration}
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
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskComponent: {
    fontSize: 14,
    marginBottom: 2,
  },
  taskLocation: {
    fontSize: 12,
  },
  badgeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  priorityBadge: {
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
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  taskDetails: {
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
