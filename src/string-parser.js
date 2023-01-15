import {Match} from './match.js';

class StringParser {

    /**
     * @param {string} text
     * @returns {StringParser}
     */
    constructor(text) {
        this._text = text;
    }

    /**
     * @param {string} substring
     * @return {Match}
     */
    match(substring) {
        let index = this._text.indexOf(substring);
        return new Match(substring, index);
    }

    /**
     * @param {string} substring
     * @param {number} position
     * @return {Match}
     */
    matchAfterPosition(substring, position) {
        let positionFound = this._text.indexOf(substring, position);
        return new Match(substring, positionFound);
    }

    /**
     * @param {string} startString
     * @param {string} endString
     * @return {Match}
     */
    matchBetweenTwoStrings(startString, endString) {
        let startMatch = this.match(startString)
        let endMatch = this.matchAfterPosition(endString, startMatch.endPosition())
        let string = this._text.substring(startMatch.startPosition(), endMatch.endPosition());
        return new Match(string, startMatch.startPosition());
    }
}

export {StringParser}
