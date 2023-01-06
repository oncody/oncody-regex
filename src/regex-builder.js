import RegexFlags from "./regex-flags.js";
import Regex from "./regex.js";
import TooManyCaptureGroupsError from "./too-many-capture-groups-error.js";
import CaptureGroupNotStartedError from "./capture-group-not-started-error.js";

// This is used to construct a human-readable regex
export default class RegexBuilder {

    /**
     * @returns {RegexBuilder}
     */
    constructor() {
        this._text = '';
        this._flags = new RegexFlags();
        this._captureGroupStarted = false;
        this._captureGroupEnded = false;
    }

    /**
     * @param {string} text
     * @returns {RegexBuilder}
     */
    match(text) {
        this._text += (text.length > 1) ? `(?:${text})` : text;
        return this;
    }

    /**
     * @param {string} text
     * @returns {RegexBuilder}
     */
    matchSingleCharacterInside(text) {
        this._text += (text.length > 1) ? `[${text}]` : text;
        return this;
    }

    /**
     * @param {string} text
     * @returns {RegexBuilder}
     */
    matchSingleCharacterOutside(text) {
        this._text += `[^${text}]`;
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    startCapturing() {
        if(this._captureGroupStarted) {
            throw new TooManyCaptureGroupsError();
        }

        this._text += '(';
        this._captureGroupStarted = true;
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    stopCapturing() {
        if(!this._captureGroupStarted) {
            throw new CaptureGroupNotStartedError();
        }

        if(this._captureGroupEnded) {
            throw new TooManyCaptureGroupsError();
        }

        this._text += ')';
        this._captureGroupEnded = true;
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    anyNumberOfTimesGreedy() {
        this._text += '*';
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    anyNumberOfTimesLazy() {
        this._text += '*?';
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    atLeastOnceGreedy() {
        this._text += '+';
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    atLeastOnceLazy() {
        this._text += '+?';
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    neverOrOnceGreedy() {
        this._text += '?';
        return this;
    }

    /**
     * @returns {RegexBuilder}
     */
    neverOrOnceLazy() {
        this._text += '??';
        return this;
    }

    /**
     * @param {RegexFlag} flag
     * @returns {RegexBuilder}
     */
    addFlag(flag) {
        this._flags.add(flag);
        return this;
    }

    // This returns a custom regex class
    /**
     * @returns {Regex}
     */
    build() {
        return new Regex(this._text, this._flags);
    }
}
