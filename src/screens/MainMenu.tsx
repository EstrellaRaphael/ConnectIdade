import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Settings, Check, TrendingUp } from 'lucide-react-native';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScreenProps } from '../types';
import { MODULES } from '../config/modules';

export default function MainMenu({ state, navigateTo }: ScreenProps) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[
                styles.header,
                state.highContrast && styles.headerHighContrast,
            ]}>
                <Text style={[
                    styles.headerTitle,
                    state.largeText && styles.headerTitleLarge,
                ]}>
                    Menu Principal
                </Text>
                <TouchableOpacity onPress={() => navigateTo('settings')}>
                    <Settings
                        size={state.largeText ? 32 : 24}
                        color={state.highContrast ? '#000' : '#374151'}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Lições Section */}
                <Text style={[
                    styles.sectionTitle,
                    state.largeText && styles.sectionTitleLarge,
                ]}>
                    Lições
                </Text>

                <View style={styles.grid}>
                    {MODULES.map((module) => {
                        const Icon = module.Icon;
                        const isCompleted = state.userProgress.completedModules.includes(module.id);

                        return (
                            <TouchableOpacity
                                key={module.id}
                                onPress={() => navigateTo(module.screen)}
                                style={styles.gridItem}
                            >
                                <Card style={[
                                    styles.card,
                                    state.highContrast ? styles.cardHighContrast : { backgroundColor: module.lightColor },
                                ]}>
                                    <CardContent style={styles.cardContent}>
                                        <Icon
                                            size={state.largeText ? 64 : 48}
                                            color={state.highContrast ? '#000' : module.color}
                                        />
                                        <Text style={[
                                            styles.cardTitle,
                                            state.largeText && styles.cardTitleLarge,
                                        ]}>
                                            {module.name}
                                        </Text>
                                        {isCompleted && (
                                            <View style={styles.completed}>
                                                <Check size={20} color="#16a34a" />
                                                <Text style={styles.completedText}>Concluído</Text>
                                            </View>
                                        )}
                                    </CardContent>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Divider */}
                <View style={[
                    styles.divider,
                    state.highContrast && styles.dividerHighContrast,
                ]} />

                {/* Acompanhamento Section */}
                <Text style={[
                    styles.sectionTitle,
                    state.largeText && styles.sectionTitleLarge,
                ]}>
                    Acompanhamento
                </Text>

                <TouchableOpacity onPress={() => navigateTo('progress')}>
                    <Card style={[
                        styles.card,
                        state.highContrast ? styles.cardHighContrast : styles.progressCard,
                    ]}>
                        <CardContent style={styles.cardContent}>
                            <TrendingUp
                                size={state.largeText ? 64 : 48}
                                color={state.highContrast ? '#000' : '#ec4899'}
                            />
                            <Text style={[
                                styles.cardTitle,
                                state.largeText && styles.cardTitleLarge,
                            ]}>
                                Meu Progresso
                            </Text>
                        </CardContent>
                    </Card>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeafe',
    },
    header: {
        backgroundColor: '#ffffff',
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerHighContrast: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerTitleLarge: {
        fontSize: 32,
    },
    content: {
        flex: 1,
        padding: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
    },
    sectionTitleLarge: {
        fontSize: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
        marginBottom: 24,
    },
    gridItem: {
        width: '50%',
        padding: 8,
    },
    card: {
        marginBottom: 0,
    },
    cardHighContrast: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#000',
    },
    progressCard: {
        backgroundColor: '#fce7f3',
    },
    cardContent: {
        alignItems: 'center',
        padding: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
        marginTop: 12,
    },
    cardTitleLarge: {
        fontSize: 20,
    },
    completed: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 4,
    },
    completedText: {
        color: '#16a34a',
        fontSize: 14,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#d1d5db',
        marginVertical: 24,
    },
    dividerHighContrast: {
        backgroundColor: '#000',
        height: 2,
    },
});