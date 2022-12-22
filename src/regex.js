import Match from './match.js';

export default class Regex {
    constructor(regex) {
        this._regex = regex;
    }

    firstMatch(text) {
        let match = this._regex.exec(text);
        if (match) {
            // if it has a capture group, use that
            let substring = (match.length > 1) ?  match[1] : match[0];
            let position = match.index;
            return new Match(substring, position);
        }

        return null;
    }

    allMatches(text) {
        let matches = [];
        let match;
        while ((match = this._regex.exec(text)) !== null) {
            let substring = match[0];
            let position = match.index;
            matches.push(new Match(substring, position));
        }

        return matches;
    }
}
