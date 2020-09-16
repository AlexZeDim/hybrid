const robot = require("robotjs");
const Jimp = require('jimp');
const { createWorker } = require('tesseract.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function captureImage({ x, y, w, h }) {
    const pic = robot.screen.capture(x, y, w, h)
    const width = pic.byteWidth / pic.bytesPerPixel // pic.width is sometimes wrong!
    const height = pic.height
    const image = new Jimp(width, height)
    let red, green, blue
    pic.image.forEach((byte, i) => {
        switch (i % 4) {
            case 0: return blue = byte
            case 1: return green = byte
            case 2: return red = byte
            case 3:
                image.bitmap.data[i - 3] = red
                image.bitmap.data[i - 2] = green
                image.bitmap.data[i - 1] = blue
                image.bitmap.data[i] = 255
        }
    })
    return image
}

(async function main () {
    try {
        await sleep(2500)
        let img = await captureImage({ x: 290, y: 270, w: 255, h: 20 }).invert().write('item.png').getBufferAsync(Jimp.MIME_PNG)
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('rus');
        await worker.initialize('rus');
        const { data: { text } } = await worker.recognize(img);
        console.log(text);
        await worker.terminate();
    } catch (e) {
        console.error(e)
    }
})()
