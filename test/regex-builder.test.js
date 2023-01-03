import RegexBuilder from "../src/regex-builder.js";
import TooManyCaptureGroupsError from "../src/too-many-capture-groups-error.js";

test('basic test', () => {
    expect(1+2).toBe(3);
});

test('basic test', () => {
    let regex = new RegexBuilder().startCapture();

    expect(() => {
        regex.startCapture();
    }).toThrow(TooManyCaptureGroupsError);
});