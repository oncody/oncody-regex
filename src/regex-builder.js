import RegexFlag from './regex-flags.js';
import Regex from './regex.js';


// This is used to construct a human-readable regex
export default class RegexBuilder {
    constructor() {
        this._regex = '';
        this._flags = new RegexFlag();
    }

    text(text) {
        return this._appendToRegex(text);
    }

    anyCharacter() {
        return this._appendToRegex('.');
    }

    backslashCharacter() {
        return this._appendToRegex('\\');
    }

    whitespaceCharacter() {
        this.backslashCharacter();
        return this._appendToRegex('s');
    }

    optionalWhitespace() {
        this.whitespaceCharacter();
        return this.repeatZeroOrMoreTimes();
    }

    mandatoryWhitespace() {
        this.whitespaceCharacter();
        return this.repeatOneOrMoreTimes();
    }

    matchQuote() {
        return this.characterInGroup('\'"');
    }

    captureGroupStart() {
        return this._appendToRegex('(')
    }

    captureGroupEnd() {
        return this._appendToRegex(')')
    }

    repeatZeroOrMoreTimes() {
        return this._appendToRegex('*');
    }

    repeatOneOrMoreTimes() {
        return this._appendToRegex('+');
    }

    characterInGroup(characterGroup) {
        return this._appendToRegex(`[${characterGroup}]`);
    }

    characterNotInString(characterGroup) {
        return this._appendToRegex(`[^${characterGroup}]`);
    }

    addFlag(regexFlag) {
        this._flags.addFlag(regexFlag);
        return this;
    }

    _appendToRegex(text) {
        this._regex += text;
        return this;
    }

    // This returns a custom regex class
    build() {
        let flags = this._flags.toString();
        // console.log(this.regex);
        let regex = new RegExp(this._regex, flags);
        return new Regex(regex);
    }
}
