const Jimp = require('jimp');
const { createWorker } = require('tesseract.js');
const captureImage = require('./captureImage');
const { sleep } = require('./module/getters');

(async function level2 () {
    try {
        await sleep(2500)
        /** Level2 quotes */
        //first row  x: 408, y: 211, w: 70, h: 20
        const L2 = await captureImage({ x: 405, y: 210, w: 400, h: 415 }).invert().write(`L2.png`).getBufferAsync(Jimp.MIME_PNG)

        const row = [
            {
                left: 2,
                top: 1,
                width: 70,
                height: 20,
            },
            {
                left: 2,
                top: 1 + (16 * 20),
                width: 70,
                height: 20,
            },
        ];

        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_char_whitelist: '0123456789',
        });
        const values = [];
        for (let i = 0; i < row.length; i++) {
            const { data: { text } } = await worker.recognize(L2, { rectangle: row[i] });
            values.push(parseInt(text));
        }
        console.log(values);
        await worker.terminate();

        console.log('end')
    } catch (e) {
        console.error(e)
    }
})()
