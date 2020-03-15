export enum Keys{

    // ^ character sequence

    ctrl,
    alt,
    tab,
    enter,
    backspace,

    // ANSI ESC sequence
    esc,
    ins,
    del,
    up,
    down,
    left,
    right,
    pageUp,
    pageDown,
    home,
    end,

    //fn keys

    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    f7,
    f8,
    f9,
    f10,
    f11,
    f12,
}

export type KeyInput = ({
    type:'printable';
    sequence:string;
}|{
    type:'non-printable';
    keys:(Keys|string)[];
});

export enum VT100Map{
    '1~' = Keys.home,
    '2~' = Keys.ins,
    '3~' = Keys.del,
    '4~' = Keys.end,
    '5~' = Keys.pageUp,
    '6~' = Keys.pageDown,
    '7~' = Keys.home,
    '8~' = Keys.end,
    '11~' = Keys.f1,
    '12~' = Keys.f2,
    '13~' = Keys.f3,
    '14~' = Keys.f4,
    '15~' = Keys.f5,
    '17~' = Keys.f6,
    '18~' = Keys.f7,
    '19~' = Keys.f8,
    '20~' = Keys.f9,
    '21~' = Keys.f10,
    '23~' = Keys.f11,
    '24~' = Keys.f12,
}

export enum XTermMap{
    'A' = Keys.up,
    'B' = Keys.down,
    'C' = Keys.right,
    'D' = Keys.left,
    'F' = Keys.end,
    'H' = Keys.home,
    'OP' = Keys.f1,
    'OQ' = Keys.f2,
    'OR' = Keys.f3,
    'OS' = Keys.f4,
}

export enum OtherTermMap{
    '[A' = Keys.f1,
    '[B' = Keys.f2,
    '[C' = Keys.f3,
    '[D' = Keys.f4,
    '[E' = Keys.f5,
}

export const KeyMaps = [VT100Map,XTermMap,OtherTermMap];

export enum ControlPlusVT100Map{
    '1;5~' = Keys.home,
    '2;5~' = Keys.ins,
    '3;5~' = Keys.del,
    '4;5~' = Keys.end,
    '5;5~' = Keys.pageUp,
    '6;5~' = Keys.pageDown,
    '7;5~' = Keys.home,
    '11^' = Keys.f1,
    '12^' = Keys.f2,
    '13^' = Keys.f3,
    '14^' = Keys.f4,
    '15^' = Keys.f5,
    '17^' = Keys.f6,
    '18^' = Keys.f7,
    '19^' = Keys.f8,
    '20^' = Keys.f9,
    '21^' = Keys.f10,
    '23^' = Keys.f11,
    '24^' = Keys.f12,
}

export enum ControlPlusXTermMap{
    '1;5A' = Keys.up,
    '1;5B' = Keys.down,
    '1;5C' = Keys.right,
    '1;5D' = Keys.left,
    '1;5F' = Keys.end,
    '1;5H' = Keys.home,
}

export const ControlPlusKeyMaps = [ControlPlusVT100Map,ControlPlusXTermMap];
