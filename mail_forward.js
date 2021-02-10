const ks = require('node-key-sender');
const robot = require("robotjs");
const { sleep, random } = require('./module/getters');

const RuMap = {
  "й": 'q', "ц": 'w', "у": 'e', "к": 'r', "е": 't', "н": 'y', "г": 'u', "ш": 'i', "щ": 'o', "з": 'p', "х": '@18-@96-@98-@100-@101', "ъ": '@18-@96-@98-@101-@96',
  "ф": 'a', "ы": 's', "в": 'd', "а": 'f', "п": 'g', "р": 'h', "о": 'j', "л": 'k', "д": 'l', "ж": '@18-@96-@98-@99-@96', "э": "@18-@96-@98-@101-@99",
  "я": 'z', "ч": 'x', "с": 'c', "м": 'v', "и": 'b', "т": 'n', "ь": 'm', "б": '@18-@96-@98-@98-@101', "ю": '@18-@96-@98-@101-@100',
};

async function MailForward ({recipient, subject, context = 'Гнев Карателя Очка', repeat_times = 1}) {
  try {
    if (!recipient) return
    if (repeat_times < 1) return

    await ks.aggregateKeyboardLayout(RuMap);
    await sleep(3000)
    const from = 1.75
    const to = 0.035

    /**
    * Mouse on item X then click Macro
    * then offset mouse to grab 35px x
    * and mouse click
    */
    for (let y = 0; y < 13; y++) {
      for (let x = 2; x < 12; x++) {
        for (let q = 0; q < 20; q++) {
          console.log(570 + (x * 35), 615 - (y * 35), q)

          robot.setMouseDelay(random(from, to));
          robot.setKeyboardDelay(random(from, to))

          /** Mouse on recipient */
          robot.moveMouse(115, 150);
          robot.mouseClick()
          robot.keyTap("shift")
          await ks.sendText(recipient)

          /** Mouse on subject */
          robot.moveMouse(120, 180);
          robot.mouseClick()
          robot.keyTap("shift")
          await ks.sendText(subject)

          /** Mouse on context */
          robot.moveMouse(135, 260);
          robot.mouseClick()
          robot.keyTap("shift")
          await ks.sendText(context)

          if (q === 19) {
            robot.keyTap("escape")
            robot.keyTap("shift")
            await sleep(random(from, to))
            robot.moveMouse(700 - (x * 35), 580 - (y * 35));
            robot.mouseClick("right")
          } else {
            robot.keyTap("escape")
            robot.keyTap("shift")
            robot.moveMouse(700 - (x * 35), 580 - (y * 35));
            robot.keyTap("f1")
            await sleep(random(from, to))
            robot.moveMouse(700 - (x * 35) + (x * 35), 580 - (y * 35) - (y * 35));
            robot.mouseClick("right")
          }

          robot.moveMouse(225, 525);
          await sleep(random(1, 0.5))
          robot.mouseClick()
          await sleep(4050)
          robot.moveMouse(895, 245);
          await sleep(random(1, 0.5))
          robot.mouseClick()
          await sleep(random(1, 0.5))
        }
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    process.exit(0)
  }
}

MailForward({ recipient:'лакриель', subject: 'привет', context: 'фнужсеюена', repeat_times: 1})

