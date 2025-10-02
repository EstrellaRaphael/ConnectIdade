# 📱 ConnectIdade

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Aplicativo educacional para ensinar pessoas idosas (60+) a usar smartphones de forma prática e segura**

[Sobre](#-sobre) • [Funcionalidades](#-funcionalidades) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [Tecnologias](#-tecnologias)

</div>

---

## 📖 Sobre

**ConnectIdade** é um aplicativo mobile educacional desenvolvido em React Native com Expo, projetado especialmente para pessoas com 60 anos ou mais que desejam aprender ou melhorar suas habilidades com dispositivos móveis.

O app combina **simulações interativas**, **vídeos explicativos**, **quizzes** e um **sistema de gamificação** para tornar o aprendizado engajante, seguro e acessível.

### 🎯 Objetivos

- ✅ Ensinar uso básico de smartphones de forma intuitiva
- ✅ Promover segurança digital e prevenção de golpes
- ✅ Aumentar confiança no uso da tecnologia
- ✅ Fornecer ambiente de prática seguro
- ✅ Gamificar o processo de aprendizado

---

## ✨ Funcionalidades

### 📚 4 Módulos Educacionais Completos

#### 1️⃣ **Chamadas Telefônicas**

- Simulador de chamadas realista
- Aprender a fazer e receber ligações
- Quiz interativo

#### 2️⃣ **Mensagens/WhatsApp**

- Simulador progressivo em 4 etapas:
  - Enviar mensagem de texto
  - Enviar áudio
  - Enviar foto
  - Anexar arquivo
- Interface realista do WhatsApp
- Quiz sobre funcionalidades

#### 3️⃣ **Segurança Digital**

- Jogo interativo com 5 cenários de golpes digitais
- Identificar mensagens suspeitas
- Explicações detalhadas sobre cada tipo de golpe
- Pontuação e feedback imediato

#### 4️⃣ **Câmera e Fotos**

- Simulador completo em 7 etapas:
  - Tirar foto
  - Alternar câmeras (frontal/traseira)
  - Modo vídeo
  - Configurar flash
  - Ativar grade de composição
  - Configurar timer
  - Gravar vídeo
- Quiz sobre uso da câmera

### 🎮 Sistema de Gamificação

- **Pontuação**: Ganhe pontos ao completar atividades
- **Medalhas**: 4 medalhas conquistáveis
  - 🏆 Primeira Chamada
  - 🏆 Mestre das Mensagens
  - 🏆 Guardião Digital
  - 🏆 Fotógrafo Expert
- **Progresso Visual**: Acompanhe sua evolução
- **Barra de Conclusão**: Veja o percentual de módulos completados

### ♿ Acessibilidade Total

- **Texto Grande**: Aumenta todas as fontes do app
- **Alto Contraste**: Modo preto e branco para melhor visibilidade
- **Áudio Explicativo**: Narração das instruções (placeholder)
- **Interface Adaptativa**: Todos os componentes respondem às configurações

### 📊 Acompanhamento de Progresso

- Contador de módulos completados
- Pontuação total acumulada
- Lista de medalhas conquistadas
- Estatísticas visuais

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn**
- **Expo Go** no celular (para testar) - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/EstrellaRaphael/ConnectIdade.git
cd conexao-digital-60
```

2. **Instale as dependências**

```bash
npm install
npm install lucide-react-native react-native-svg
npx expo install expo-linear-gradient
npx expo install react-dom react-native-web
```

3. **Inicie o projeto**

```bash
npx expo start
```

4. **Execute no dispositivo**

Escolha uma das opções:

- **📱 No celular físico** (recomendado):
  - Abra o app **Expo Go**
  - Escaneie o QR Code exibido no terminal
  
- **🖥️ Emulador Android**:
  - Pressione `a` no terminal
  
- **🍎 Simulador iOS** (apenas Mac):
  - Pressione `i` no terminal
  
- **🌐 Navegador Web** (funcionalidade limitada):
  - Pressione `w` no terminal

---

## 📖 Como Usar

### Primeiro Acesso

1. Abra o app e clique em **"Entrar"**
2. Navegue pelo **Menu Principal**
3. Escolha um dos 4 módulos disponíveis
4. Assista ao **vídeo explicativo** (recomendado)
5. Pratique no **simulador interativo**
6. Teste seus conhecimentos no **quiz**
7. Acompanhe seu progresso em **"Meu Progresso"**

### Fluxo Recomendado

```
Vídeo Explicativo → Simulador → Quiz → Próximo Módulo
```

### Configurações de Acessibilidade

Acesse pelo ícone ⚙️ no canto superior direito do Menu Principal:

- Ative **Texto Grande** para fontes maiores
- Ative **Alto Contraste** para melhor visibilidade
- Ative **Áudio Explicativo** para narração
- **Resetar Progresso** para recomeçar

---

## 🛠️ Tecnologias

### Core

- **[React Native](https://reactnative.dev/)** - Framework mobile
- **[Expo](https://expo.dev/)** - Plataforma de desenvolvimento
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática

### Bibliotecas

- **[Lucide React Native](https://lucide.dev/)** - Ícones
- **[React Native SVG](https://github.com/software-mansion/react-native-svg)** - Suporte a SVG

### Componentes Customizados

- Sistema de navegação baseado em estados
- Componentes UI reutilizáveis (Button, Card, Input, Progress, Switch, Toast)
- Sistema de notificações customizado
- Gerenciamento de estado com React Hooks

---

## 📂 Estrutura do Projeto

```
conexao-digital-60/
├── App.tsx                          # Componente principal
├── src/
│   ├── components/
│   │   └── ui/                     # Componentes reutilizáveis
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Progress.tsx
│   │       ├── Switch.tsx
│   │       └── Toast.tsx
│   ├── screens/                    # Telas do aplicativo
│   │   ├── SplashScreen.tsx
│   │   ├── MainMenu.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── ModuleMenu.tsx
│   │   ├── CallsSimulation.tsx
│   │   ├── MessagesSimulation.tsx
│   │   ├── SecurityGame.tsx
│   │   ├── CameraSimulation.tsx
│   │   ├── VideoExplanation.tsx
│   │   └── QuizScreen.tsx
│   ├── types/                      # TypeScript types
│   │   └── index.ts
│   └── config/                     # Configurações
│       └── modules.ts
├── package.json
└── README.md
```

---

## 🐛 Solução de Problemas

### Erro: "Unable to resolve module"

```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Metro Bundler não responde

```bash
npx expo start -c
```

### Ícones não aparecem

```bash
npm install lucide-react-native react-native-svg
npx expo start -c
```

### App não abre no Expo Go

1. Verifique se está na mesma rede WiFi
2. Use o modo tunnel: `npx expo start --tunnel`
3. Digite o IP manualmente no Expo Go

---

</div>
