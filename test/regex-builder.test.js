import RegexBuilder from "../src/regex-builder.js";
import TooManyCaptureGroupsError from "../src/too-many-capture-groups-error.js";
import CaptureGroupNotStartedError from "../src/capture-group-not-started-error.js";

test('basic test', () => {
    expect(1+2).toBe(3);
});

test('Calling startCapturing twice throws too many capture groups error', () => {
    let regex = new RegexBuilder().startCapturing();

    expect(() => {
        regex.startCapturing();
    }).toThrow(TooManyCaptureGroupsError);
});

test('Calling stopCapturing before starting capture throws capture group not started error', () => {
    let regex = new RegexBuilder();

    expect(() => {
        regex.stopCapturing();
    }).toThrow(CaptureGroupNotStartedError);
});

test('Calling stopCapturing twice throws too many capture groups error', () => {
    let regex = new RegexBuilder().startCapturing().stopCapturing();

    expect(() => {
        regex.stopCapturing();
    }).toThrow(TooManyCaptureGroupsError);
});

test('Regex Builder Match Happy path', () => {
    let text = "abcdefgh";
    let pattern = "cde";
    let regex = new RegexBuilder().match(pattern).build();
    expect(regex.firstMatch(text).text()).toBe(pattern);
});

test('Regex Builder Capture Group Happy path', () => {
    let text = "abcdefgh";
    let pattern = "cde";
    let regex = new RegexBuilder().match('b').startCapturing().match(pattern).stopCapturing().match('f').build();
    expect(regex.firstMatch(text).text()).toBe(pattern);
});