import React from 'react';
import { Switch as RNSwitch } from 'react-native';

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => (
    <RNSwitch
        value={checked}
        onValueChange={onCheckedChange}
        trackColor={{ false: '#cbd5e0', true: '#3b82f6' }}
        thumbColor={checked ? '#ffffff' : '#f4f4f5'}
        ios_backgroundColor="#cbd5e0"
    />
);