const ks = require('node-key-sender');
const robot = require("robotjs");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const RuMap = {
    "й": 'q', "ц": 'w', "у": 'e', "к": 'r', "е": 't', "н": 'y', "г": 'u', "ш": 'i', "щ": 'o', "з": 'p', "х": '@18-@96-@98-@100-@101', "ъ": '@18-@96-@98-@101-@96',
    "ф": 'a', "ы": 's', "в": 'd', "а": 'f', "п": 'g', "р": 'h', "о": 'j', "л": 'k', "д": 'l', "ж": '@18-@96-@98-@99-@96', "э": "@18-@96-@98-@101-@99",
    "я": 'z', "ч": 'x', "с": 'c', "м": 'v', "и": 'b', "т": 'n', "ь": 'm', "б": '@18-@96-@98-@98-@101', "ю": '@18-@96-@98-@101-@100',
};

(async function query (query = 'Гнев Карателя Очка') {
    try {
        query = query.toLowerCase()
        ks.aggregateKeyboardLayout(RuMap);
        await sleep(2500)
        await ks.sendKey('enter');
        await ks.sendText(query);
        await ks.sendKey('enter');
/*        robot.setKeyboardDelay(1)
        robot.keyToggle(`alt`, 'down');
        robot.keyTap('numpad_0')
        robot.keyTap('numpad_1')
        robot.keyTap('numpad_5')
        robot.keyTap('numpad_1')
        robot.typeString("numpad_0, numpad_1");
        robot.keyToggle(`alt`, 'up');*/
    } catch (e) {
        console.error(e)
    }
})();
