export interface UsuarioDto {
    id: number;
    nomeExibicao: string;
    email: string;
    pontuacaoTotal: number;
    configTextoGrande: boolean;
    configAltoContraste: boolean;
}

export interface ModuloDto {
    id: number;
    titulo: string;
    descricao: string;
    ordem: number;
}

export interface LicaoDto {
    id: number;
    moduloId: number;
    tipo: 'SIMULADOR' | 'VIDEO' | 'QUIZ';
    titulo: string;
    pontosRecompensa: number;
}

export interface MedalhaDto {
    id: number;
    nome: string;
    descricao: string;
    icone: any;
}

export interface UsuarioMedalhaDto {
    id: number;
    dataConquista: string;
    medalha: MedalhaDto;
}

export interface ProgressoDto {
    pontuacaoTotal: number;
    licoesCompletasIds: number[];
    medalhas: UsuarioMedalhaDto[];
}

export interface OpcaoRespostaDto {
    id: number;
    texto: string;
}

export interface PerguntaDto {
    id: number;
    texto: string;
    opcoes: OpcaoRespostaDto[];
}

export interface QuizDto {
    id: number;
    licaoId: number;
    perguntas: PerguntaDto[];
}

export interface ResultadoQuizResponseDto {
    isCorreta: boolean;
    explicacaoResposta: string;
}


export interface AppState {
    currentScreen: string;
    
    navParams: any;
    usuario: UsuarioDto | null;
    progresso: ProgressoDto | null;
    token: string | null;
    highContrast: boolean;
    largeText: boolean;
    audioEnabled: boolean;
    toastMessage: string;
    toastType: 'success' | 'error' | 'info' | '';
}

export interface ScreenProps {
    state: AppState;
    navigateTo: (screen: string, params?: any) => void; //
    completeModule: (licaoId: number) => void;
    addMedal: (name: string, points?: number) => void;

    resetProgress: () => void;
    
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    toggleSetting: (setting: 'highContrast' | 'largeText' | 'audioEnabled') => void;
}