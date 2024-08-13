var robot = require("..");
var os = require("os");
const test = require("tape");

describe("Keyboard", () => {
  it("Tap a key.", function () {
    expect(() => robot.keyTap("a")).not.toThrow();
    expect(() => robot.keyTap("a", "control")).not.toThrow();
    expect(() => robot.keyTap()).toThrowError(/Invalid number/);
  });

  // This it won't fail if there's an issue, but it will help you identify an issue if ran locally.
  it("Tap all keys.", function () {
    var chars = "abcdefghijklmnopqrstuvwxyz1234567890,./;'[]\\".split("");

    for (var x in chars) {
      expect(() => robot.keyTap(chars[x])).not.toThrow();
    }
  });

  // This it won't fail if there's an issue, but it will help you identify an issue if ran locally.
  it("Tap all numpad keys.", function () {
    var nums = "0123456789".split("");

    for (var x in nums) {
      if (os.platform() === "linux") {
        expect(() => robot.keyTap("numpad_" + nums[x])).toThrowError(/Invalid key code/);
      } else {
        expect(() => robot.keyTap("numpad_" + nums[x])).not.toThrow();
      }
    }
  });
});

test("Test Key Toggle.", function (t) {
  t.plan(4);
  expect(() => robot.keyToggle("a", "down")).not.toThrow();
  expect(() => robot.keyToggle("a", "up")).not.toThrow();
  t.throws(
    function () {
      t.ok(robot.keyToggle("ά", "down") === 1, "Successfully pressed ά.");
      t.ok(robot.keyToggle("ά", "up") === 1, "Successfully released ά.");
    },
    /Invalid key code specified./,
    "exception tapping ά."
  );

  t.throws(
    function () {
      t.ok(robot.keyToggle("嗨", "down") === 1, "Successfully pressed 嗨.");
      t.ok(robot.keyToggle("嗨", "up") === 1, "Successfully released 嗨.");
    },
    /Invalid key code specified./,
    "exception tapping 嗨."
  );
});

test("Type Ctrl+Shift+RightArrow.", function (t) {
  t.plan(2);

  var modifiers = [];
  modifiers.push("shift");
  modifiers.push("control");
  t.expect(robot.keyToggle("right", "down", modifiers)).not.toThrow();
  t.expect(robot.keyToggle("right", "up", modifiers)).not.toThrow();
});

test("Type a string.", function (t) {
  t.plan(2);
  t.expect(robot.typeString("Typed rάöち嗨ఝ 1")).not.toThrow();
  t.expect(robot.typeString()).not.toThrow();
});
