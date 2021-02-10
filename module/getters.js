/**
 * @param ms {number}
 * @returns {Promise<void>}
 */
exports.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param number {number}
 * @returns {{gold: string, silver: string}|{gold: string, silver: number}}
 */
exports.orderPrice = (number) => {
    const [gold, silver] = number.toFixed(2).split(".")
    if (gold && silver) return { gold: gold, silver: silver }
    if (gold) return {gold: gold, silver: 0}
}

/**
 * @param from {number}
 * @param to {number}
 * @returns {number}
 */
exports.random = (from, to) => {
    return parseFloat((Math.random() * (from - to) + to).toFixed(3)) * 1000
}
