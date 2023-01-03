export default class CaptureGroupNotStartedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CaptureGroupNotStartedError';
    }
}