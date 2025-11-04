import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Award } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { ScreenProps } from '../types';

const TOTAL_MODULOS = 4;

export default function ProgressScreen({ state, navigateTo }: ScreenProps) {

    const progresso = state.progresso;
    const usuario = state.usuario;

    if (!progresso || !usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.noMedals}>Carregando progresso...</Text>
            </View>
        );
    }

    const completedCount = progresso.medalhas.length; 
    const percentage = (completedCount / TOTAL_MODULOS) * 100;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Button
                    variant="ghost"
                    onPress={() => navigateTo('menu')}
                    style={styles.backButton}
                >
                    <View style={styles.backButtonContent}>
                        <ArrowLeft size={24} color="#374151" />
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </View>
                </Button>

                <Text style={[
                    styles.title,
                    state.largeText && styles.titleLarge,
                ]}>
                    Meu Progresso
                </Text>

                <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                    <CardContent style={styles.modulesCard}>
                        <Text style={[
                            styles.bigNumber,
                            state.largeText && styles.bigNumberLarge,
                            state.highContrast && styles.textHighContrast,
                        ]}>
                            {completedCount}/{TOTAL_MODULOS}
                        </Text>
                        <Text style={[
                            styles.label,
                            state.largeText && styles.labelLarge,
                        ]}>
                            Módulos Principais Concluídos
                        </Text>
                        <Progress value={percentage} style={styles.progress} />
                        <Text style={[
                            styles.percentage,
                            state.largeText && styles.percentageLarge,
                        ]}>
                            {percentage.toFixed(0)}% concluído
                        </Text>
                    </CardContent>
                </Card>

                <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                    <CardHeader>
                        <CardTitle>
                            <Text style={state.largeText && styles.cardTitleLargeText}>
                                Pontuação Total
                            </Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent style={styles.scoreCard}>
                        <Text style={[
                            styles.score,
                            state.largeText && styles.scoreLarge,
                            state.highContrast && styles.textHighContrast,
                        ]}>
                            {progresso.pontuacaoTotal} pontos
                        </Text>
                    </CardContent>
                </Card>

                <Card style={[styles.card, state.highContrast && styles.cardHighContrast]}>
                    <CardHeader>
                        <CardTitle>
                            <Text style={state.largeText ? styles.cardTitleLargeText : undefined}>
                                Medalhas Conquistadas
                            </Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {progresso.medalhas.length === 0 ? (
                            <Text style={[
                                styles.noMedals,
                                state.largeText && styles.noMedalsLarge,
                            ]}>
                                Nenhuma medalha conquistada ainda. Complete os módulos para ganhar medalhas!
                            </Text>
                        ) : (
                            <View style={styles.medalsContainer}>
                                {progresso.medalhas.map((usuarioMedalha) => (
                                    <View
                                        key={usuarioMedalha.id}
                                        style={[
                                            styles.medalItem,
                                            state.highContrast ? styles.medalItemHighContrast : styles.medalItemDefault,
                                        ]}
                                    >
                                        <Award
                                            size={state.largeText ? 40 : 32}
                                            color={state.highContrast ? '#000' : '#eab308'}
                                        />
                                        <Text style={[
                                            styles.medalName,
                                            state.largeText && styles.medalNameLarge,
                                        ]}>
                                            {usuarioMedalha.medalha.nome}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </CardContent>
                </Card>

                <Button
                    onPress={() => navigateTo('menu')}
                    style={Object.assign(
                        {},
                        styles.continueButton,
                        state.highContrast ? styles.buttonHighContrast : {}
                    )}
                >
                    <Text style={[
                        styles.continueButtonText,
                        state.largeText && styles.continueButtonTextLarge,
                    ]}>
                        Continuar Aprendendo
                    </Text>
                </Button>

                <View style={{ height: 40 }} />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 24,
        textAlign: 'center',
    },
    titleLarge: {
        fontSize: 32,
    },
    card: {
        marginBottom: 24,
    },
    cardHighContrast: {
        borderWidth: 2,
    },
    cardTitleLargeText: {
        fontSize: 24,
    },
    modulesCard: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    bigNumber: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#2563eb',
        marginBottom: 8,
    },
    bigNumberLarge: {
        fontSize: 72,
    },
    textHighContrast: {
        color: '#000',
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
    },
    labelLarge: {
        fontSize: 24,
    },
    progress: {
        marginBottom: 8,
    },
    percentage: {
        fontSize: 14,
        color: '#6b7280',
    },
    percentageLarge: {
        fontSize: 18,
    },
    scoreCard: {
        alignItems: 'center',
    },
    score: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    scoreLarge: {
        fontSize: 48,
    },
    noMedals: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
    noMedalsLarge: {
        fontSize: 18,
    },
    medalsContainer: {
        gap: 12,
    },
    medalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 12,
    },
    medalItemDefault: {
        backgroundColor: '#fef3c7',
    },
    medalItemHighContrast: {
        borderWidth: 2,
        borderColor: '#000',
    },
    medalName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    medalNameLarge: {
        fontSize: 20,
    },
    continueButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 16,
    },
    buttonHighContrast: {
        backgroundColor: '#000',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    continueButtonTextLarge: {
        fontSize: 20,
    },
});