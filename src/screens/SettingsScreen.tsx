import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Type, Eye, Volume2, RotateCcw } from 'lucide-react-native';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Switch';
import { ScreenProps } from '../types';
import { Alert } from 'react-native';

export default function SettingsScreen({ state, navigateTo, toggleSetting, resetProgress }: ScreenProps) {
    const handleReset = () => {
        Alert.alert(
            'Resetar Progresso',
            'Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Resetar', style: 'destructive', onPress: resetProgress },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo('menu')}
                    style={styles.backButton}
                >
                    <View style={styles.backButtonContent}>
                        <ArrowLeft size={24} color="#374151" />
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </View>
                </Button>

                <Text style={[
                    styles.title,
                    state.largeText && styles.titleLarge,
                ]}>
                    Configurações de Acessibilidade
                </Text>

                <View style={styles.settingsContainer}>
                    {/* Texto Grande */}
                    <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                        <CardContent>
                            <View style={styles.settingRow}>
                                <View style={styles.settingInfo}>
                                    <Type size={state.largeText ? 32 : 24} color="#374151" />
                                    <View style={styles.settingTextContainer}>
                                        <Text style={[
                                            styles.settingTitle,
                                            state.largeText && styles.settingTitleLarge,
                                        ]}>
                                            Texto Grande
                                        </Text>
                                        <Text style={[
                                            styles.settingDescription,
                                            state.largeText && styles.settingDescriptionLarge,
                                        ]}>
                                            Aumenta o tamanho da fonte
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    checked={state.largeText}
                                    onCheckedChange={() => toggleSetting('largeText')}
                                />
                            </View>
                        </CardContent>
                    </Card>

                    {/* Alto Contraste */}
                    <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                        <CardContent>
                            <View style={styles.settingRow}>
                                <View style={styles.settingInfo}>
                                    <Eye size={state.largeText ? 32 : 24} color="#374151" />
                                    <View style={styles.settingTextContainer}>
                                        <Text style={[
                                            styles.settingTitle,
                                            state.largeText && styles.settingTitleLarge,
                                        ]}>
                                            Alto Contraste
                                        </Text>
                                        <Text style={[
                                            styles.settingDescription,
                                            state.largeText && styles.settingDescriptionLarge,
                                        ]}>
                                            Melhora a legibilidade
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    checked={state.highContrast}
                                    onCheckedChange={() => toggleSetting('highContrast')}
                                />
                            </View>
                        </CardContent>
                    </Card>

                    {/* Áudio Explicativo */}
                    <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                        <CardContent>
                            <View style={styles.settingRow}>
                                <View style={styles.settingInfo}>
                                    <Volume2 size={state.largeText ? 32 : 24} color="#374151" />
                                    <View style={styles.settingTextContainer}>
                                        <Text style={[
                                            styles.settingTitle,
                                            state.largeText && styles.settingTitleLarge,
                                        ]}>
                                            Áudio Explicativo
                                        </Text>
                                        <Text style={[
                                            styles.settingDescription,
                                            state.largeText && styles.settingDescriptionLarge,
                                        ]}>
                                            Narração das instruções
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    checked={state.audioEnabled}
                                    onCheckedChange={() => toggleSetting('audioEnabled')}
                                />
                            </View>
                        </CardContent>
                    </Card>

                    {/* Resetar Progresso */}
                    <Card style={[
                        styles.card,
                        state.highContrast ? styles.cardHighContrast : styles.dangerCard,
                    ]}>
                        <CardContent>
                            <View style={styles.settingInfo}>
                                <RotateCcw size={state.largeText ? 32 : 24} color="#dc2626" />
                                <View style={styles.settingTextContainer}>
                                    <Text style={[
                                        styles.settingTitle,
                                        styles.dangerTitle,
                                        state.largeText && styles.settingTitleLarge,
                                    ]}>
                                        Resetar Progresso
                                    </Text>
                                    <Text style={[
                                        styles.settingDescription,
                                        state.largeText && styles.settingDescriptionLarge,
                                    ]}>
                                        Apaga todas as suas conquistas
                                    </Text>
                                </View>
                            </View>
                            <Button
                                variant="destructive"
                                onPress={handleReset}
                                style={styles.resetButton}
                            >
                                <Text style={styles.resetButtonText}>Resetar Dados</Text>
                            </Button>
                        </CardContent>
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeafe',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    backButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#374151',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 24,
    },
    titleLarge: {
        fontSize: 32,
    },
    settingsContainer: {
        gap: 16,
    },
    card: {
        marginBottom: 0,
    },
    cardHighContrast: {
        borderWidth: 2,
        borderColor: '#000',
    },
    dangerCard: {
        borderWidth: 1,
        borderColor: '#fca5a5',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    settingTitleLarge: {
        fontSize: 20,
    },
    settingDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    settingDescriptionLarge: {
        fontSize: 16,
    },
    dangerTitle: {
        color: '#dc2626',
    },
    resetButton: {
        marginTop: 16,
    },
    resetButtonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
});