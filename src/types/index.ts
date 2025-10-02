export interface UserProgress {
    completedModules: string[];
    medals: string[];
    currentScore: number;
}

export interface AppState {
    currentScreen: string;
    userProgress: UserProgress;
    highContrast: boolean;
    largeText: boolean;
    audioEnabled: boolean;
    toastMessage: string;
    toastType: 'success' | 'error' | 'info' | '';
}

export interface ScreenProps {
    state: AppState;
    navigateTo: (screen: string) => void;
    completeModule: (moduleId: string) => void;
    addMedal: (name: string, points?: number) => void;
    addPoints: (points: number) => void;
    resetProgress: () => void;
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    toggleSetting: (setting: 'highContrast' | 'largeText' | 'audioEnabled') => void;
}