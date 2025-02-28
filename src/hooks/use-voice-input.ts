import { useCallback, useEffect, useState } from 'react';

interface VoiceInputState {
    isListening: boolean;
    isSupported: boolean;
    transcript: string;
    error: string | null;
}

interface UseVoiceInputProps {
    onTranscriptChange?: (transcript: string) => void;
    onError?: (error: string) => void;
    language?: string;
}

export function useVoiceInput({
    onTranscriptChange,
    onError,
    language = 'en-US'
}: UseVoiceInputProps = {}) {
    const [state, setState] = useState<VoiceInputState>({
        isListening: false,
        isSupported: false,
        transcript: '',
        error: null
    });

    // Initialize speech recognition
    const recognition = useCallback(() => {
        if (typeof window === 'undefined') return null;
        
        // Handle different browser implementations
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return null;

        const instance = new SpeechRecognition();
        instance.continuous = true;
        instance.interimResults = true;
        instance.lang = language;
        return instance;
    }, [language]);

    useEffect(() => {
        const isSupported = !!recognition();
        setState(prev => ({ ...prev, isSupported }));
    }, [recognition]);

    const startListening = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
        const recognitionInstance = recognition();
        if (!recognitionInstance) {
            setState(prev => ({ 
                ...prev, 
                error: 'Speech recognition is not supported in this browser.' 
            }));
            onError?.('Speech recognition is not supported in this browser.');
            return;
        }

        recognitionInstance.onstart = () => {
            setState(prev => ({ ...prev, isListening: true, error: null }));
        };

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map(result => result[0]?.transcript || '')
                .filter(Boolean)
                .join('');
            
            setState(prev => ({ ...prev, transcript }));
            onTranscriptChange?.(transcript);
        };

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
            const error = event.error === 'not-allowed' 
                ? 'Microphone access was denied. Please check your browser permissions.'
                : `Error during speech recognition: ${event.error}`;
            
            setState(prev => ({ ...prev, error, isListening: false }));
            onError?.(error);
        };

        recognitionInstance.onend = () => {
            setState(prev => ({ ...prev, isListening: false }));
        };

        try {
            recognitionInstance.start();
        } catch (error) {
            setState(prev => ({ 
                ...prev, 
                error: 'Failed to start speech recognition.',
                isListening: false 
            }));
            onError?.('Failed to start speech recognition.');
        }

        return recognitionInstance;
    }, [recognition, onTranscriptChange, onError]);

    const stopListening = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
        const recognitionInstance = recognition();
        if (recognitionInstance) {
            recognitionInstance.stop();
            setState(prev => ({ ...prev, isListening: false }));
        }
    }, [recognition]);

    return {
        ...state,
        startListening,
        stopListening
    };
} 