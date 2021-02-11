const post_order = require('../postOrder')

const spreadStealer = async () => {
    try {
        await post_order(8,20)
    } catch (error) {
        console.error(error)
    }
}

spreadStealer();
