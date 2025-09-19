import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import QRScanner from '@/components/QRScanner';

export default function QRScannerScreen() {

  const handleScan = (data: string) => {
    console.log('QR Code scanned:', data);
    
    // Show success message
    Alert.alert(
      'QR Code Scanned Successfully!',
      `Scanned data: ${data}`,
      [
        {
          text: 'Scan Another',
          onPress: () => console.log('Scan another'),
        },
        {
          text: 'Done',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <QRScanner onScan={handleScan} onClose={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
