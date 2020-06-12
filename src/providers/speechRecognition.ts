import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Injectable } from '@angular/core';
 
/**
 * Conjunto de comandos da API de reconhecimento de voz;
 */
@Injectable()
export class SpeechRecognitionProvider {

    constructor(private speechRecognition: SpeechRecognition) { }
    // Parametros do reconhecimento de voz;
    options = {
        language: 'pt-BR',
        showPopup: true,
    }

    /**
     * Inicia o reconhecimento de voz;
     */
    public startListening() {
        let resultados;
        this.speechRecognition.startListening(this.options)
        .subscribe(
            (matches: string[]) => {
                resultados = matches;
            },
            (onerror) => {
                resultados = onerror;
            }
        )
        return resultados;
    }

    /**
     * Checka se há permissão do dispositivo para a captura de audio;
     */
    public hasPermission() {
        return this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
            if(!hasPermission) return this.requestPermission();
        })
    }
    
    /**
     * Pede permissão para o uso do microfone do dispositivo;
     */
    public requestPermission() {
        return this.speechRecognition.requestPermission()
        .then(
            () => {
                return true;
            },
            () => {
                return false;
            }
        )
    }
}