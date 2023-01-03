import RegexBuilder from "../src/regex-builder.js";
import TooManyCaptureGroupsError from "../src/too-many-capture-groups-error.js";
import CaptureGroupNotStartedError from "../src/capture-group-not-started-error.js";
import RegexCharacter from "../src/regex-character.js";

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

test('Match single character inside happy path', () => {
    let text = "abc";
    let regex = new RegexBuilder().matchSingleCharacterInside('cde').build();
    expect(regex.firstMatch(text).text()).toBe('c');
});

test('Match single character outside happy path', () => {
    let text = "abc";
    let regex = new RegexBuilder().matchSingleCharacterOutside('ab').build();
    expect(regex.firstMatch(text).text()).toBe('c');
});

test('Any number of times greedy happy path', () => {
    let text = "'abc'def'ghi'jkl'";
    let regex = new RegexBuilder().match("'").match(RegexCharacter.WILDCARD).anyNumberOfTimesGreedy().match("'").build();
    expect(regex.firstMatch(text).text()).toBe(text);
});

test('Any number of times lazy happy path', () => {
    let text = "'abc'def'ghi'jkl'";
    let regex = new RegexBuilder().match("'").match(RegexCharacter.WILDCARD).anyNumberOfTimesLazy().match("'").build();
    expect(regex.firstMatch(text).text()).toBe("'abc'");
});

test('At least once greedy happy path', () => {
    let text = "'abc'def'ghi'jkl'";
    let regex = new RegexBuilder().match("'").match(RegexCharacter.WILDCARD).atLeastOnceGreedy().match("'").build();
    expect(regex.firstMatch(text).text()).toBe(text);
});

test('At least once lazy happy path', () => {
    let text = "'abc'def'ghi'jkl'";
    let regex = new RegexBuilder().match("'").match(RegexCharacter.WILDCARD).atLeastOnceLazy().match("'").build();
    expect(regex.firstMatch(text).text()).toBe("'abc'");
});

test('Any number of times Greedy 0 happy path', () => {
    let text = "''";
    let regex = new RegexBuilder().match("'").match(RegexCharacter.WILDCARD).anyNumberOfTimesGreedy().match("'").build();
    expect(regex.firstMatch(text).text()).toBe("''");
});

test('Any number of times Lazy 0 happy path', () => {
    let text = "''";
    let regex = new RegexBuilder().match("'").match(RegexCharacter.WILDCARD).anyNumberOfTimesLazy().match("'").build();
    expect(regex.firstMatch(text).text()).toBe("''");
});

test('Never or once greedy happy path', () => {
    let text = "abc";
    let regex = new RegexBuilder().match("a").match(RegexCharacter.WILDCARD).neverOrOnceGreedy().match("c").build();
    expect(regex.firstMatch(text).text()).toBe(text);
});

test('Never or once greedy happy path', () => {
    let text = "abc";
    let regex = new RegexBuilder().match("a").match(RegexCharacter.WILDCARD).neverOrOnceLazy().match("c").build();
    expect(regex.firstMatch(text).text()).toBe(text);
});

test('Multiple matches happy path', () => {
    let text = "zabzdezfgzhi";
    let regex = new RegexBuilder().match("z").match(RegexCharacter.WILDCARD).build();
    let matches = regex.allMatches(text);
    expect(matches.length).toBe(4);
    expect(matches[0].text()).toBe('za');
    expect(matches[1].text()).toBe('zd');
    expect(matches[2].text()).toBe('zf');
    expect(matches[3].text()).toBe('zh');
});

test('Multiple matches capture groups happy path', () => {
    let text = "zabzdezfgzhi";
    let regex = new RegexBuilder().match("z").startCapturing().match(RegexCharacter.WILDCARD).stopCapturing().build();
    let matches = regex.allMatches(text);
    expect(matches.length).toBe(4);
    expect(matches[0].text()).toBe('a');
    expect(matches[1].text()).toBe('d');
    expect(matches[2].text()).toBe('f');
    expect(matches[3].text()).toBe('h');
});