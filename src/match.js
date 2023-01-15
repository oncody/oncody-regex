/**
 * Represent a matched substring
  */
class Match {

    /**
     * @param {string} text
     * @param {number} position
     * @returns {Match}
     */
    constructor(text, position) {
        this._text = text;
        this._startPosition = position;
        this._endPosition = position + text.length;
    }

    /**
     * @returns {string}
     */
    text() {
        return this._text;
    }

    /**
     * @returns {number}
     */
    startPosition() {
        return this._startPosition;
    }

    /**
     * @returns {number}
     */
    endPosition() {
        return this._endPosition;
    }
}

export {Match}