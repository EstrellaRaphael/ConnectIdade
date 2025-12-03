import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button } from '../components/ui/Button';
import { AppState } from '../types';

interface Props {
    state: AppState;
    navigateTo: (screen: string, params: any) => void;
    handleLogin: () => Promise<void>; 
}

export default function SplashScreen({ state, navigateTo, handleLogin }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const onLoginPress = async () => {
        setIsLoading(true);
        try {
            await handleLogin();
        } catch (error) {
            Alert.alert(
                "Erro no Login",
                "Não foi possível conectar ao servidor. Tente novamente."
            );
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <View style={[
            styles.container,
            state.highContrast && styles.highContrast,
        ]}>
            <Text style={styles.emoji}>📱</Text>

            <Text style={[
                styles.title,
                state.largeText && styles.titleLarge,
                state.highContrast && styles.textHighContrast,
            ]}>
                ConnectIdade
            </Text>

            <Text style={[
                styles.subtitle,
                state.largeText && styles.subtitleLarge,
                state.highContrast && styles.textHighContrast,
            ]}>
                Aprenda, pratique e ganhe confiança no uso do celular
            </Text>

            <Button
                onPress={onLoginPress}
                disabled={isLoading}
                size={state.largeText ? 'lg' : 'default'}
                style={[
                    styles.button,
                    state.highContrast && styles.buttonHighContrast,
                ]}
            >
                {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={[
                        styles.buttonText,
                        state.largeText && styles.buttonTextLarge,
                    ]}>
                        Entrar
                    </Text>
                )}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#dbeafe',
    },
    highContrast: {
        backgroundColor: '#ffffff',
    },
    emoji: {
        fontSize: 80,
        marginBottom: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1e3a8a',
        textAlign: 'center',
        marginBottom: 16,
    },
    titleLarge: {
        fontSize: 48,
    },
    subtitle: {
        fontSize: 20,
        color: '#1e40af',
        textAlign: 'center',
        marginBottom: 32,
        maxWidth: 400,
    },
    subtitleLarge: {
        fontSize: 24,
    },
    textHighContrast: {
        color: '#000000',
    },
    button: {
        backgroundColor: '#16a34a',
        paddingHorizontal: 40,
        paddingVertical: 16,
    },
    buttonHighContrast: {
        backgroundColor: '#000000',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextLarge: {
        fontSize: 24,
    },
});