// These are the different regex flags you can set

export default class RegexFlag {
    static GLOBAL = new RegexFlag('g');
    static MULTILINE = new RegexFlag('m');
    static CASE_INSENSITIVE = new RegexFlag('i');
    static STICKY = new RegexFlag('y');
    static UNICODE = new RegexFlag('u');
    static SINGLE_LINE = new RegexFlag('s');
    static INDICES = new RegexFlag('d');

    constructor(character) {
        this._character = character;
    }

    toString() {
        return this._character;
    }
}
