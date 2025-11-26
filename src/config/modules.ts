import { Phone, MessageSquare, Shield, Camera } from 'lucide-react-native';

export const MODULES = [
    {
        id: 'calls',
        name: 'Chamadas',
        Icon: Phone,
        color: '#16a34a',
        lightColor: '#dcfce7',
        screen: 'calls-menu',
    },
    {
        id: 'messages',
        name: 'Mensagens/WhatsApp',
        Icon: MessageSquare,
        color: '#2563eb',
        lightColor: '#dbeafe',
        screen: 'messages-menu',
    },
    {
        id: 'security',
        name: 'Segurança Digital',
        Icon: Shield,
        color: '#dc2626',
        lightColor: '#fee2e2',
        screen: 'security-menu',
    },
    {
        id: 'camera',
        name: 'Câmera e Fotos',
        Icon: Camera,
        color: '#7c3aed',
        lightColor: '#ede9fe',
        screen: 'camera-menu',
    },
];

// export const VIDEO_INFO: any = {
//     calls: {
//         title: 'Como Fazer e Receber Chamadas',
//         duration: '5:30',
//         description: 'Aprenda a fazer ligações, atender chamadas, usar o viva-voz e gerenciar sua lista de contatos de forma simples e segura.',
//     },
//     messages: {
//         title: 'WhatsApp para Iniciantes',
//         duration: '8:15',
//         description: 'Descubra como enviar mensagens de texto, áudios, fotos e vídeos pelo WhatsApp. Aprenda também a criar grupos e fazer videochamadas.',
//     },
//     security: {
//         title: 'Segurança Digital e Golpes',
//         duration: '6:45',
//         description: 'Aprenda a se proteger contra golpes digitais, identificar mensagens suspeitas e manter suas informações pessoais seguras na internet.',
//     },
//     camera: {
//         title: 'Usando a Câmera do Celular',
//         duration: '7:20',
//         description: 'Aprenda a tirar fotos, gravar vídeos, usar o zoom, flash e outros recursos da câmera. Descubra também como editar e compartilhar suas fotos.',
//     },
// };

// export const QUIZ_DATA: any = {
//     calls: {
//         question: 'Qual a função do botão vermelho durante uma chamada?',
//         options: [
//             'A) Aumentar o volume da chamada',
//             'B) Encerrar a ligação',
//             'C) Colocar a chamada em espera',
//             'D) Ativar o viva-voz',
//         ],
//         correctAnswer: 1,
//         explanation: 'O botão vermelho é usado para encerrar a ligação. É o botão mais importante durante uma chamada, pois permite finalizar a conversa quando você desejar.',
//     },
//     messages: {
//         question: 'Qual ícone você deve pressionar para enviar um áudio no WhatsApp?',
//         options: [
//             'A) Câmera ',
//             'B) Microfone ',
//             'C) Clipe de papel ',
//             'D) Emoji ',
//         ],
//         correctAnswer: 1,
//         explanation: 'O ícone do microfone () é usado para gravar e enviar mensagens de áudio. Mantenha pressionado para gravar e solte para enviar.',
//     },
//     security: {
//         question: 'O que você deve fazer quando receber uma mensagem pedindo seus dados bancários?',
//         options: [
//             'A) Enviar os dados imediatamente',
//             'B) Nunca fornecer dados bancários por mensagem',
//             'C) Enviar apenas o número da conta',
//             'D) Perguntar mais detalhes antes de enviar',
//         ],
//         correctAnswer: 1,
//         explanation: 'NUNCA forneça seus dados bancários, senhas ou informações pessoais por mensagem. Bancos e empresas legítimas nunca pedem essas informações assim. Sempre entre em contato diretamente com a instituição.',
//     },
//     camera: {
//         question: 'Qual ícone você deve pressionar para alternar entre câmera frontal e traseira?',
//         options: [
//             'A) Flash ',
//             'B) Rotação/Troca ',
//             'C) Timer ',
//             'D) Grade ',
//         ],
//         correctAnswer: 1,
//         explanation: 'O ícone de rotação/troca () permite alternar entre a câmera frontal (para selfies) e a câmera traseira (para fotos normais). É muito útil para tirar fotos de si mesmo.',
//     },
// };