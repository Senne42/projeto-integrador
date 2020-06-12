import { Injectable } from '@angular/core';
import  { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

/**
 * Conjunto de comandos que transformam texto em fala;
 */
@Injectable()
export class TextSpeechProvider {

    constructor(private tts: TextToSpeech) { }

    /**
     * Recebe um texto e o reproduz no dispositivo;
     * @param text Texto da fala;
     */
    public speak(text: string){
        return this.tts.speak({
            text: text,
            locale: 'pt-BR',
        })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
    }
}