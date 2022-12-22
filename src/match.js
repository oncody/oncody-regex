// Represent a matched substring

export default class Match {
    constructor(text, position) {
        this._text = text;
        this._startPosition = position;
        this._endPosition = position + text.length;
    }

    text() {
        return this._text;
    }

    startPosition() {
        return this._startPosition;
    }

    endPosition() {
        return this._endPosition;
    }
}
