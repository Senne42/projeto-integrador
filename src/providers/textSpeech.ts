import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable()
export class TextSpeechProvider {

    constructor(private tts: TextToSpeech) { }

    public speak(text: string){
        return this.tts.speak({
            text: text,
            locale: 'pt-BR',
        })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
    }
}