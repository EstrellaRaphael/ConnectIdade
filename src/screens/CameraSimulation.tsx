import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ArrowLeft, Zap, Timer, Grid, RotateCcw, Image as ImageIcon, Camera as CameraIcon } from 'lucide-react-native';
import { Button } from '../components/ui/Button';
import { ScreenProps, LicaoDto } from '../types';
import api from '../services/api';

export default function CameraSimulation({ state, navigateTo, completeModule, addMedal, showToast }: ScreenProps) {
    const [step, setStep] = useState(1);
    const [photos, setPhotos] = useState(0);
    const [videos, setVideos] = useState(0);
    const [frontCamera, setFrontCamera] = useState(false);
    const [mode, setMode] = useState<'photo' | 'video'>('photo');
    const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
    const [grid, setGrid] = useState(false);
    const [timer, setTimer] = useState<'off' | '3s' | '10s'>('off');
    const [recording, setRecording] = useState(false);

    const [simuladorLicaoId, setSimuladorLicaoId] = useState<number | null>(null);
    const [quizLicaoId, setQuizLicaoId] = useState<number | null>(null);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const modulosRes = await api.get('/api/modulos');
                const moduloCam = modulosRes.data.find(
                    (m: any) => m.titulo === 'Câmera e Fotos'
                );

                if (!moduloCam) throw new Error('Módulo "Câmera e Fotos" não encontrado');

                const licoesRes = await api.get(`/api/modulos/${moduloCam.id}/licoes`);
                const licoes: LicaoDto[] = licoesRes.data;

                const simLicao = licoes.find(l => l.tipo === 'SIMULADOR');
                const quizLicao = licoes.find(l => l.tipo === 'QUIZ');

                if (simLicao) setSimuladorLicaoId(simLicao.id);
                if (quizLicao) setQuizLicaoId(quizLicao.id);

            } catch (err) {
                console.error(err);
                Alert.alert("Erro", "Não foi possível carregar os dados desta lição.");
                navigateTo('menu', {});
            }
        };

        fetchLessonData();
    }, []);

    const handleAction = (action: string) => {
        switch (action) {
            case 'capture':
                if (step === 1) {
                    setPhotos(photos + 1);
                    showToast('Foto tirada! 📸', 'success');
                    setStep(2);
                } else if (step === 7 && mode === 'video' && !recording) {
                    setRecording(true);
                    showToast('Gravando vídeo...', 'info');
                    setTimeout(() => {
                        setRecording(false);
                        setVideos(videos + 1);
                        showToast('Vídeo gravado! 🎥', 'success');
                        
                        if (simuladorLicaoId) {
                            completeModule(simuladorLicaoId);
                            addMedal('Fotógrafo Expert', 10);
                        }

                        setTimeout(() => {
                            if (quizLicaoId) {
                                navigateTo('quiz', { licaoId: quizLicaoId, moduleId: 'camera' });
                            } else {
                                showToast("Quiz não encontrado.", "error");
                                navigateTo('camera-menu', {});
                            }
                        }, 1000);

                    }, 3000);
                }
                break;
            case 'flip':
                if (step === 2) {
                    setFrontCamera(!frontCamera);
                    showToast('Câmera alternada!', 'success');
                    setStep(3);
                }
                break;
            case 'mode':
                if (step === 3 && mode === 'photo') {
                    setMode('video');
                    showToast('Modo vídeo ativado!', 'success');
                    setStep(4);
                }
                break;
            case 'flash':
                if (step === 4) {
                    const nextFlash = flash === 'off' ? 'on' : flash === 'on' ? 'auto' : 'off';
                    setFlash(nextFlash);
                    if (nextFlash !== 'off') {
                        showToast(`Flash: ${nextFlash}`, 'success');
                        setStep(5);
                    }
                }
                break;
            case 'grid':
                if (step === 5) {
                    setGrid(!grid);
                    showToast('Grade ativada!', 'success');
                    setStep(6);
                }
                break;
            case 'timer':
                if (step === 6) {
                    const nextTimer = timer === 'off' ? '3s' : timer === '3s' ? '10s' : 'off';
                    setTimer(nextTimer);
                    if (nextTimer !== 'off') {
                        showToast(`Timer: ${nextTimer}`, 'success');
                        setStep(7);
                    }
                }
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={[
                styles.header,
                state.highContrast && styles.headerHighContrast,
            ]}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo('camera-menu', {})}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color={state.highContrast ? '#000' : '#ffffff'} />
                </Button>

                <View style={styles.headerControls}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onPress={() => handleAction('flash')}
                        style={step === 4 ? styles.actionHighlight : undefined}
                    >
                        <Zap size={state.largeText ? 28 : 24} color={state.highContrast ? '#000' : '#ffffff'} />
                        {flash !== 'off' && (
                            <Text style={styles.controlLabel}>{flash}</Text>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onPress={() => handleAction('timer')}
                        style={step === 6 ? styles.actionHighlight : undefined}
                    >
                        <Timer size={state.largeText ? 28 : 24} color={state.highContrast ? '#000' : '#ffffff'} />
                        {timer !== 'off' && (
                            <Text style={styles.controlLabel}>{timer}</Text>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onPress={() => handleAction('grid')}
                        style={step === 5 ? styles.actionHighlight : undefined}
                    >
                        <Grid size={state.largeText ? 28 : 24} color={state.highContrast ? '#000' : '#ffffff'} />
                    </Button>
                </View>
            </View>

            {/* Viewfinder */}
            <View style={[
                styles.viewfinder,
                state.highContrast && styles.viewfinderHighContrast,
            ]}>
                <Text style={styles.cameraEmoji}>
                    {frontCamera ? '🤳' : '📸'}
                </Text>

                {grid && (
                    <View style={styles.gridOverlay}>
                        {[...Array(9)].map((_, i) => (
                            <View key={i} style={styles.gridCell} />
                        ))}
                    </View>
                )}

                {recording && (
                    <View style={styles.recordingIndicator}>
                        <View style={styles.recordingDot} />
                        <Text style={styles.recordingText}>REC</Text>
                    </View>
                )}
            </View>

            {/* Step Indicator */}
            <View style={[
                styles.stepIndicator,
                state.highContrast && styles.stepIndicatorHighContrast,
            ]}>
                <Text style={[
                    styles.stepText,
                    state.largeText && styles.stepTextLarge,
                ]}>
                    Etapa {step}/7: {
                        step === 1 ? '📸 Tire uma foto' :
                            step === 2 ? '🔄 Alterne para câmera frontal' :
                                step === 3 ? '🎥 Mude para modo vídeo' :
                                    step === 4 ? '⚡ Configure o flash' :
                                        step === 5 ? '📐 Ative a grade' :
                                            step === 6 ? '⏱️ Configure o timer' :
                                                '🎬 Grave um vídeo'
                    }
                </Text>
            </View>

            {/* Controls */}
            <View style={[
                styles.controls,
                state.highContrast && styles.controlsHighContrast,
            ]}>
                <Button
                    variant="ghost"
                    onPress={() => showToast(`${photos + videos} itens na galeria`, 'info')}
                    style={styles.galleryButton}
                >
                    <ImageIcon size={state.largeText ? 32 : 28} color={state.highContrast ? '#000' : '#ffffff'} />
                    <Text style={[
                        styles.galleryCount,
                        state.highContrast && styles.galleryCountHighContrast,
                    ]}>
                        {photos + videos}
                    </Text>
                </Button>

                <Button
                    size="icon"
                    onPress={() => handleAction('capture')}
                    style={
                        StyleSheet.flatten([
                            styles.captureButton,
                            (step === 1 || step === 7) && styles.actionHighlight,
                            recording && styles.captureButtonRecording,
                            state.highContrast && !recording && styles.captureButtonHighContrast,
                        ])
                    }
                >
                    {recording ? (
                        <View style={styles.stopIcon} />
                    ) : (
                        <View style={[
                            styles.captureRing,
                            state.highContrast && styles.captureRingHighContrast,
                        ]} />
                    )}
                </Button>

                <Button
                    variant="ghost"
                    onPress={() => handleAction('flip')}
                    style={step === 2 ? styles.actionHighlight : undefined}
                >
                    <RotateCcw size={state.largeText ? 32 : 28} color={state.highContrast ? '#000' : '#ffffff'} />
                </Button>
            </View>

            {/* Mode Selector */}
            <View style={[
                styles.modeSelector,
                state.highContrast && styles.modeSelectorHighContrast,
            ]}>
                <Button
                    variant="ghost"
                    onPress={() => handleAction('mode')}
                    style={
                        Object.assign(
                            {},
                            mode === 'photo' ? styles.modeActive : {},
                            step === 3 && mode === 'photo' ? styles.actionHighlight : {}
                        )
                    }
                >
                    <Text style={[
                        styles.modeText,
                        mode === 'photo' && styles.modeTextActive,
                        state.highContrast && styles.modeTextHighContrast,
                    ]}>
                        Foto
                    </Text>
                </Button>
                <Button variant="ghost">
                    <Text style={[
                        styles.modeText,
                        mode === 'video' && styles.modeTextActive,
                        state.highContrast && styles.modeTextHighContrast,
                    ]}>
                        Vídeo
                    </Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#000000',
    },
    headerHighContrast: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    backButton: {
        padding: 0,
    },
    headerControls: {
        flexDirection: 'row',
        gap: 12,
    },
    controlLabel: {
        fontSize: 10,
        color: '#ffffff',
        marginTop: 2,
    },
    viewfinder: {
        flex: 1,
        backgroundColor: '#1f2937',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    viewfinderHighContrast: {
        backgroundColor: '#e5e7eb',
    },
    cameraEmoji: {
        fontSize: 64,
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridCell: {
        width: '33.333%',
        height: '33.333%',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    recordingIndicator: {
        position: 'absolute',
        top: 16,
        left: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc2626',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 8,
    },
    recordingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ffffff',
    },
    recordingText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepIndicator: {
        backgroundColor: '#fef3c7',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    stepIndicatorHighContrast: {
        backgroundColor: '#ffffff',
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    stepText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
    },
    stepTextLarge: {
        fontSize: 18,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 32,
        backgroundColor: '#000000',
    },
    controlsHighContrast: {
        backgroundColor: '#ffffff',
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    galleryButton: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    galleryCount: {
        fontSize: 12,
        color: '#ffffff',
        marginTop: 4,
    },
    galleryCountHighContrast: {
        color: '#000',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonRecording: {
        backgroundColor: '#dc2626',
    },
    captureButtonHighContrast: {
        backgroundColor: '#000',
        borderWidth: 4,
        borderColor: '#000',
    },
    captureRing: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 4,
        borderColor: '#000000',
    },
    captureRingHighContrast: {
        borderColor: '#ffffff',
    },
    stopIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#ffffff',
        borderRadius: 4,
    },
    modeSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 32,
        paddingVertical: 16,
        backgroundColor: '#000000',
    },
    modeSelectorHighContrast: {
        backgroundColor: '#ffffff',
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    modeActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff',
    },
    modeText: {
        fontSize: 16,
        color: '#9ca3af',
    },
    modeTextActive: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    modeTextHighContrast: {
        color: '#000',
    },
    actionHighlight: {
        backgroundColor: '#acacacff',
    },
});