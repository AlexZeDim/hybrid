const robot = require("robotjs");
const { sleep, orderPrice } = require('./getters');

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
        robot.setMouseDelay(5);

        /** Mouse on quantity */
        robot.moveMouseSmooth(250, 300);
        robot.mouseClick()
        robot.keyTap("backspace");
        robot.typeStringDelayed(quantity, 600)

        /** Mouse on gold */
        robot.moveMouseSmooth(200, 350);
        robot.mouseClick()
        robot.keyTap("backspace");
        if (gold) robot.typeStringDelayed(gold, 600)

        /** Mouse on silver */
        robot.moveMouseSmooth(280, 350);
        robot.mouseClick()
        robot.keyTap("backspace");
        if (silver) robot.typeStringDelayed(silver, 600)

        /** Post Order */
        robot.moveMouseSmooth(220, 520);
        robot.mouseClick()
    } catch (error) {
        console.error(error)
    }
}

postOrder(9999999, 1)

