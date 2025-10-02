import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScreenProps } from '../types';
import { QUIZ_DATA } from '../config/modules';

interface QuizScreenProps extends ScreenProps {
    moduleId: string;
}

export default function QuizScreen({ state, navigateTo, moduleId, addPoints, showToast }: QuizScreenProps) {
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const quiz = QUIZ_DATA[moduleId];
    if (!quiz) return null;

    const handleAnswer = (index: number) => {
        setSelectedAnswer(index);
        setAnswered(true);

        if (index === quiz.correctAnswer) {
            showToast('Resposta correta! 🎉 +5 pontos', 'success');
            addPoints(5);
        } else {
            showToast('Resposta incorreta!', 'error');
        }
    };

    const getButtonStyle = (index: number) => {
        if (!answered) return styles.optionButton;
        if (index === quiz.correctAnswer) return styles.optionButtonCorrect;
        if (index === selectedAnswer) return styles.optionButtonWrong;
        return styles.optionButton;
    };

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
                                Quiz
                            </Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Text style={[
                            styles.question,
                            state.largeText && styles.questionLarge,
                        ]}>
                            {quiz.question}
                        </Text>

                        <View style={styles.options}>
                            {quiz.options.map((option: string, index: number) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    onPress={() => !answered && handleAnswer(index)}
                                    disabled={answered}
                                    style={{
                                        ...getButtonStyle(index),
                                        ...(state.highContrast ? styles.optionButtonHighContrast : {}),
                                    }}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        state.largeText && styles.optionTextLarge,
                                    ]}>
                                        {option}
                                    </Text>
                                </Button>
                            ))}
                        </View>

                        {answered && (
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
                                            {quiz.explanation}
                                        </Text>
                                    </CardContent>
                                </Card>

                                <View style={styles.buttonsRow}>
                                    <Button
                                        variant="outline"
                                        onPress={() => {
                                            setAnswered(false);
                                            setSelectedAnswer(null);
                                        }}
                                        style={styles.actionButton}
                                    >
                                        <Text style={styles.actionButtonText}>Tentar Novamente</Text>
                                    </Button>
                                    <Button
                                        onPress={() => navigateTo(`${moduleId}-menu`)}
                                        style={{
                                            ...styles.actionButton,
                                            ...(state.highContrast ? styles.actionButtonHighContrast : {}),
                                        }}
                                    >
                                        <Text style={styles.actionButtonTextWhite}>Voltar ao Menu</Text>
                                    </Button>
                                </View>
                            </>
                        )}
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
        marginBottom: 24,
    },
    optionButton: {
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: '#d1d5db',
    },
    optionButtonCorrect: {
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: '#16a34a',
        backgroundColor: '#dcfce7',
    },
    optionButtonWrong: {
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: '#dc2626',
        backgroundColor: '#fee2e2',
    },
    optionButtonHighContrast: {
        borderColor: '#000',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'left',
    },
    optionTextLarge: {
        fontSize: 18,
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
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
    },
    actionButtonHighContrast: {
        backgroundColor: '#000',
    },
    actionButtonText: {
        fontSize: 16,
        color: '#374151',
    },
    actionButtonTextWhite: {
        fontSize: 16,
        color: '#ffffff',
    },
});