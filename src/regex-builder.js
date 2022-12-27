import RegexFlags from './regex-flags.js';
import Regex from './regex.js';
import RegexCharacter from "./regex-character.js";
import RegexQuantifier from "./regex/quantifier/regex-quantifier.js";
import RegexGroup from "./regex/group/regex-group.js";

// This is used to construct a human-readable regex
// TODO: Change some of these to be more specific. Only allow you to set quantity on elements
export default class RegexBuilder {
    constructor() {
        this._regex = '';
        this._flags = new RegexFlags();
    }

    add(text) {
        this._regex += text;
        return this;
    }

    anyNumberOfTimes() {

    }

    atLeastOnce() {

    }

    neverOrOnce() {

    }




    quoteCharacter() {
        let text = new RegexGroup('\'"');
        return text.matchOneCharacter();
    }

    quotedText(text) {
        return '' + this.quoteCharacter() + text + this.quoteCharacter();
    }

    optionalWhitespace() {
        return '' + RegexCharacter.WHITESPACE + RegexQuantifier.ANY_NUMBER_OF_TIMES;
    }

    mandatoryWhitespace() {
        return '' + RegexCharacter.WHITESPACE + RegexQuantifier.AT_LEAST_ONCE;
    }

    addFlag(regexFlag) {
        this._flags.addFlag(regexFlag);
        return this;
    }

    // This returns a custom regex class
    build() {
        return new Regex(this._regex, this._flags);
    }
}
