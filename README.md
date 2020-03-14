# key-convert

Convert keycode sequence to key string

# Get Started

Install from npm.

```
npm install key-convert
```

# Example

```typescript
import convert from 'key-convert';
process.stdin.setRawMode(true);
process.stdin.on('data',(chunk)=>{
    let keyInput = convert(dat);
    if(keyInput.type=='printable'){
        process.stdout.write(keyInput.sequence+'\n');
    }else{
        for(let k of keyInput.keys){
            if(typeof(k)=='string'){
                process.stdout.write(k+' ');
            }else{
                process.stdout.write(Keys[k]+' ');
            }
        }
        process.stdout.write('\n');
    }
    if(dat.readInt8(0)==4)process.exit();
});
```
|key pressed|output|
|-|-|
|`A`|`a`|
|`⇧` `A`|`A`|
|`^` `A`|`ctrl A`|
|`↑`|`up`|
|`^` `home`|`ctrl home`|
|`F2`|`f2`|
|`Esc`|`esc`|
|`⎇` `F9`|`alt f9`|

# Usage

## `convert`

```typescript
convert(chunk:Buffer):KeyInput
```

converting terminal-input sequences to key names.

## `KeyInput`

```typescript
type KeyInput = ({
    type:'printable';
    sequence:string;
}|{
    type:'non-printable';
    keys:(Keys|string)[];
});
```

## `Keys`

```typescript
enum Keys
```