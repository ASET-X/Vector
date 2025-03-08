import assert from "./utils/assert.js"
import { assert2DVector } from "./utils/assertVector.js"
import {
  is2DVectorLike,
  isArray,
  isEmpty,
  isNumber,
} from "./utils/types.js"

function ok(x, y) {
  return (isNumber(x) && isNumber(y))
}

function undef(x, y) {
  return (isEmpty(x) && isEmpty(y))
}

export default class Vector2 {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    assert(ok(x, y) || undef(x, y), "x and y must be a number.")

    this.x = x || 0;
    this.y = y || 0;
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  /**
   * @param {number | Vector2} value
   */
  set(value) {
    if (is2DVectorLike(value)) {
      this.x = value.x;
      this.y = value.y;
    }

    this.x = this.y = value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  add(value) {
    if (is2DVectorLike(value)) {
      this.x += value.x;
      this.y += value.y;
    }

    this.x += value || 0;
    this.y += value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  subtract(value) {
    if (is2DVectorLike(value)) {
      this.x -= value.x;
      this.y -= value.y;
    }

    this.x -= value || 0;
    this.y -= value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  multiply(value) {
    if (is2DVectorLike(value)) {
      this.x *= value.x;
      this.y *= value.y;
    }

    this.x *= value || 0;
    this.y *= value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  divide(value) {
    if (is2DVectorLike(value)) {
      this.x /= value.x;
      this.y /= value.y;
    }

    assert(value !== 0, "Vector.divide(); Argument is a `zero` value")

    this.x /= value || 1;
    this.y /= value || 1;
    return this
  }

  /**
   * @returns `0 - PI*2`
   */
  heading() { return Math.atan2(this.y, this.x) }

  /**
   * @param {number} radians `0 - PI*2`
   */
  setHeading(radians) {
    var m = this.mag();
    this.x = m * Math.cos(radians);
    this.y = m * Math.sin(radians);
  }

  /**
   * @param {number} radians `0 - PI*2`
   */
  rotate(radians) {
    return this.setHeading(radians + this.heading())
  }

  abs() {
    if (this.x < 0) this.x *= -1;
    if (this.y < 0) this.y *= -1;
    return this
  }

  /**
   * @param {Vector2} vector
   */
  dot(vector) {
    assert2DVector(vector)
    return ((this.x * vector.x) + (this.y * vector.y));
  }

  normalize() {
    var magnitude = this.mag()
    if (magnitude !== 0) this.divide(magnitude)
    return this
  }

  /**
   * @param {Vector2} vector
   */
  equals(vector) {
    assert2DVector(vector)
    return (
      (this.x === vector.x) &&
      (this.y === vector.y)
    )
  }

  clone() { return new Vector2(this.x, this.y) }
  magSq() { return ((this.x ** 2) + (this.y ** 2)) }
  mag() { return Math.sqrt(this.magSq()) }
  magnitude() { return Math.sqrt(this.magSq(this)) }
  negative() { return this.multiply(-1) }
  isOK() { return ok(this.x, this.y) }

  toString() { return `[Vector2 ${x},${y}]` }
  toJSON() { return { x: this.x, y: this.y, } }
  toArray() { return [this.x, this.y,] }

  /**
   * @param { number | [number, number] | { x: number, y: number } } target
   * @return {Vector2}
   */
  static from(target) {
    if (is2DVectorLike(target)) {
      return new this(target.x, target.y)
    }
    if (isArray(target)) {
      return new this(target[0], target[1])
    }
    if (isNumber(target)) {
      return new this(target, target)
    }
    assert.fail(
      "Unexpected type target." +
      "Argument must be array or Vector like object."
    )
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  static of(x, y) {
    assert(isNumber(x), "X and Y must be a number.")
    if (!isNumber(y)) y = x;
    return new this(x, y)
  }

  /**
   * @param {Vector2} A
   * @param {Vector2} B
   */
  static dot(A, B) {
    assert2DVector(A)
    assert2DVector(B)

    return ((A.x * B.x) + (A.y * B.y))
  }

  /**
   * @param {Vector2} A
   * @param {Vector2} B
   */
  static lerp(A, B, fraction) {
    return this.from(B).subtract(A).multiply(fraction).add(A)
  }

  /**
   * @param {Vector2} A
   * @param {Vector2} B
   */
  static distance(A, B) {
    assert2DVector(A)
    assert2DVector(B)
    return Math.sqrt(((B.x - A.x) ** 2) + ((B.y - A.y) ** 2))
  }

  /**
   * @param {Vector2} A
   * @param {Vector2} B
   */
  static equals(A, B) {
    assert2DVector(A)
    assert2DVector(B)
    return (
      (A.x === B.x) &&
      (A.y === B.y)
    )

  }

  /**
   * @param {Vector2} A
   * @param {...Vector2} vectors
   */
  static min(A, ...vectors) {
    assert2DVector(A, "The first argument must be a Vector")
    const vec = this.from(A)

    for (const vector of vectors) {
      assert2DVector(vector)
      if (vec.x > vector.x) vec.x = vector.x
      if (vec.y > vector.y) vec.y = vector.y
    }
    return vec
  }

  /**
   * @param {Vector2} A
   * @param {...Vector2} vectors
   */
  static max(A, ...vectors) {
    assert2DVector(A, "The first argument must be a Vector")
    const vec = this.from(A)

    for (const vector of vectors) {
      assert2DVector(vector)
      if (vec.x < vector.x) vec.x = vector.x
      if (vec.y < vector.y) vec.y = vector.y
    }
    return vec
  }

  static zero() { return new this(0, 0) }
  static one() { return new this(1, 1) }
  static neg() { return new this(-1, -1) }

  static left() { return new this(-1, 0) }
  static forward() { return new this(0, -1) }
  static right() { return new this(1, 0) }
  static back() { return new this(0, 1) }
}
