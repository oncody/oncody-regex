export default class TooManyCaptureGroupsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TooManyCaptureGroupsError';
    }
}