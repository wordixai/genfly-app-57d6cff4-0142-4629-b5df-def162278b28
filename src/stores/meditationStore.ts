import { create } from 'zustand';

export interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface TimerState {
  isActive: boolean;
  isPaused: boolean;
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  selectedDuration: number; // in minutes
}

export interface AmbientSound {
  id: string;
  name: string;
  audioUrl: string;
  icon: string;
  volume: number;
  isPlaying: boolean;
}

interface MeditationStore {
  // Timer state
  timer: TimerState;
  
  // Session state
  currentSession: MeditationSession | null;
  guidedSessions: MeditationSession[];
  
  // Ambient sounds
  ambientSounds: AmbientSound[];
  
  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setDuration: (minutes: number) => void;
  setCurrentSession: (session: MeditationSession | null) => void;
  updateTimeLeft: (timeLeft: number) => void;
  
  // Ambient sound actions
  toggleAmbientSound: (id: string) => void;
  setAmbientVolume: (id: string, volume: number) => void;
  stopAllAmbientSounds: () => void;
}

export const useMeditationStore = create<MeditationStore>((set, get) => ({
  timer: {
    isActive: false,
    isPaused: false,
    timeLeft: 300, // 5 minutes default
    totalTime: 300,
    selectedDuration: 5,
  },
  
  currentSession: null,
  
  guidedSessions: [
    {
      id: '1',
      title: 'Mindful Breathing',
      description: 'A gentle introduction to mindfulness through breath awareness',
      duration: 10,
      category: 'Beginner',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    },
    {
      id: '2',
      title: 'Body Scan Relaxation',
      description: 'Progressive relaxation technique for deep rest',
      duration: 15,
      category: 'Relaxation',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop',
    },
    {
      id: '3',
      title: 'Loving Kindness',
      description: 'Cultivate compassion for yourself and others',
      duration: 20,
      category: 'Heart-Centered',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    },
    {
      id: '4',
      title: 'Mountain Meditation',
      description: 'Find stability and strength like an unmovable mountain',
      duration: 12,
      category: 'Visualization',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    },
    {
      id: '5',
      title: 'Sleep Preparation',
      description: 'Gentle meditation to prepare your mind for restful sleep',
      duration: 25,
      category: 'Sleep',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop',
    },
  ],
  
  ambientSounds: [
    {
      id: 'rain',
      name: 'Rain',
      audioUrl: '/sounds/rain.mp3',
      icon: '🌧️',
      volume: 0.5,
      isPlaying: false,
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      audioUrl: '/sounds/ocean.mp3',
      icon: '🌊',
      volume: 0.5,
      isPlaying: false,
    },
    {
      id: 'forest',
      name: 'Forest',
      audioUrl: '/sounds/forest.mp3',
      icon: '🌲',
      volume: 0.5,
      isPlaying: false,
    },
    {
      id: 'birds',
      name: 'Birds',
      audioUrl: '/sounds/birds.mp3',
      icon: '🐦',
      volume: 0.5,
      isPlaying: false,
    },
    {
      id: 'fire',
      name: 'Crackling Fire',
      audioUrl: '/sounds/fire.mp3',
      icon: '🔥',
      volume: 0.5,
      isPlaying: false,
    },
    {
      id: 'wind',
      name: 'Gentle Wind',
      audioUrl: '/sounds/wind.mp3',
      icon: '💨',
      volume: 0.5,
      isPlaying: false,
    },
  ],
  
  startTimer: () => set((state) => ({
    timer: { ...state.timer, isActive: true, isPaused: false }
  })),
  
  pauseTimer: () => set((state) => ({
    timer: { ...state.timer, isPaused: !state.timer.isPaused }
  })),
  
  resetTimer: () => set((state) => ({
    timer: {
      ...state.timer,
      isActive: false,
      isPaused: false,
      timeLeft: state.timer.totalTime,
    }
  })),
  
  setDuration: (minutes: number) => {
    const seconds = minutes * 60;
    set((state) => ({
      timer: {
        ...state.timer,
        selectedDuration: minutes,
        totalTime: seconds,
        timeLeft: seconds,
        isActive: false,
        isPaused: false,
      }
    }));
  },
  
  setCurrentSession: (session: MeditationSession | null) => {
    set({ currentSession: session });
    if (session) {
      get().setDuration(session.duration);
    }
  },
  
  updateTimeLeft: (timeLeft: number) => set((state) => ({
    timer: { ...state.timer, timeLeft }
  })),
  
  toggleAmbientSound: (id: string) => set((state) => ({
    ambientSounds: state.ambientSounds.map(sound =>
      sound.id === id ? { ...sound, isPlaying: !sound.isPlaying } : sound
    )
  })),
  
  setAmbientVolume: (id: string, volume: number) => set((state) => ({
    ambientSounds: state.ambientSounds.map(sound =>
      sound.id === id ? { ...sound, volume } : sound
    )
  })),
  
  stopAllAmbientSounds: () => set((state) => ({
    ambientSounds: state.ambientSounds.map(sound => ({ ...sound, isPlaying: false }))
  })),
}));