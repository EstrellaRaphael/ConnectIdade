import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Play } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScreenProps } from '../types';
import { VIDEO_INFO } from '../config/modules';

interface VideoExplanationProps extends ScreenProps {
    moduleId: string;
}

export default function VideoExplanation({ state, navigateTo, moduleId, showToast }: VideoExplanationProps) {
    const video = VIDEO_INFO[moduleId];
    if (!video) return null;

    const isCompleted = state.userProgress.completedModules.includes(moduleId);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo(`${moduleId}-menu`)}
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
                                {video.title}
                            </Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Video Placeholder */}
                        <View style={[
                            styles.videoContainer,
                            state.highContrast && styles.videoContainerHighContrast,
                        ]}>
                            <Play
                                size={80}
                                color={state.highContrast ? '#000' : '#ffffff'}
                                opacity={0.8}
                            />
                            <View style={[
                                styles.duration,
                                state.highContrast && styles.durationHighContrast,
                            ]}>
                                <Text style={styles.durationText}>{video.duration}</Text>
                            </View>
                        </View>

                        <Button
                            onPress={() => showToast('Vídeo iniciado!', 'success')}
                            style={
                                state.highContrast
                                    ? { ...styles.playButton, ...styles.playButtonHighContrast }
                                    : styles.playButton
                            }
                        >
                            <View style={styles.playButtonContent}>
                                <Play size={24} color="#ffffff" />
                                <Text style={[
                                    styles.playButtonText,
                                    state.largeText && styles.playButtonTextLarge,
                                ]}>
                                    Assistir Vídeo
                                </Text>
                            </View>
                        </Button>

                        <Card style={[
                            styles.descriptionCard,
                            state.highContrast && styles.cardHighContrast,
                        ]}>
                            <CardContent style={styles.descriptionContent}>
                                <Text style={[
                                    styles.descriptionTitle,
                                    state.largeText && styles.descriptionTitleLarge,
                                ]}>
                                    Sobre este vídeo:
                                </Text>
                                <Text style={[
                                    styles.descriptionText,
                                    state.largeText && styles.descriptionTextLarge,
                                ]}>
                                    {video.description}
                                </Text>
                            </CardContent>
                        </Card>

                        <View style={styles.buttonsRow}>
                            <Button
                                variant="outline"
                                onPress={() => navigateTo(moduleId)}
                                style={styles.actionButton}
                            >
                                <Text style={styles.actionButtonText}>Ir para Simulador</Text>
                            </Button>
                            <Button
                                variant="outline"
                                onPress={() => navigateTo(`quiz-${moduleId}`)}
                                disabled={!isCompleted}
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
    videoContainer: {
        aspectRatio: 16 / 9,
        backgroundColor: '#1f2937',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        position: 'relative',
    },
    videoContainerHighContrast: {
        backgroundColor: '#e5e7eb',
        borderWidth: 2,
        borderColor: '#000',
    },
    duration: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    durationHighContrast: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
    },
    durationText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
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