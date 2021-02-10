const robot = require("robotjs");
const { sleep } = require('./getters');

(async function rotate () {
    try {
        //350 ms for 90
        await sleep(2500)
        robot.keyToggle('right', 'down')
        await sleep(850)
        robot.keyToggle('right', 'up')
        robot.keyToggle('w', 'down')
        await sleep(5750)
        robot.keyToggle('w', 'up')
        console.log('end')
    } catch (e) {
        console.error(e)
    }
})()
