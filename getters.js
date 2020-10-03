/**
 * @param ms {number}
 * @returns {Promise<void>}
 */
exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param number {number}
 * @returns {{gold: string, silver: string}|{gold: string, silver: number}}
 */
exports.orderPrice = (number) => {
    const [gold, silver] = number.toFixed(2).split(".")
    if (gold && silver) {
        return {gold: gold, silver: silver}
    }
    if (gold) return {gold: gold, silver: 0}
}
