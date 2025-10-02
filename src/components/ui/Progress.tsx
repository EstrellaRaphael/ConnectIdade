import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressProps {
    value: number;
    style?: any;
}

export const Progress: React.FC<ProgressProps> = ({ value, style }) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.fill, { width: `${clampedValue}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 16,
        backgroundColor: '#e5e7eb',
        borderRadius: 9999,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: '#2563eb',
        borderRadius: 9999,
    },
});