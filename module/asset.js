const Jimp = require('jimp');
const { createWorker } = require('tesseract.js');
const captureImage = require('../capture_image');
const { sleep } = require('./getters');

(async function asset () {
    try {
        await sleep(2500)
        /** StandardUI sell item recognition */
        const item_img = await captureImage({ x: 120, y: 220, w: 270, h: 30 }).invert().write('item.png').getBufferAsync(Jimp.MIME_PNG)
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('rus');
        await worker.initialize('rus');
        let { data: { text } } = await worker.recognize(item_img);
        console.log(text);
        await worker.terminate();
        /** TODO Make sure we need it */
        console.log('end')
    } catch (e) {
        console.error(e)
    }
})()
