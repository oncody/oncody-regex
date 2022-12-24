
export default class RegexFrequency {
    static ANY_NUMBER_OF_TIMES = new RegexFrequency('*');
    static AT_LEAST_ONCE = new RegexFrequency('+');
    static NEVER_OR_ONCE = new RegexFrequency('?');

    constructor(char) {
        this._char = char;
    }

    toString() {
        return this._char;
    }
}

