import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AppState } from './src/types';
import { Toast } from './src/components/ui/Toast';
import api from './src/services/api';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    navParams: {},
    usuario: null,
    progresso: null,
    token: null,
    
    highContrast: false,
    largeText: false,
    audioEnabled: false,
    toastMessage: '',
    toastType: '',
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLogin = async () => {
    const googleUserData = {
      id: "123456789",
      email: "teste@gmail.com",
      name: "Usuário de Teste"
    };

    const response = await api.post('/api/usuarios/auth/login', {
      googleId: googleUserData.id,
      email: googleUserData.email,
      nomeExibicao: googleUserData.name,
    });

    const { token, usuario } = response.data;

    await AsyncStorage.setItem('@app_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const progressoResponse = await api.get(`/api/progresso/usuario/${usuario.id}`);
    const progresso = progressoResponse.data;

    setState(prevState => ({
      ...prevState,
      usuario: usuario,
      progresso: progresso,
      token: token,
      highContrast: usuario.configAltoContraste,
      largeText: usuario.configTextoGrande,
    }));

    navigateTo('menu', {});
  };

  const navigateTo = (screen: string, params: any) => {
    setState(prev => ({ ...prev, currentScreen: screen, navParams: params }));
  };

  const completeModule = async (licaoId: number) => {
    if (!state.usuario) return;

    try {
      await api.post(`/api/progresso/usuario/${state.usuario.id}/completar-licao/${licaoId}`);

      const response = await api.get(`/api/progresso/usuario/${state.usuario.id}`);

      setState(prev => ({
        ...prev,
        progresso: response.data,
      }));

      showToast('Módulo completado e pontos ganhos!', 'success');

    } catch (err) {
      console.error("Erro ao completar módulo:", err);
      showToast('Erro ao salvar seu progresso.', 'error');
    }
  };

  const addMedal = async (nomeMedalha: string, pontosExtras?: number) => {
    if (!state.usuario) return;

    try {
      await api.post(`/api/progresso/usuario/${state.usuario.id}/conceder-medalha`, {
        nomeMedalha: nomeMedalha,
        pontosExtras: pontosExtras || 0,
      });

      const response = await api.get(`/api/progresso/usuario/${state.usuario.id}`);

      setState(prev => ({
        ...prev,
        progresso: response.data,
      }));

      showToast(`Medalha conquistada: ${nomeMedalha}!`, 'success');

    } catch (err) {
      console.error("Erro ao adicionar medalha:", err);
      showToast('Erro ao salvar sua medalha.', 'error');
    }
  };


  const resetProgress = async () => {
    if (!state.usuario) return;

    try {
      await api.delete(`/api/progresso/usuario/${state.usuario.id}/resetar`);

      const response = await api.get(`/api/progresso/usuario/${state.usuario.id}`);

      setState(prev => ({
        ...prev,
        progresso: response.data,
      }));

      showToast('Todo o seu progresso foi resetado.', 'info');
      navigateTo('menu', {});

    } catch (err) {
      console.error("Erro ao resetar progresso:", err);
      showToast('Erro ao resetar seu progresso.', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setState(prev => ({ ...prev, toastMessage: message, toastType: type }));
    setTimeout(() => {
      setState(prev => ({ ...prev, toastMessage: '', toastType: '' }));
    }, 3000);
  };

  const toggleSetting = (setting: 'highContrast' | 'largeText' | 'audioEnabled') => {

    setState(prev => {

      const newState = { ...prev, [setting]: !prev[setting] };

      if (setting === 'highContrast' || setting === 'largeText') {

        if (!newState.usuario) {
          console.warn("Usuário não logado, não é possível salvar configurações.");
          return newState;
        }

        const usuario = newState.usuario;

        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
          try {
            const configDto = {
              configTextoGrande: newState.largeText,
              configAltoContraste: newState.highContrast,
            };

            await api.put(`/api/usuarios/${usuario.id}/configuracoes`, configDto);

          } catch (err) {
            console.error("Erro ao salvar configuração:", err);

            showToast('Não foi possível salvar sua preferência.', 'error');
          }
        }, 1000);
      }

      return newState;
    });
  };

  const renderScreen = () => {
    const screenProps = {
      state,
      navigateTo,
      completeModule,
      addMedal,
      resetProgress,
      showToast,
      toggleSetting,
    };

    switch (state.currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            state={state}
            navigateTo={navigateTo}
            handleLogin={handleLogin}
          />
        );
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
      

      // Messages Module
      case 'messages-menu':
        return <ModuleMenu {...screenProps} moduleId="messages" />;
      case 'messages':
        return <MessagesSimulation {...screenProps} />;
      case 'video-messages':
        return <VideoExplanation {...screenProps} moduleId="messages" />;
      

      // Security Module
      case 'security-menu':
        return <ModuleMenu {...screenProps} moduleId="security" />;
      case 'security':
        return <SecurityGame {...screenProps} />;
      case 'video-security':
        return <VideoExplanation {...screenProps} moduleId="security" />;
      

      // Camera Module
      case 'camera-menu':
        return <ModuleMenu {...screenProps} moduleId="camera" />;
      case 'camera':
        return <CameraSimulation {...screenProps} />;
      case 'video-camera':
        return <VideoExplanation {...screenProps} moduleId="camera" />;
      

      // Quiz Module Unificado

      case 'quiz':
        return (
            <QuizScreen 
                {...screenProps} 
                licaoId={state.navParams.licaoId} 
                moduleId={state.navParams.moduleId} 
            />
        );

      default:
        return (
          <SplashScreen
            state={state}
            navigateTo={navigateTo}
            handleLogin={handleLogin}
          />
        );
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