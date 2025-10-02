import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    large?: boolean;
}

export const Input: React.FC<InputProps> = ({ large, style, ...props }) => (
    <TextInput
        style={[styles.input, large && styles.large, style]}
        placeholderTextColor="#9ca3af"
        {...props}
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#ffffff',
    },
    large: {
        fontSize: 20,
        paddingVertical: 16,
    },
});