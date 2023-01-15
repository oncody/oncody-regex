class TooManyCaptureGroupsError extends Error {

    /**
     * @param {string} message
     * @returns {TooManyCaptureGroupsError}
     */
    constructor(message) {
        super(message);
        this.name = 'TooManyCaptureGroupsError';
    }
}

export {TooManyCaptureGroupsError}