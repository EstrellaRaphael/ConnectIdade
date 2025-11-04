import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScreenProps, QuizDto, PerguntaDto, ResultadoQuizResponseDto } from '../types';
import api from '../services/api'; 

interface QuizScreenProps extends ScreenProps {
    licaoId: number;
    moduleId: string;
}

export default function QuizScreen({ 
    state, 
    navigateTo, 
    licaoId,
    moduleId, 
    completeModule, 
    showToast 
}: QuizScreenProps) {
    
    const [quiz, setQuiz] = useState<QuizDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [resultado, setResultado] = useState<ResultadoQuizResponseDto | null>(null);
    
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!licaoId) {
                Alert.alert("Erro", "ID da lição do quiz não encontrado.");
                return;
            }
            
            setIsLoading(true);
            setResultado(null);
            setSelectedOptionIndex(null);

            try {
                const response = await api.get<QuizDto>(`/api/quiz/licao/${licaoId}`);
                setQuiz(response.data);
            } catch (err) {
                console.error(err);
                Alert.alert("Erro", "Não foi possível carregar o quiz.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuiz();
    }, [licaoId]);

    const handleAnswer = async (perguntaId: number, opcaoId: number, optionIndex: number) => {
        if (!state.usuario) {
            showToast("Você não está logado.", "error");
            return;
        }

        setSelectedOptionIndex(optionIndex);

        try {
            const response = await api.post<ResultadoQuizResponseDto>(
                `/api/quiz/submeter/usuario/${state.usuario.id}`, 
                {
                    perguntaId: perguntaId,
                    opcaoEscolhidaId: opcaoId,
                }
            );

            const resultadoResposta = response.data;
            setResultado(resultadoResposta);

            if (resultadoResposta.isCorreta) {
                showToast('Resposta correta! 🎉 Pontos ganhos!', 'success');
                completeModule(licaoId); 
            } else {
                showToast('Resposta incorreta!', 'error');
            }

        } catch (err) {
            console.error(err);
            showToast('Erro ao submeter resposta.', 'error');
        }
    };

    const getButtonStyle = (index: number, pergunta: PerguntaDto) => {
        if (!resultado) return styles.optionButton;
        
        if (resultado.isCorreta && index === selectedOptionIndex) {
            return styles.optionButtonCorrect;
        }
        
        if (!resultado.isCorreta && index === selectedOptionIndex) {
            return styles.optionButtonWrong;
        }
        
        return styles.optionButton;
    };

    if (isLoading || !quiz || !quiz.perguntas || quiz.perguntas.length === 0) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 50 }} />
            </View>
        );
    }

    const perguntaAtual = quiz.perguntas[0];
    const isAnswered = !!resultado; 

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
                            {perguntaAtual.texto}
                        </Text>

                        <View style={styles.options}>
                            {perguntaAtual.opcoes.map((option, index) => (
                                <Button
                                    key={option.id}
                                    variant="outline"
                                    onPress={() => !isAnswered && handleAnswer(perguntaAtual.id, option.id, index)}
                                    disabled={isAnswered}
                                    style={{
                                        ...getButtonStyle(index, perguntaAtual),
                                        ...(state.highContrast ? styles.optionButtonHighContrast : {}),
                                    }}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        state.largeText && styles.optionTextLarge,
                                    ]}>
                                        {option.texto}
                                    </Text>
                                </Button>
                            ))}
                        </View>

                        {isAnswered && (
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
                                            {resultado.explicacaoResposta}
                                        </Text>
                                    </CardContent>
                                </Card>

                                <View style={styles.buttonsRow}>
                                    <Button
                                        variant="outline"
                                        onPress={() => {
                                            setResultado(null);
                                            setSelectedOptionIndex(null);
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