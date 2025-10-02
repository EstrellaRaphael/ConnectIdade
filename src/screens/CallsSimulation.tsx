import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Phone } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ScreenProps } from '../types';

export default function CallsSimulation({ state, navigateTo, completeModule, addMedal, showToast }: ScreenProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [calling, setCalling] = useState(false);
    const [inCall, setInCall] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);

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
        setShowQuiz(true);
        completeModule('calls');
    };

    const handleQuizAnswer = (correct: boolean) => {
        if (correct) {
            showToast('Resposta correta! 🎉', 'success');
            addMedal('Primeira Chamada', 10);
            setTimeout(() => navigateTo('calls-menu'), 2000);
        } else {
            showToast('Resposta incorreta. Tente novamente!', 'error');
        }
    };

    // Call Screen
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

    // Quiz Screen
    if (showQuiz) {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                        <CardHeader>
                            <CardTitle>
                                <Text style={state.largeText && styles.cardTitleLarge}>
                                    Quiz de Chamadas
                                </Text>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Text style={[
                                styles.question,
                                state.largeText && styles.questionLarge,
                            ]}>
                                Qual a função do botão vermelho durante uma chamada?
                            </Text>

                            <View style={styles.options}>
                                <Button
                                    variant="outline"
                                    onPress={() => handleQuizAnswer(false)}
                                    style={styles.option}
                                >
                                    <Text style={styles.optionText}>A) Aumentar o volume</Text>
                                </Button>
                                <Button
                                    variant="outline"
                                    onPress={() => handleQuizAnswer(true)}
                                    style={styles.option}
                                >
                                    <Text style={styles.optionText}>B) Encerrar a ligação</Text>
                                </Button>
                                <Button
                                    variant="outline"
                                    onPress={() => handleQuizAnswer(false)}
                                    style={styles.option}
                                >
                                    <Text style={styles.optionText}>C) Colocar em espera</Text>
                                </Button>
                                <Button
                                    variant="outline"
                                    onPress={() => handleQuizAnswer(false)}
                                    style={styles.option}
                                >
                                    <Text style={styles.optionText}>D) Ativar viva-voz</Text>
                                </Button>
                            </View>
                        </CardContent>
                    </Card>
                </ScrollView>
            </View>
        );
    }

    // Main Simulation Screen
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
    // Call Screen Styles
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
    // Quiz Styles
    question: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 24,
    },
    questionLarge: {
        fontSize: 20,
    },
    options: {
        gap: 12,
    },
    option: {
        paddingVertical: 16,
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'left',
    },
});