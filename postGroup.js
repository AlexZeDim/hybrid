const { sleep, random } = require('./module/getters');
const robot = require("robotjs");

const postGroup = async () => {
  try {
    const from = 1.75
    const to = 0.035
    await sleep(3000)
    robot.keyTap("I")
    await sleep(random(from, to))
    robot.moveMouse(405, 265);
    robot.mouseClick()
    await sleep(random(from, to))
    robot.moveMouse(310, 530);
    robot.mouseClick()
    /** Form Group */
    robot.moveMouse(325, 325);
    robot.mouseClick()
    await sleep(random(from, to))
    robot.typeString("Cocok")

    robot.moveMouse(400, 400);
    robot.mouseClick()
    await sleep(random(from, to))
    robot.typeString("Cocok welcomes you!")

    await sleep(random(from, to))
    robot.moveMouse(505, 530);
    robot.mouseClick()
  } catch (e) {
    console.error(e)
  }
}

postGroup();
