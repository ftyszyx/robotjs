var robot = require("./index");

//test mouse
// robot.dragMouse(200, 100);
robot.moveMouse(365, 416);
robot.mouseClick("left", true);
// console.log(robot.getMousePos());

//test keyboard
// robot.typeString("Hello World");
// robot.keyTap("enter");
// robot.keyTap("space", "control");
// robot.typeString("你好");
robot.typeKeyCodeStringInWin("124556asdjfkb");
