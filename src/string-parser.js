import Match from './match.js';

export default class StringParser {
    constructor(text) {
        this._text = text;
    }

    match(substring) {
        let index = this._text.indexOf(substring);
        return new Match(substring, index);
    }

    match(substring, position) {
        let positionFound = this._text.indexOf(substring, position);
        return new Match(substring, positionFound);
    }

    matchBetweenTwoStrings(startString, endString) {
        let startMatch = this.match(startString)
        let endMatch = this.match(endString, startMatch.endPosition())
        let string = this._text.substring(startMatch.startPosition(), endMatch.endPosition());
        return new Match(string, startMatch.startPosition());
    }
}
