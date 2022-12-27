import RegexFlags from "./regex-flags.js";
import Regex from "./regex.js";

// This is used to construct a human-readable regex
export default class RegexBuilder {
    constructor(text, flags) {
        this._text = text ? text : '';
        this._flags = flags ? flags : new RegexFlags();
    }

    match(text) {
        this._text += (text.length > 1) ? `(?:${text})` : text;
        return this;
    }

    matchSingleCharacterInside(text) {
        this._text += (text.length > 1) ? `[${text}]` : text;
        return this;
    }

    matchSingleCharacterOutside(text) {
        this._text += `[^${text}]`;
        return this;
    }

    startCapture() {
        this._text += '(';
        return this;
    }

    endCapture() {
        this._text += ')';
        return this;
    }

    anyNumberOfTimesGreedy() {
        this._text += '*';
        return this;
    }

    anyNumberOfTimesLazy() {
        this._text += '*?';
        return this;
    }

    atLeastOnceGreedy() {
        this._text += '+';
        return this;
    }

    atLeastOnceLazy() {
        this._text += '+?';
        return this;
    }

    neverOrOnceGreedy() {
        this._text += '?';
        return this;
    }

    neverOrOnceLazy() {
        this._text += '??';
        return this;
    }

    addFlag(flag) {
        this._flags.addFlag(flag);
        return this;
    }

    // This returns a custom regex class
    build() {
        return new Regex(this._text, this._flags);
    }
}
