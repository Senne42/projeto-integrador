import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Injectable } from '@angular/core';

@Injectable()
export class SpeechRecognitionProvider {

    constructor(private speechRecognition: SpeechRecognition) { }

    options = {
        language: 'pt-BR',
        showPopup: true,
    }

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

    public hasPermission() {
        return this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
            if(!hasPermission) return this.requestPermission();
        })
    }
    
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