import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Check, X } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { ScreenProps } from '../types';

interface Question {
    message: string;
    suspicious: boolean;
    explanation: string;
}

const QUESTIONS: Question[] = [
    {
        message: "🎉 PARABÉNS! Você ganhou R$ 10.000 em um sorteio! Para receber, envie seus dados bancários e CPF para este número.",
        suspicious: true,
        explanation: "Golpe do Prêmio Falso: Nunca envie dados bancários ou pessoais por mensagens. Empresas legítimas não pedem essas informações assim.",
    },
    {
        message: "Oi mãe, meu celular caiu e quebrou. Estou usando o número de um amigo. Preciso de dinheiro urgente, pode fazer um PIX?",
        suspicious: true,
        explanation: "Golpe do Falso Parente: Sempre confirme a identidade ligando para o número conhecido. Golpistas se passam por familiares.",
    },
    {
        message: "Olá, aqui é da Clínica São José. Confirmamos sua consulta para amanhã às 14h com Dr. Paulo. Até lá!",
        suspicious: false,
        explanation: "Mensagem legítima: Confirmação de consulta médica de uma clínica conhecida, sem pedidos de dinheiro ou dados.",
    },
    {
        message: "URGENTE! Seu banco detectou atividade suspeita. Sua conta será bloqueada em 24h. Clique neste link para regularizar: bit.ly/banco123",
        suspicious: true,
        explanation: "Phishing Bancário: Bancos nunca pedem para clicar em links ou fornecer dados por mensagem. Sempre entre em contato direto.",
    },
    {
        message: "Bom dia! Este é um lembrete automático: você tem consulta na próxima terça-feira. Para reagendar, ligue (11) 3333-4444.",
        suspicious: false,
        explanation: "Mensagem legítima: Lembrete médico profissional com telefone para contato, sem pedidos suspeitos.",
    },
];

export default function SecurityGame({ state, navigateTo, completeModule, addMedal, showToast }: ScreenProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const question = QUESTIONS[currentQuestion];

    const handleAnswer = (isSuspicious: boolean) => {
        const correct = isSuspicious === question.suspicious;
        if (correct) {
            setScore(score + 1);
            showToast('Correto! +1 ponto', 'success');
        } else {
            showToast('Incorreto!', 'error');
        }
        setAnswered(true);
    };

    const nextQuestion = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswered(false);
        } else {
            setShowResult(true);
            completeModule('security');
            if (score >= 3) {
                addMedal('Guardião Digital', 10 + score);
            }
        }
    };

    const resetGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setAnswered(false);
        setShowResult(false);
    };

    if (showResult) {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                        <CardHeader>
                            <CardTitle style={[
                                styles.resultTitle,
                                state.largeText && styles.resultTitleLarge,
                            ]}>
                                Resultado Final
                            </CardTitle>
                        </CardHeader>
                        <CardContent style={styles.resultContent}>
                            <Text style={styles.resultEmoji}>
                                {score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}
                            </Text>

                            <Text style={[
                                styles.scoreText,
                                state.largeText && styles.scoreTextLarge,
                            ]}>
                                {score}/5 pontos
                            </Text>

                            <Text style={[
                                styles.resultMessage,
                                state.largeText && styles.resultMessageLarge,
                            ]}>
                                {score >= 4 ? 'Excelente! Você é um expert em segurança!' :
                                    score >= 3 ? 'Muito bem! Você está protegido!' :
                                        'Continue praticando para melhorar!'}
                            </Text>

                            <View style={styles.resultButtons}>
                                <Button
                                    onPress={resetGame}
                                    style={[
                                        styles.resultButton,
                                        state.highContrast && styles.resultButtonHighContrast,
                                    ]}
                                >
                                    <Text style={styles.resultButtonText}>Tentar Novamente</Text>
                                </Button>
                                <Button
                                    variant="outline"
                                    onPress={() => navigateTo('security-menu')}
                                    style={styles.resultButton}
                                >
                                    <Text style={styles.resultButtonTextOutline}>Voltar ao Menu</Text>
                                </Button>
                            </View>
                        </CardContent>
                    </Card>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo('security-menu')}
                    style={styles.backButton}
                >
                    <View style={styles.backButtonContent}>
                        <ArrowLeft size={24} color="#374151" />
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </View>
                </Button>

                <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                    <CardHeader>
                        <View style={styles.headerRow}>
                            <CardTitle style={state.largeText && styles.cardTitleLarge}>
                                Jogo de Segurança
                            </CardTitle>
                            <Text style={[
                                styles.questionCounter,
                                state.largeText && styles.questionCounterLarge,
                            ]}>
                                {currentQuestion + 1}/5
                            </Text>
                        </View>
                        <Progress value={(currentQuestion / 5) * 100} style={styles.progress} />
                    </CardHeader>
                    <CardContent>
                        <Card style={[
                            styles.messageCard,
                            state.highContrast ? styles.messageCardHighContrast : styles.messageCardDefault,
                        ]}>
                            <CardContent style={styles.messageContent}>
                                <Text style={[
                                    styles.messageLabel,
                                    state.largeText && styles.messageLabelLarge,
                                ]}>
                                    Você recebeu esta mensagem:
                                </Text>
                                <Text style={[
                                    styles.messageText,
                                    state.largeText && styles.messageTextLarge,
                                ]}>
                                    "{question.message}"
                                </Text>
                            </CardContent>
                        </Card>

                        <Text style={[
                            styles.questionText,
                            state.largeText && styles.questionTextLarge,
                        ]}>
                            Esta mensagem é suspeita?
                        </Text>

                        {!answered ? (
                            <View style={styles.answerButtons}>
                                <Button
                                    onPress={() => handleAnswer(true)}
                                    style={[
                                        styles.answerButton,
                                        styles.suspiciousButton,
                                    ]}
                                >
                                    <View style={styles.answerButtonContent}>
                                        <X size={24} color="#ffffff" />
                                        <Text style={[
                                            styles.answerButtonText,
                                            state.largeText && styles.answerButtonTextLarge,
                                        ]}>
                                            É Suspeita
                                        </Text>
                                    </View>
                                </Button>
                                <Button
                                    onPress={() => handleAnswer(false)}
                                    style={[
                                        styles.answerButton,
                                        styles.safeButton,
                                    ]}
                                >
                                    <View style={styles.answerButtonContent}>
                                        <Check size={24} color="#ffffff" />
                                        <Text style={[
                                            styles.answerButtonText,
                                            state.largeText && styles.answerButtonTextLarge,
                                        ]}>
                                            Não é Suspeita
                                        </Text>
                                    </View>
                                </Button>
                            </View>
                        ) : (
                            <>
                                <Card style={[
                                    styles.explanationCard,
                                    state.highContrast && styles.cardHighContrast,
                                ]}>
                                    <CardContent style={styles.explanationContent}>
                                        <Text style={[
                                            styles.explanationTitle,
                                            state.largeText && styles.explanationTitleLarge,
                                        ]}>
                                            Explicação:
                                        </Text>
                                        <Text style={[
                                            styles.explanationText,
                                            state.largeText && styles.explanationTextLarge,
                                        ]}>
                                            {question.explanation}
                                        </Text>
                                    </CardContent>
                                </Card>

                                <Button
                                    onPress={nextQuestion}
                                    style={[
                                        styles.nextButton,
                                        state.highContrast && styles.nextButtonHighContrast,
                                    ]}
                                >
                                    <Text style={[
                                        styles.nextButtonText,
                                        state.largeText && styles.nextButtonTextLarge,
                                    ]}>
                                        {currentQuestion < QUESTIONS.length - 1 ? 'Próxima Mensagem' : 'Ver Resultado'}
                                    </Text>
                                </Button>
                            </>
                        )}

                        <Text style={[
                            styles.scoreDisplay,
                            state.largeText && styles.scoreDisplayLarge,
                        ]}>
                            Pontuação: {score} pontos
                        </Text>
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    questionCounter: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    questionCounterLarge: {
        fontSize: 20,
    },
    progress: {
        marginTop: 8,
    },
    messageCard: {
        marginBottom: 24,
    },
    messageCardDefault: {
        backgroundColor: '#fef3c7',
    },
    messageCardHighContrast: {
        borderWidth: 2,
        borderColor: '#000',
    },
    messageContent: {
        padding: 16,
    },
    messageLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    messageLabelLarge: {
        fontSize: 18,
    },
    messageText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
    messageTextLarge: {
        fontSize: 18,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 24,
        textAlign: 'center',
    },
    questionTextLarge: {
        fontSize: 20,
    },
    answerButtons: {
        gap: 12,
        marginBottom: 24,
    },
    answerButton: {
        paddingVertical: 16,
    },
    suspiciousButton: {
        backgroundColor: '#dc2626',
    },
    safeButton: {
        backgroundColor: '#16a34a',
    },
    answerButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    answerButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    answerButtonTextLarge: {
        fontSize: 20,
    },
    explanationCard: {
        backgroundColor: '#dbeafe',
        marginBottom: 24,
    },
    explanationContent: {
        padding: 16,
    },
    explanationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    explanationTitleLarge: {
        fontSize: 18,
    },
    explanationText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
    explanationTextLarge: {
        fontSize: 18,
    },
    nextButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 16,
        marginBottom: 24,
    },
    nextButtonHighContrast: {
        backgroundColor: '#000',
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButtonTextLarge: {
        fontSize: 20,
    },
    scoreDisplay: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
    },
    scoreDisplayLarge: {
        fontSize: 20,
    },
    // Result Screen Styles
    resultTitle: {
        textAlign: 'center',
    },
    resultTitleLarge: {
        fontSize: 28,
    },
    resultContent: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    resultEmoji: {
        fontSize: 64,
        marginBottom: 24,
    },
    scoreText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    scoreTextLarge: {
        fontSize: 32,
    },
    resultMessage: {
        fontSize: 18,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    resultMessageLarge: {
        fontSize: 20,
    },
    resultButtons: {
        width: '100%',
        gap: 12,
    },
    resultButton: {
        paddingVertical: 16,
    },
    resultButtonHighContrast: {
        backgroundColor: '#000',
    },
    resultButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultButtonTextOutline: {
        color: '#374151',
        fontSize: 18,
        fontWeight: '600',
    },
});