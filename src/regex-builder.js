import RegexFlag from './regex-flags.js';
import Regex from './regex.js';
import RegexCharacter from "./regex-character.js";


// This is used to construct a human-readable regex
// TODO: Change some of these to be more specific. Only allow you to set quantity on elements
export default class RegexBuilder {
    constructor() {
        this._regex = '';
        this._flags = new RegexFlag();
    }

    _appendToRegex(text) {
        this._regex += text;
        return this;
    }

    text(text) {
        return this._appendToRegex(text);
    }

    optionalWhitespace() {
        this._appendToRegex(RegexCharacter.WHITESPACE.character());
        return this.repeatZeroOrMoreTimes();
    }

    mandatoryWhitespace() {
        this.whitespaceCharacter();
        return this.atLeastOnce();
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

    // This returns a custom regex class
    build() {
        let flags = this._flags.toString();
        // console.log(this.regex);
        let regex = new RegExp(this._regex, flags);
        return new Regex(regex);
    }
}
