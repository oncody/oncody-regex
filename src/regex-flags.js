// This is a collection of multiple regex flags and will then convert it to a string containing all of the flags set

export default class RegexFlags {
    constructor() {
        this._flagSet = new Set();
    }

    addFlag(regexFlag) {
        this._flagSet.add(regexFlag);
    }

    toString() {
        return Array.from(this._flagSet).map(flag => flag.toString()).join('');
    }
}
