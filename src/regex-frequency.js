
export default class RegexFrequency {
    constructor() {
        this._regex = '';
    }

    _appendToRegex(text) {
        this._regex += text;
        return this;
    }

    text(text) {
        return this._appendToRegex(text);
    }

    anyNumberOfTimes() {
        return this._appendToRegex('*');
    }

    atLeastOnce() {
        return this._appendToRegex('+');
    }

    neverOrOnce() {
        return this._appendToRegex('?');
    }
}

