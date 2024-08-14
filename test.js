var robot = require("./index");

//test mouse
// robot.dragMouse(200, 100);
// robot.moveMouse(337, 645);
// robot.mouseClick("left", true);
// console.log(robot.getMousePos());

//test keyboard
robot.moveMouse(353, 327);
robot.mouseClick("left", true);
robot.typeString("sss");
robot.keyTap("enter");
robot.typeString("abcdefghijklmnopqrstuvwxyz");
robot.keyTap("enter");
