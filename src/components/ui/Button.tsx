import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'default',
    size = 'default',
    disabled = false,
    style,
}) => {
    const buttonStyles: ViewStyle[] = [styles.base];
    const textStyles: TextStyle[] = [styles.textBase];

    // Variant styles
    switch (variant) {
        case 'outline':
            buttonStyles.push(styles.outline);
            textStyles.push(styles.textOutline);
            break;
        case 'ghost':
            buttonStyles.push(styles.ghost);
            textStyles.push(styles.textGhost);
            break;
        case 'destructive':
            buttonStyles.push(styles.destructive);
            textStyles.push(styles.textDefault);
            break;
        default:
            buttonStyles.push(styles.default);
            textStyles.push(styles.textDefault);
    }

    // Size styles
    switch (size) {
        case 'sm':
            buttonStyles.push(styles.sm);
            textStyles.push(styles.textSm);
            break;
        case 'lg':
            buttonStyles.push(styles.lg);
            textStyles.push(styles.textLg);
            break;
        case 'icon':
            buttonStyles.push(styles.icon);
            break;
        default:
            buttonStyles.push(styles.sizeDefault);
    }

    if (disabled) {
        buttonStyles.push(styles.disabled);
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[...buttonStyles, style]}
            activeOpacity={0.7}
        >
            {typeof children === 'string' ? (
                <Text style={textStyles}>{children}</Text>
            ) : (
                children
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    default: {
        backgroundColor: '#2563eb',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#d1d5db',
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    destructive: {
        backgroundColor: '#dc2626',
    },
    sizeDefault: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    sm: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    lg: {
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    icon: {
        width: 48,
        height: 48,
        padding: 12,
    },
    disabled: {
        opacity: 0.5,
    },
    textBase: {
        fontWeight: '600',
    },
    textDefault: {
        color: '#ffffff',
        fontSize: 16,
    },
    textOutline: {
        color: '#374151',
        fontSize: 16,
    },
    textGhost: {
        color: '#374151',
        fontSize: 16,
    },
    textSm: {
        fontSize: 14,
    },
    textLg: {
        fontSize: 18,
    },
});