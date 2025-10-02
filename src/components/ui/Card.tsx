import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

interface CardTitleProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
    <View style={[styles.card, style]}>{children}</View>
);

export const CardHeader: React.FC<CardProps> = ({ children }) => (
    <View style={styles.header}>{children}</View>
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => (
    <Text style={[styles.title, style]}>{children}</Text>
);

export const CardContent: React.FC<CardProps> = ({ children, style }) => (
    <View style={[styles.content, style]}>{children}</View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    content: {
        padding: 16,
    },
});