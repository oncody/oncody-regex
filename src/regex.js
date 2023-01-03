import Match from './match.js';
import RegexFlag from "./regex-flag.js";

export default class Regex {
    constructor(regex, flags) {
        this._regex = regex;
        this._flags = flags;
    }

    firstMatch(text) {
        this._flags.remove(RegexFlag.GLOBAL);
        let flags = this._flags.toString();
        let regex = new RegExp(this._regex, flags);

        let match = regex.exec(text);
        if (match) {
            // if it has a capture group, use that
            let substring = (match.length > 1) ?  match[1] : match[0];
            let position = match.index;
            return new Match(substring, position);
        }

        return null;
    }

    allMatches(text) {
        this._flags.add(RegexFlag.GLOBAL);
        let flags = this._flags.toString();
        let regex = new RegExp(this._regex, flags);

        let matches = [];
        for(let match of text.matchAll(regex)) {
            matches.push(new Match(match[0], match.index));
        }

        return matches;
    }
}
