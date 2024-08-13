var robot = require("..");
var screenSize;

describe("Screen", () => {
  it("Get screen size.", function () {
    expect((screenSize = robot.getScreenSize())).toBeTruthy();
    expect(screenSize.width !== undefined).toBeTruthy();
    expect(screenSize.height !== undefined).toBeTruthy();
  });
});
