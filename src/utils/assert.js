export default function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assert error")
  }
}

/**
 * @param {string} message
 * @param {Error} base
 * @throws {Error}
 */
assert.fail = function (message, base) {
  // if (!base) {
  //   base = Error
  // }

  throw new Error(message)
}
