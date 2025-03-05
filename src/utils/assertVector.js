import assert from "./assert.js"
import { is2DVectorLike, is3DVectorLike } from "./types.js"

export function assert3DVector(value, message) {
  assert(is3DVectorLike(value), message || "The argument must be a Vector like object {x, y, z}.")
}

export function assert2DVector(value, message) {
  assert(is2DVectorLike(value), message || "The argument must be a Vector like object {x, y}.")
}
