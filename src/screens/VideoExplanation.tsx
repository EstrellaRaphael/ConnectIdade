import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { ArrowLeft, Play } from 'lucide-react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScreenProps, LicaoDto, ModuloDto } from '../types';
import { MODULES } from '../config/modules';
import api from '../services/api';

interface VideoExplanationProps extends ScreenProps {
    moduleId: string;
}
const MODULE_VIDEOS: Record<string, string> = {
    'calls': 'https://youtu.be/DrQLLUCm71o',
    'messages': 'https://youtu.be/sLfR7T-6MKI',
    'security': 'https://youtu.be/SdCGNGmTABU',
    'camera': 'https://youtu.be/xna7GuTT05E',
};
const getYoutubeId = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default function VideoExplanation({ state, navigateTo, moduleId, showToast }: VideoExplanationProps) {
    
    const [modulo, setModulo] = useState<ModuloDto | null>(null);
    const [simuladorLicao, setSimuladorLicao] = useState<LicaoDto | null>(null);
    const [quizLicao, setQuizLicao] = useState<LicaoDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [playing, setPlaying] = useState(false);

    const moduleInfo = MODULES.find(m => m.id === moduleId);

    const currentVideoUrl = MODULE_VIDEOS[moduleId];
    
    const videoId = getYoutubeId(currentVideoUrl);

    useEffect(() => {
        const fetchModuleData = async () => {
            if (!moduleInfo) {
                setIsLoading(false); 
                return;
            }

            try {
                const modulosRes = await api.get('/api/modulos');
                const backendModule = modulosRes.data.find(
                    (m: any) => m.titulo === moduleInfo.name
                );

                if (backendModule) {
                    setModulo(backendModule);
                    const licoesRes = await api.get(`/api/modulos/${backendModule.id}/licoes`);
                    const licoes: LicaoDto[] = licoesRes.data;

                    setSimuladorLicao(licoes.find(l => l.tipo === 'SIMULADOR') || null);
                    setQuizLicao(licoes.find(l => l.tipo === 'QUIZ') || null);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModuleData();
    }, [moduleId, moduleInfo]);

    const isCompleted = state.progresso?.licoesCompletasIds.includes(simuladorLicao?.id || -1) || false;

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
            showToast("Vídeo finalizado! Agora vamos praticar?", "success");
        }
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 50 }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo(`${moduleId}-menu`, {})}
                    style={styles.backButton}
                >
                    <View style={styles.backButtonContent}>
                        <ArrowLeft size={24} color="#374151" />
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </View>
                </Button>

                <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                    <CardHeader>
                        <CardTitle>
                            <Text style={state.largeText && styles.cardTitleLarge}>
                                {modulo?.titulo || moduleInfo?.name || "Vídeo Explicativo"}
                            </Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* PLAYER DE VÍDEO */}
                        <View style={[
                            styles.videoWrapper,
                            state.highContrast && styles.videoContainerHighContrast,
                        ]}>
                            {videoId ? (
                                <YoutubePlayer
                                    height={220}
                                    play={playing}
                                    videoId={videoId}
                                    onChangeState={onStateChange}
                                    initialPlayerParams={{
                                        controls: true,
                                        modestbranding: true,
                                        rel: false
                                    }}
                                />
                            ) : (
                                <View style={styles.videoErrorContainer}>
                                    <Text style={styles.videoErrorText}>
                                        {currentVideoUrl 
                                            ? "Erro ao carregar vídeo" 
                                            : "Vídeo não cadastrado para este módulo"}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* <Button
                            onPress={() => {
                                if (videoId) {
                                    setPlaying(!playing);
                                    if(!playing) showToast('Iniciando vídeo...', 'info');
                                } else {
                                    showToast('Vídeo indisponível', 'error');
                                }
                            }}
                            disabled={!videoId}
                            style={
                                state.highContrast
                                    ? { ...styles.playButton, ...styles.playButtonHighContrast }
                                    : videoId ? styles.playButton : { ...styles.playButton, ...styles.disabled }
                            }
                        >
                            <View style={styles.playButtonContent}>
                                <Play size={24} color="#ffffff" fill={playing ? "#ffffff" : "transparent"} />
                                <Text style={[
                                    styles.playButtonText,
                                    state.largeText && styles.playButtonTextLarge,
                                ]}>
                                    {playing ? "Pausar Vídeo" : "Assistir Vídeo"}
                                </Text>
                            </View>
                        </Button> */}

                        <Card style={[
                            styles.descriptionCard,
                            state.highContrast && styles.cardHighContrast,
                        ]}>
                            <CardContent style={styles.descriptionContent}>
                                <Text style={[
                                    styles.descriptionTitle,
                                    state.largeText && styles.descriptionTitleLarge,
                                ]}>
                                    Sobre esta lição:
                                </Text>
                                <Text style={[
                                    styles.descriptionText,
                                    state.largeText && styles.descriptionTextLarge,
                                ]}>
                                    {modulo?.descricao || "Aprenda os conceitos fundamentais neste vídeo introdutório."}
                                </Text>
                            </CardContent>
                        </Card>

                        <View style={styles.buttonsRow}>
                            <Button
                                variant="outline"
                                onPress={() => navigateTo(moduleId, {})}
                                style={styles.actionButton}
                            >
                                <Text style={styles.actionButtonText}>Ir para Simulador</Text>
                            </Button>
                            <Button
                                variant="outline"
                                onPress={() => 
                                    isCompleted && quizLicao && navigateTo('quiz', { licaoId: quizLicao.id, moduleId: moduleId })
                                }
                                disabled={!isCompleted || !quizLicao}
                                style={isCompleted ? styles.actionButton : { ...styles.actionButton, ...styles.disabled }}
                            >
                                <Text style={[
                                    styles.actionButtonText,
                                    !isCompleted && styles.disabledText,
                                ]}>
                                    Fazer Quiz
                                </Text>
                            </Button>
                        </View>
                    </CardContent>
                </Card>
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
    card: {
        marginBottom: 16,
    },
    cardHighContrast: {
        borderWidth: 2,
        borderColor: '#000',
    },
    cardTitleLarge: {
        fontSize: 24,
    },
    videoWrapper: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    videoErrorContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dbeafe',
        padding: 20,
    },
    videoErrorText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    videoContainerHighContrast: {
        backgroundColor: '#e5e7eb',
        borderWidth: 2,
        borderColor: '#000',
    },
    playButton: {
        backgroundColor: '#dc2626',
        paddingVertical: 16,
        marginBottom: 24,
    },
    playButtonHighContrast: {
        backgroundColor: '#000',
    },
    playButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center'
    },
    playButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    playButtonTextLarge: {
        fontSize: 20,
    },
    descriptionCard: {
        backgroundColor: '#dbeafe',
        marginBottom: 24,
    },
    descriptionContent: {
        padding: 16,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    descriptionTitleLarge: {
        fontSize: 18,
    },
    descriptionText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
    descriptionTextLarge: {
        fontSize: 18,
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#374151',
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.5,
    },
});