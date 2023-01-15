import RegexBuilder from "./src/regex-builder.js";
import RegexCharacter from "./src/regex-character.js";
import StringParser from "./src/string-parser.js";
import Match from "./src/match.js";

export default class Index {
    /**
     * @returns {Index}
     */
    constructor() {
    }

    /**
     * @returns {RegexBuilder}
     * @constructor
     */
    static Builder() {
        return RegexBuilder;
    }

    /**
     * @returns {RegexCharacter}
     * @constructor
     */
    static Character() {
        return RegexCharacter;
    }

    /**
     * @returns {StringParser}
     * @constructor
     */
    static StringParser() {
        return StringParser;
    }

    /**
     * @returns {Match}
     * @constructor
     */
    static Match() {
        return Match;
    }
}