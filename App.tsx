import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AppState } from './src/types';
import { Toast } from './src/components/ui/Toast';

// Import screens
import MainMenu from './src/screens/MainMenu';
import SettingsScreen from './src/screens/SettingsScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ModuleMenu from './src/screens/ModuleMenu';
import MessagesSimulation from './src/screens/MessagesSimulation';
import SecurityGame from './src/screens/SecurityGame';
import CameraSimulation from './src/screens/CameraSimulation';
import VideoExplanation from './src/screens/VideoExplanation';
import QuizScreen from './src/screens/QuizScreen';
import SplashScreen from './src/screens/SplashScreen';
import CallsSimulation from './src/screens/CallsSimulation';

export default function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'splash',
    userProgress: {
      completedModules: [],
      medals: [],
      currentScore: 0,
    },
    highContrast: false,
    largeText: false,
    audioEnabled: false,
    toastMessage: '',
    toastType: '',
  });

  const navigateTo = (screen: string) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const completeModule = (moduleId: string) => {
    setState(prev => ({
      ...prev,
      userProgress: {
        ...prev.userProgress,
        completedModules: [...new Set([...prev.userProgress.completedModules, moduleId])],
      },
    }));
  };

  const addMedal = (medalName: string, points: number = 10) => {
    setState(prev => ({
      ...prev,
      userProgress: {
        ...prev.userProgress,
        medals: [...new Set([...prev.userProgress.medals, medalName])],
        currentScore: prev.userProgress.currentScore + points,
      },
    }));
    showToast(`🏆 Medalha conquistada: ${medalName}! +${points} pontos`, 'success');
  };

  const addPoints = (points: number) => {
    setState(prev => ({
      ...prev,
      userProgress: {
        ...prev.userProgress,
        currentScore: prev.userProgress.currentScore + points,
      },
    }));
  };

  const resetProgress = () => {
    setState(prev => ({
      ...prev,
      userProgress: {
        completedModules: [],
        medals: [],
        currentScore: 0,
      },
    }));
    showToast('Progresso resetado com sucesso!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setState(prev => ({ ...prev, toastMessage: message, toastType: type }));
    setTimeout(() => {
      setState(prev => ({ ...prev, toastMessage: '', toastType: '' }));
    }, 3000);
  };

  const toggleSetting = (setting: 'highContrast' | 'largeText' | 'audioEnabled') => {
    setState(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const renderScreen = () => {
    const screenProps = {
      state,
      navigateTo,
      completeModule,
      addMedal,
      addPoints,
      resetProgress,
      showToast,
      toggleSetting,
    };

    switch (state.currentScreen) {
      case 'splash':
        return <SplashScreen {...screenProps} />;
      case 'menu':
        return <MainMenu {...screenProps} />;
      case 'settings':
        return <SettingsScreen {...screenProps} />;
      case 'progress':
        return <ProgressScreen {...screenProps} />;

      // Calls Module
      case 'calls-menu':
        return <ModuleMenu {...screenProps} moduleId="calls" />;
      case 'calls':
        return <CallsSimulation {...screenProps} />;
      case 'video-calls':
        return <VideoExplanation {...screenProps} moduleId="calls" />;
      case 'quiz-calls':
        return <QuizScreen {...screenProps} moduleId="calls" />;

      // Messages Module
      case 'messages-menu':
        return <ModuleMenu {...screenProps} moduleId="messages" />;
      case 'messages':
        return <MessagesSimulation {...screenProps} />;
      case 'video-messages':
        return <VideoExplanation {...screenProps} moduleId="messages" />;
      case 'quiz-messages':
        return <QuizScreen {...screenProps} moduleId="messages" />;

      // Security Module
      case 'security-menu':
        return <ModuleMenu {...screenProps} moduleId="security" />;
      case 'security':
        return <SecurityGame {...screenProps} />;
      case 'video-security':
        return <VideoExplanation {...screenProps} moduleId="security" />;
      case 'quiz-security':
        return <QuizScreen {...screenProps} moduleId="security" />;

      // Camera Module
      case 'camera-menu':
        return <ModuleMenu {...screenProps} moduleId="camera" />;
      case 'camera':
        return <CameraSimulation {...screenProps} />;
      case 'video-camera':
        return <VideoExplanation {...screenProps} moduleId="camera" />;
      case 'quiz-camera':
        return <QuizScreen {...screenProps} moduleId="camera" />;

      default:
        return <SplashScreen {...screenProps} />;
    }
  };

  return (
    <SafeAreaView style={[
      styles.container,
      state.highContrast && styles.highContrast,
    ]}>
      <StatusBar barStyle={state.highContrast ? 'dark-content' : 'default'} />
      {renderScreen()}
      <Toast
        message={state.toastMessage}
        type={state.toastType}
        visible={!!state.toastMessage}
        large={state.largeText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
  },
  highContrast: {
    backgroundColor: '#ffffff',
  },
});