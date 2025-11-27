import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert
} from 'react-native';
import {
    Settings, TrendingUp, Phone,
    MessageSquare, Shield, Camera
} from 'lucide-react-native';
import { Card, CardContent } from '../components/ui/Card';
import { ScreenProps, ModuloDto } from '../types';
import api from '../services/api';
import { MODULES } from '../config/modules';

const moduleVisuals: { [key: string]: any } = {
    'Chamadas': {
        Icon: Phone,
        color: '#16a34a',
        lightColor: '#dcfce7',
    },
    'Mensagens/WhatsApp': {
        Icon: MessageSquare,
        color: '#2563eb',
        lightColor: '#dbeafe',
    },
    'Segurança Digital': {
        Icon: Shield,
        color: '#dc2626',
        lightColor: '#fee2e2',
    },
    'Câmera e Fotos': {
        Icon: Camera,
        color: '#7c3aed',
        lightColor: '#ede9fe',
    },
};

const defaultVisual = {
    Icon: Phone,
    color: '#6b7280',
    lightColor: '#f3f4f6',
};

export default function MainMenu({ state, navigateTo }: ScreenProps) {
    const [modules, setModules] = useState<ModuloDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await api.get('/api/modulos');
                setModules(response.data);
            } catch (err) {
                console.error(err);
                Alert.alert(
                    'Erro de Conexão',
                    'Não foi possível carregar as lições. Verifique sua conexão e tente novamente.'
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchModules();
    }, []);

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
                <TouchableOpacity onPress={() => navigateTo('settings', {})}>
                    <Settings
                        size={state.largeText ? 32 : 24}
                        color={state.highContrast ? '#000' : '#374151'}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <Text style={[
                    styles.sectionTitle,
                    state.largeText && styles.sectionTitleLarge,
                ]}>
                    Lições
                </Text>

                {/* Seção de Carregamento */}
                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#2563eb" />
                        <Text style={styles.loaderText}>Carregando lições...</Text>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {modules.map((module) => {
                            
                            const visual = moduleVisuals[module.titulo] || defaultVisual;
                            const Icon = visual.Icon;

                            const moduleConfig = MODULES.find(m => m.name === module.titulo);

                            if (!moduleConfig) return null;
                            return (
                                <TouchableOpacity
                                    key={module.id}
                                    onPress={() => navigateTo(moduleConfig.screen, {})}
                                    style={styles.gridItem}
                                >
                                    <Card style={[
                                        styles.card,
                                        state.highContrast 
                                            ? styles.cardHighContrast 
                                            : { backgroundColor: visual.lightColor },
                                    ]}>
                                        <CardContent style={styles.cardContent}>
                                            <Icon
                                                size={state.largeText ? 64 : 48}
                                                color={state.highContrast ? '#000' : visual.color}
                                            />
                                            <Text style={[
                                                styles.cardTitle,
                                                state.largeText && styles.cardTitleLarge,
                                            ]}>
                                                {module.titulo}
                                            </Text>
                                        </CardContent>
                                    </Card>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}

                {/* Seção de Acompanhamento */}
                <View style={[
                    styles.divider,
                    state.highContrast && styles.dividerHighContrast,
                ]} />

                <Text style={[
                    styles.sectionTitle,
                    state.largeText && styles.sectionTitleLarge,
                ]}>
                    Acompanhamento
                </Text>

                <TouchableOpacity onPress={() => navigateTo('progress', {})}>
                    <Card style={[
                        styles.card,
                        state.highContrast ? styles.cardHighContrast : styles.progressCard,
                        { height: undefined, minHeight: 120 } 
                    ]}>
                        <CardContent style={[styles.cardContent, { flexDirection: 'row', gap: 20 }]}>
                            <TrendingUp
                                size={state.largeText ? 64 : 48}
                                color={state.highContrast ? '#000' : '#ec4899'}
                            />
                            <Text style={[
                                styles.cardTitle,
                                state.largeText && styles.cardTitleLarge,
                                { marginTop: 0 }
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
    },
    loaderText: {
        marginTop: 16,
        fontSize: 18,
        color: '#374151',
    },
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
        textAlign: 'center',
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
        height: 170,
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
        padding: 16,
        flex: 1,
        justifyContent: 'center',
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