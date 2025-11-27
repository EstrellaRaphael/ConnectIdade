import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert
} from 'react-native';
import { ArrowLeft, Play, Award, Video, Check } from 'lucide-react-native';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScreenProps, LicaoDto } from '../types';
import { MODULES } from '../config/modules';
import api from '../services/api';

interface ModuleMenuProps extends ScreenProps {
    moduleId: string;
}

export default function ModuleMenu({ state, navigateTo, moduleId }: ModuleMenuProps) {
    const [licoes, setLicoes] = useState<LicaoDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const moduleInfo = MODULES.find(m => m.id === moduleId);

    useEffect(() => {
        const fetchModuleData = async () => {
            if (!moduleInfo) {
                setIsLoading(false);
                Alert.alert('Erro', 'Módulo não encontrado.');
                return;
            }

            try {
                const modulosResponse = await api.get('/api/modulos');
                const backendModule = modulosResponse.data.find(
                    (m: any) => m.titulo === moduleInfo.name
                );

                if (!backendModule) {
                    throw new Error('Módulo não encontrado no backend');
                }

                const licoesResponse = await api.get(`/api/modulos/${backendModule.id}/licoes`);
                setLicoes(licoesResponse.data);

            } catch (err) {
                console.error(err);
                Alert.alert('Erro de Conexão', 'Não foi possível carregar as atividades.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchModuleData();
    }, [moduleId, moduleInfo]);

    const simuladorLicao = licoes.find(l => l.tipo === 'SIMULADOR');
    const quizLicao = licoes.find(l => l.tipo === 'QUIZ');

    const isCompleted = state.progresso?.licoesCompletasIds.includes(simuladorLicao?.id || -1) || false;

    if (!moduleInfo) {
        return null;
    }

    const Icon = moduleInfo.Icon;

    return (
        <View style={styles.container}>
            <View style={[
                styles.header,
                state.highContrast && styles.headerHighContrast,
            ]}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo('menu')}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color={state.highContrast ? '#000' : '#374151'} />
                </Button>

                <View style={styles.headerContent}>
                    <Icon
                        size={state.largeText ? 80 : 64}
                        color={state.highContrast ? '#000' : moduleInfo.color}
                    />
                    <Text style={[
                        styles.headerTitle,
                        state.largeText && styles.headerTitleLarge,
                    ]}>
                        {moduleInfo.name}
                    </Text>
                    
                    {isCompleted && (
                        <View style={styles.completed}>
                            <Check size={20} color="#16a34a" />
                            <Text style={styles.completedText}>Módulo Concluído</Text>
                        </View>
                    )}
                </View>
            </View>

            <ScrollView style={styles.content}>
                {isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#2563eb" />
                        <Text style={styles.loaderText}>Carregando atividades...</Text>
                    </View>
                ) : (
                    <>
                        {/* Simulador */}
                        <TouchableOpacity onPress={() => navigateTo(moduleId)}>
                            <Card style={[
                                styles.card,
                                state.highContrast ? styles.cardHighContrast : styles.cardBlue,
                            ]}>
                                <CardContent style={styles.cardContent}>
                                    <Play
                                        size={state.largeText ? 48 : 40}
                                        color={state.highContrast ? '#000' : '#2563eb'}
                                    />
                                    <View style={styles.cardText}>
                                        <Text style={[
                                            styles.cardTitle,
                                            state.largeText && styles.cardTitleLarge,
                                        ]}>
                                            Simulador
                                        </Text>
                                        <Text style={[
                                            styles.cardDescription,
                                            state.largeText && styles.cardDescriptionLarge,
                                        ]}>
                                            Pratique em ambiente seguro
                                        </Text>
                                    </View>
                                </CardContent>
                            </Card>
                        </TouchableOpacity>

                        {/* Quiz */}
                        <TouchableOpacity
                            onPress={() => 
                                isCompleted && 
                                quizLicao && 
                                navigateTo('quiz', { licaoId: quizLicao.id, moduleId: moduleId })
                            }
                            disabled={!isCompleted || !quizLicao}
                        >
                            <Card style={[
                                styles.card,
                                state.highContrast ? styles.cardHighContrast : styles.cardYellow,
                                (!isCompleted || !quizLicao) && styles.cardDisabled, 
                            ]}>
                                <CardContent style={styles.cardContent}>
                                    <Award
                                        size={state.largeText ? 48 : 40}
                                        color={state.highContrast ? '#000' : '#eab308'}
                                        opacity={(!isCompleted || !quizLicao) ? 0.5 : 1}
                                    />
                                    <View style={styles.cardText}>
                                        <Text style={[
                                            styles.cardTitle,
                                            state.largeText && styles.cardTitleLarge,
                                            (!isCompleted || !quizLicao) && styles.textDisabled,
                                        ]}>
                                            Quiz
                                        </Text>
                                        <Text style={[
                                            styles.cardDescription,
                                            state.largeText && styles.cardDescriptionLarge,
                                            (!isCompleted || !quizLicao) && styles.textDisabled,
                                        ]}>
                                            {isCompleted ? 'Teste seus conhecimentos' : '🔒 Complete o simulador primeiro'}
                                        </Text>
                                    </View>
                                </CardContent>
                            </Card>
                        </TouchableOpacity>

                        {/* Vídeo Explicativo */}
                        <TouchableOpacity onPress={() => navigateTo(`video-${moduleId}`)}>
                            <Card style={[
                                styles.card,
                                state.highContrast ? styles.cardHighContrast : styles.cardPurple,
                            ]}>
                                <CardContent style={styles.cardContent}>
                                    <Video
                                        size={state.largeText ? 48 : 40}
                                        color={state.highContrast ? '#000' : '#7c3aed'}
                                    />
                                    <View style={styles.cardText}>
                                        <Text style={[
                                            styles.cardTitle,
                                            state.largeText && styles.cardTitleLarge,
                                        ]}>
                                            Vídeo Explicativo
                                        </Text>
                                        <Text style={[
                                            styles.cardDescription,
                                            state.largeText && styles.cardDescriptionLarge,
                                        ]}>
                                            Aprenda assistindo
                                        </Text>
                                    </View>
                                </CardContent>
                            </Card>
                        </TouchableOpacity>

                        {/* Dica */}
                        <Card style={[
                            styles.tipCard,
                            state.highContrast && styles.cardHighContrast,
                        ]}>
                            <CardContent style={styles.tipContent}>
                                <Text style={[
                                    styles.tipText,
                                    state.largeText && styles.tipTextLarge,
                                ]}>
                                    💡 <Text style={styles.tipBold}>Dica:</Text> Recomendamos fazer nesta ordem: Vídeo → Simulador → Quiz
                                </Text>
                            </CardContent>
                        </Card>
                    </>
                )}
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
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 16,
        textAlign: 'center',
    },
    headerTitleLarge: {
        fontSize: 32,
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
    content: {
        flex: 1,
        padding: 24,
    },
    card: {
        marginBottom: 16,
    },
    cardHighContrast: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#000',
    },
    cardBlue: {
        backgroundColor: '#dbeafe',
    },
    cardYellow: {
        backgroundColor: '#fef3c7',
    },
    cardPurple: {
        backgroundColor: '#ede9fe',
    },
    cardDisabled: {
        opacity: 0.5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 24,
    },
    cardText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    cardTitleLarge: {
        fontSize: 24,
    },
    cardDescription: {
        fontSize: 16,
        color: '#6b7280',
    },
    cardDescriptionLarge: {
        fontSize: 18,
    },
    textDisabled: {
        opacity: 0.5,
    },
    tipCard: {
        backgroundColor: '#dcfce7',
        marginTop: 8,
    },
    tipContent: {
        padding: 16,
    },
    tipText: {
        fontSize: 16,
        color: '#166534',
    },
    tipTextLarge: {
        fontSize: 18,
    },
    tipBold: {
        fontWeight: 'bold',
    },
});