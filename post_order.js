const robot = require("robotjs");
const { sleep, orderPrice } = require('./module/getters');

const postOrder = async (price = 9999999, quantity = 1) => {
    let gold, silver;
    if (price > 10000000 || price < 0.01) {
        return
    } else {
        ({gold, silver} = orderPrice(price));
    }
    if (quantity > 5000 || quantity < 1) {
        return
    } else {
        quantity = quantity.toString()
    }
    await sleep(2500)
    try {
        robot.setMouseDelay(1);

        /** Mouse on quantity */
        robot.moveMouse(250, 300);
        robot.mouseClick()
        robot.keyTap("backspace");
        robot.typeString(quantity)

        /** Mouse on gold */
        robot.moveMouse(200, 350);
        robot.mouseClick()
        robot.keyTap("backspace");
        if (gold) robot.typeString(gold)

        /** Mouse on silver */
        robot.moveMouse(280, 350);
        robot.mouseClick()
        robot.keyTap("backspace");
        if (silver) robot.typeString(silver)

        /** Post Order */
        robot.moveMouse(220, 520);
        robot.mouseClick()
    } catch (error) {
        console.error(error)
    }
}

module.exports = postOrder;

