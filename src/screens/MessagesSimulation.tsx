import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, FlatList, KeyboardAvoidingView,
    Platform, Alert
} from 'react-native';
import { ArrowLeft, Camera, Paperclip, Smile, Mic, Send } from 'lucide-react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ScreenProps, LicaoDto } from '../types';
import api from '../services/api';

interface Message {
    sender: 'me' | 'other';
    text: string;
    time: string;
}

export default function MessagesSimulation({ state, navigateTo, completeModule, addMedal, showToast }: ScreenProps) {
    const [step, setStep] = useState(1);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'other', text: 'Olá! Como você está?', time: '10:30' },
        { sender: 'other', text: 'Vamos praticar usar o WhatsApp!', time: '10:31' },
    ]);
    const [inputText, setInputText] = useState('');
    
    const [simuladorLicaoId, setSimuladorLicaoId] = useState<number | null>(null);
    const [quizLicaoId, setQuizLicaoId] = useState<number | null>(null);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const modulosRes = await api.get('/api/modulos');
                const moduloMsg = modulosRes.data.find(
                    (m: any) => m.titulo === 'Mensagens/WhatsApp'
                );

                if (!moduloMsg) throw new Error('Módulo "Mensagens/WhatsApp" não encontrado');

                const licoesRes = await api.get(`/api/modulos/${moduloMsg.id}/licoes`);
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

    const addMessage = (text: string, sender: 'me' | 'other' = 'me') => {
        setMessages(prev => [...prev, { sender, text, time: '10:32' }]);
        setInputText('');
    };

    const handleAction = (action: string) => {
        switch (action) {
            case 'text':
                if (inputText) {
                    addMessage(inputText);
                    setTimeout(() => {
                        addMessage('Ótimo! Você enviou uma mensagem de texto! 👍', 'other');
                        setStep(2);
                    }, 1000);
                }
                break;
            case 'audio':
                addMessage('🎤 Áudio enviado (0:05)');
                setTimeout(() => {
                    addMessage('Perfeito! Você enviou um áudio! 🎵', 'other');
                    setStep(3);
                }, 1000);
                break;
            case 'photo':
                addMessage('📷 Foto enviada');
                setTimeout(() => {
                    addMessage('Muito bem! Você enviou uma foto! 📸', 'other');
                    setStep(4);
                }, 1000);
                break;
            case 'file':
                addMessage('📎 Arquivo anexado');
                setTimeout(() => {
                    addMessage('Excelente! Você completou todas as etapas! 🎉', 'other');
                    
                    if (simuladorLicaoId) {
                        completeModule(simuladorLicaoId);
                        addMedal('Mestre das Mensagens', 10);
                    }

                    setTimeout(() => {
                        if (quizLicaoId) {
                            navigateTo('quiz', { licaoId: quizLicaoId, moduleId: 'messages' });
                        } else {
                            showToast("Quiz não encontrado.", "error");
                            navigateTo('messages-menu', {});
                        }
                    }, 2000);

                }, 1000);
                break;
        }
    };


    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'me' ? styles.messageRight : styles.messageLeft,
        ]}>
            <View style={[
                styles.messageBubble,
                item.sender === 'me'
                    ? (state.highContrast ? styles.bubbleMeHighContrast : styles.bubbleMe)
                    : (state.highContrast ? styles.bubbleOtherHighContrast : styles.bubbleOther),
            ]}>
                <Text style={[
                    styles.messageText,
                    state.largeText && styles.messageTextLarge,
                    item.sender === 'me' && styles.messageTextMe,
                ]}>
                    {item.text}
                </Text>
                <Text style={[
                    styles.messageTime,
                    state.largeText && styles.messageTimeLarge,
                    item.sender === 'me' && styles.messageTimeMe,
                ]}>
                    {item.time}
                </Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            {/* Header */}
            <View style={[
                styles.header,
                state.highContrast && styles.headerHighContrast,
            ]}>
                <View style={styles.headerContent}>
                    <Button
                        variant="ghost"
                        onPress={() => navigateTo('messages-menu', {})}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={24} color={state.highContrast ? '#000' : '#ffffff'} />
                    </Button>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarEmoji}>👤</Text>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={[
                            styles.headerName,
                            state.largeText && styles.headerNameLarge,
                            state.highContrast && styles.headerTextHighContrast,
                        ]}>
                            Maria Silva
                        </Text>
                        <Text style={[
                            styles.headerStatus,
                            state.largeText && styles.headerStatusLarge,
                            state.highContrast && styles.headerTextHighContrast,
                        ]}>
                            online
                        </Text>
                    </View>
                </View>
            </View>

            {/* Messages Area */}
            <View style={[
                styles.messagesArea,
                state.highContrast && styles.messagesAreaHighContrast,
            ]}>
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.messagesList}
                />
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
                    Etapa {step}/4: {
                        step === 1 ? '📝 Envie uma mensagem de texto' :
                            step === 2 ? '🎤 Envie um áudio' :
                                step === 3 ? '📷 Envie uma foto' :
                                    '📎 Anexe um arquivo'
                    }
                </Text>
            </View>

            {/* Input Area */}
            <View style={[
                styles.inputArea,
                state.highContrast && styles.inputAreaHighContrast,
            ]}>
                <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => step === 4 && handleAction('file')}
                    style={step === 4 ? styles.actionHighlight : undefined}
                >
                    <Paperclip size={state.largeText ? 28 : 24} color="#6b7280" />
                </Button>

                <Button variant="ghost" size="icon">
                    <Smile size={state.largeText ? 28 : 24} color="#6b7280" />
                </Button>

                <Input
                    placeholder="Digite uma mensagem"
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.input}
                    large={state.largeText}
                />

                <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => step === 3 && handleAction('photo')}
                    style={step === 3 ? styles.actionHighlight : undefined}
                >
                    <Camera size={state.largeText ? 28 : 24} color="#6b7280" />
                </Button>

                {inputText && step === 1 ? (
                    <Button
                        size="icon"
                        onPress={() => handleAction('text')}
                        style={{ ...styles.sendButton, ...styles.actionHighlight }}
                    >
                        <Send size={state.largeText ? 28 : 24} color="#ffffff" />
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        onPress={() => step === 2 && handleAction('audio')}
                        style={step === 2 ? styles.actionHighlight : undefined}
                    >
                        <Mic size={state.largeText ? 28 : 24} color="#6b7280" />
                    </Button>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#25d366',
        paddingTop: 48,
        paddingBottom: 12,
        paddingHorizontal: 16,
    },
    headerHighContrast: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backButton: {
        padding: 0,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#d1d5db',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: 24,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
    },
    headerNameLarge: {
        fontSize: 20,
    },
    headerStatus: {
        fontSize: 14,
        color: '#e0f2e9',
    },
    headerStatusLarge: {
        fontSize: 16,
    },
    headerTextHighContrast: {
        color: '#000',
    },
    messagesArea: {
        flex: 1,
        backgroundColor: '#ece5dd',
    },
    messagesAreaHighContrast: {
        backgroundColor: '#ffffff',
    },
    messagesList: {
        padding: 16,
    },
    messageContainer: {
        marginBottom: 12,
    },
    messageLeft: {
        alignItems: 'flex-start',
    },
    messageRight: {
        alignItems: 'flex-end',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 8,
    },
    bubbleOther: {
        backgroundColor: '#ffffff',
    },
    bubbleOtherHighContrast: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#000',
    },
    bubbleMe: {
        backgroundColor: '#dcf8c6',
    },
    bubbleMeHighContrast: {
        backgroundColor: '#000',
    },
    messageText: {
        fontSize: 16,
        color: '#111827',
        marginBottom: 4,
    },
    messageTextLarge: {
        fontSize: 18,
    },
    messageTextMe: {
        color: '#000',
    },
    messageTime: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'right',
    },
    messageTimeLarge: {
        fontSize: 14,
    },
    messageTimeMe: {
        color: '#4b5563',
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
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f3f4f6',
        gap: 8,
    },
    inputAreaHighContrast: {
        backgroundColor: '#ffffff',
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    input: {
        flex: 1,
    },
    sendButton: {
        backgroundColor: '#25d366',
    },
    actionHighlight: {
        backgroundColor: '#fef3c7',
    },
});