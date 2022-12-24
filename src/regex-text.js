export default class RegexText {
    constructor(text) {
        this._text = text;
    }

    matchAllAndCapture() {
        this._text = `(${this._text})`;
        return this._text;
    }

    matchAllButDontCapture() {
        this._text = `(?:${this._text})`;
        return this._text;
    }

    matchOneCharacter() {
        this._text = `[${this._text}]`;
        return this._text;
    }

    matchOneCharacterNotIn() {
        this._text `[^${this._text}]`;
        return this._text;
    }

    toString() {
        return this._text;
    }
}