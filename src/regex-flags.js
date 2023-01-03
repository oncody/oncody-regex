// This is a collection of multiple regex flags and will then convert it to a string containing all of the flags set

export default class RegexFlags {
    constructor() {
        this._flags = new Set();
    }

    add(flag) {
        this._flags.add(flag);
    }

    remove(flag) {
        this._flags.delete(flag);
    }

    toString() {
        return Array.from(this._flags).map(flag => flag.toString()).join('');
    }
}
