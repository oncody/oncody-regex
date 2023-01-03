import RegexFlags from "./regex-flags.js";
import Regex from "./regex.js";
import TooManyCaptureGroupsError from "./too-many-capture-groups-error.js";
import CaptureGroupNotStartedError from "./capture-group-not-started-error.js";

// This is used to construct a human-readable regex
export default class RegexBuilder {
    constructor() {
        this._text = '';
        this._flags = new RegexFlags();
        this._captureGroupStarted = false;
        this._captureGroupEnded = false;
    }

    match(text) {
        this._text += (text.length > 1) ? `(?:${text})` : text;
        return this;
    }

    matchSingleCharacterInside(text) {
        this._text += (text.length > 1) ? `[${text}]` : text;
        return this;
    }

    matchSingleCharacterOutside(text) {
        this._text += `[^${text}]`;
        return this;
    }

    startCapturing() {
        if(this._captureGroupStarted) {
            throw new TooManyCaptureGroupsError();
        }

        this._text += '(';
        this._captureGroupStarted = true;
        return this;
    }

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

    anyNumberOfTimesGreedy() {
        this._text += '*';
        return this;
    }

    anyNumberOfTimesLazy() {
        this._text += '*?';
        return this;
    }

    atLeastOnceGreedy() {
        this._text += '+';
        return this;
    }

    atLeastOnceLazy() {
        this._text += '+?';
        return this;
    }

    neverOrOnceGreedy() {
        this._text += '?';
        return this;
    }

    neverOrOnceLazy() {
        this._text += '??';
        return this;
    }

    addFlag(flag) {
        this._flags.add(flag);
        return this;
    }

    // This returns a custom regex class
    build() {
        return new Regex(this._text, this._flags);
    }
}
