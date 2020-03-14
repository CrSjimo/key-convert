import { KeyInput, Keys, VT100Map, XTermMap, OtherTermMap, KeyMaps, ControlPlusKeyMaps } from "./KeyInput";

export function convert(chunk:Buffer):KeyInput{

    //char codes(unicode)
    let charSequence = [...chunk.toString()].map(c=>c.charCodeAt(0));

    if((charSequence.length==1 && charSequence[0]>=0x20 && charSequence[0]<=0x7e)||(charSequence.length>1 && charSequence[0]!=0x1b)){
        //printable char including \uffff and above \uffff(such as emoji)
        return {
            type:'printable',
            sequence:chunk.toString(),
        }
    }else{
        //non-printable
        let keys:(number|string)[] = [chunk.toString()];
        if(charSequence.length==1){
            if(charSequence[0] == 0x08){
                keys = [Keys.backspace];
            }else if(charSequence[0] == 0x09){
                keys = [Keys.tab];
            }else if(charSequence[0] == 0x0a || charSequence[0] == 0x0d){
                keys = [Keys.enter];
            }else if(charSequence[0]>=0x01&&charSequence[0]<=0x1a){
                //^A-^Z keys
                keys = [Keys.ctrl,String.fromCharCode(0x40+charSequence[0])]
            }else{
                switch(charSequence[0]){
                    case 0x1b:
                        keys = [Keys.esc];
                        break;
                    case 0x1c:
                        keys = [Keys.ctrl,'\\'];
                        break;
                    case 0x1d:
                        keys = [Keys.ctrl,']'];
                    case 0x1e:
                        keys = [Keys.ctrl,'^'];
                    case 0x1f:
                        keys = [Keys.ctrl,'_'];
                    case 0x7f:
                        keys = [Keys.del];
                }
            }
        }else{
            //ESC sequence

            //alt+char
            if(charSequence[0]==0x1b && charSequence[1]!=0x5b){
                let seq = convert(chunk.slice(1));
                if(seq.type == 'printable'){
                    keys = [Keys.alt,seq.sequence];
                }else{
                    keys = [Keys.alt,...seq.keys];
                }
            }

            //CSI
            let seq = String.fromCharCode(...charSequence.slice(2));
            let isControlPlusKey = true;
            for(let KeyMap of KeyMaps){
                if(seq in KeyMap){
                    keys = [KeyMap[seq as any]];
                    isControlPlusKey = false;
                    break;
                }
            }
            if(isControlPlusKey){
                for(let KeyMap of ControlPlusKeyMaps){
                    if(seq in KeyMap){
                        keys = [Keys.ctrl,KeyMap[seq as any]];
                        break;
                    }
                }
            }
        }

        return{
            type:'non-printable',
            keys,
        }
    }

}