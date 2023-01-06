export default class CaptureGroupNotStartedError extends Error {

    /**
     * @param {string} message
     * @returns {CaptureGroupNotStartedError}
     */
    constructor(message) {
        super(message);
        this.name = 'CaptureGroupNotStartedError';
    }
}