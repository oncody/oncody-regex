import Match from './match.js';
import RegexFlag from "./regex-flag.js";

export default class Regex {

    /**
     * @param {string} regex
     * @param {RegexFlags} flags
     * @returns {Regex}
     */
    constructor(regex, flags) {
        this._regex = regex;
        this._flags = flags;
    }

    /**
     * @param {string} text
     * @returns {Match|null}
     */
    firstMatch(text) {
        this._flags.remove(RegexFlag.GLOBAL);
        let flags = this._flags.toString();
        let regex = new RegExp(this._regex, flags);

        let match = regex.exec(text);
        if (match) {
            // if it has a capture group, use that
            let matchedText = (match.length > 1) ?  match[1] : match[0];
            return new Match(matchedText, match.index);
        }

        return null;
    }

    /**
     * @param {string} text
     * @returns {Match[]}
     */
    allMatches(text) {
        this._flags.add(RegexFlag.GLOBAL);
        let flags = this._flags.toString();
        let regex = new RegExp(this._regex, flags);

        let matches = [];
        for(let match of text.matchAll(regex)) {
            // if it has a capture group, use that
            let matchedText = (match.length > 1) ?  match[1] : match[0];
            matches.push(new Match(matchedText, match.index));
        }

        return matches;
    }
}
