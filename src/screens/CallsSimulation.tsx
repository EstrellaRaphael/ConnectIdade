import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { ArrowLeft, Phone } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ScreenProps, LicaoDto } from '../types';
import api from '../services/api';

export default function CallsSimulation({ state, navigateTo, completeModule, addMedal, showToast }: ScreenProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [calling, setCalling] = useState(false);
    const [inCall, setInCall] = useState(false);

    const [simuladorLicaoId, setSimuladorLicaoId] = useState<number | null>(null);
    const [quizLicaoId, setQuizLicaoId] = useState<number | null>(null);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const modulosRes = await api.get('/api/modulos');
                const moduloChamadas = modulosRes.data.find(
                    (m: any) => m.titulo === 'Chamadas'
                );

                if (!moduloChamadas) throw new Error('Módulo "Chamadas" não encontrado');

                const licoesRes = await api.get(`/api/modulos/${moduloChamadas.id}/licoes`);
                const licoes: LicaoDto[] = licoesRes.data;

                const simLicao = licoes.find(l => l.tipo === 'SIMULADOR');
                const quizLicao = licoes.find(l => l.tipo === 'QUIZ');

                if (simLicao) setSimuladorLicaoId(simLicao.id);
                if (quizLicao) setQuizLicaoId(quizLicao.id);

            } catch (err) {
                console.error(err);
                Alert.alert("Erro", "Não foi possível carregar os dados desta lição.");
                navigateTo('menu');
            }
        };

        fetchLessonData();
    }, []);


    const makeCall = () => {
        if (!phoneNumber) {
            showToast('Digite um número de telefone', 'error');
            return;
        }
        setCalling(true);
        setTimeout(() => {
            setCalling(false);
            setInCall(true);
            showToast('Chamada iniciada!', 'success');
        }, 3000);
    };

    const endCall = () => {
        setInCall(false);
        
        if (simuladorLicaoId) {
            completeModule(simuladorLicaoId);
            addMedal('Primeira Chamada', 10);
        }
        
        if (quizLicaoId) {
            navigateTo('quiz', { licaoId: quizLicaoId });
        } else {
            showToast("Quiz não encontrado para este módulo.", "error");
            navigateTo('calls-menu'); // Volta ao menu do módulo
        }
    };

    if (calling || inCall) {
        return (
            <View style={[
                styles.callContainer,
                state.highContrast && styles.callContainerHighContrast,
            ]}>
                <View style={[
                    styles.callCard,
                    state.highContrast && styles.callCardHighContrast,
                ]}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarEmoji}>👤</Text>
                    </View>

                    <Text style={[
                        styles.phoneNumber,
                        state.largeText && styles.phoneNumberLarge,
                    ]}>
                        {phoneNumber}
                    </Text>

                    <Text style={[
                        styles.callStatus,
                        state.largeText && styles.callStatusLarge,
                    ]}>
                        {calling ? 'Ligando...' : 'Em chamada'}
                    </Text>

                    {inCall && (
                        <Button
                            onPress={endCall}
                            style={
                                state.highContrast
                                    ? { ...styles.endCallButton, ...styles.endCallButtonHighContrast }
                                    : styles.endCallButton
                            }
                        >
                            <View style={styles.endCallContent}>
                                <Phone size={24} color="#ffffff" />
                                <Text style={[
                                    styles.endCallText,
                                    state.largeText && styles.endCallTextLarge,
                                ]}>
                                    Encerrar Chamada
                                </Text>
                            </View>
                        </Button>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo('calls-menu')}
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
                                Simulador de Chamadas
                            </Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Text style={[
                            styles.label,
                            state.largeText && styles.labelLarge,
                        ]}>
                            Digite um número de telefone:
                        </Text>

                        <Input
                            placeholder="(00) 00000-0000"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            large={state.largeText}
                            style={[
                                styles.input,
                                state.highContrast && styles.inputHighContrast,
                            ]}
                        />

                        <Button
                            onPress={makeCall}
                            style={
                                state.highContrast
                                    ? { ...styles.callButton, ...styles.callButtonHighContrast }
                                    : styles.callButton
                            }
                        >
                            <View style={styles.callButtonContent}>
                                <Phone size={24} color="#ffffff" />
                                <Text style={[
                                    styles.callButtonText,
                                    state.largeText && styles.callButtonTextLarge,
                                ]}>
                                    Ligar
                                </Text>
                            </View>
                        </Button>

                        <Card style={[
                            styles.tipCard,
                            state.highContrast && styles.cardHighContrast,
                        ]}>
                            <CardContent style={styles.tipContent}>
                                <Text style={[
                                    styles.tipText,
                                    state.largeText && styles.tipTextLarge,
                                ]}>
                                    💡 Pratique fazer uma chamada digitando qualquer número e clicando em "Ligar"
                                </Text>
                            </CardContent>
                        </Card>
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
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    labelLarge: {
        fontSize: 20,
    },
    input: {
        marginBottom: 24,
    },
    inputHighContrast: {
        borderColor: '#000',
    },
    callButton: {
        backgroundColor: '#16a34a',
        paddingVertical: 16,
        marginBottom: 24,
    },
    callButtonHighContrast: {
        backgroundColor: '#000',
    },
    callButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    callButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    callButtonTextLarge: {
        fontSize: 20,
    },
    tipCard: {
        backgroundColor: '#dbeafe',
    },
    tipContent: {
        padding: 16,
    },
    tipText: {
        fontSize: 16,
        color: '#1e40af',
    },
    tipTextLarge: {
        fontSize: 18,
    },
    callContainer: {
        flex: 1,
        backgroundColor: '#dbeafe',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    callContainerHighContrast: {
        backgroundColor: '#ffffff',
    },
    callCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 32,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    callCardHighContrast: {
        borderWidth: 2,
        borderColor: '#000',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarEmoji: {
        fontSize: 48,
    },
    phoneNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    phoneNumberLarge: {
        fontSize: 32,
    },
    callStatus: {
        fontSize: 18,
        color: '#6b7280',
        marginBottom: 32,
    },
    callStatusLarge: {
        fontSize: 20,
    },
    endCallButton: {
        backgroundColor: '#dc2626',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 999,
        width: '100%',
    },
    endCallButtonHighContrast: {
        backgroundColor: '#000',
    },
    endCallContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    endCallText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    endCallTextLarge: {
        fontSize: 20,
    },
});