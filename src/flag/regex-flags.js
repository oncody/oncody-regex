/**
 * This is a collection of multiple regex flags and will then convert it to a string containing all of the flags set
 */
class RegexFlags {

    /**
     * @returns {RegexFlags}
     */
    constructor() {
        this._flags = new Set();
    }

    /**
     * @param {RegexFlag} flag
     * @returns {undefined}
     */
    add(flag) {
        this._flags.add(flag);
    }

    /**
     * @param {RegexFlag} flag
     * @returns {undefined}
     */
    remove(flag) {
        this._flags.delete(flag);
    }

    /**
     * @return {string}
     */
    toString() {
        return Array.from(this._flags).map(flag => flag.toString()).join('');
    }
}

export {RegexFlags}