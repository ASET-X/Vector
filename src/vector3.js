import assert from "./utils/assert.js"
import { assert3DVector } from "./utils/assertVector.js"
import {
  is3DVectorLike,
  isArray,
  isNumber,
  isUndefined,
} from "./utils/types.js"

function ok(x, y, z) {
  return (isNumber(x) && isNumber(y) && isNumber(z))
}

function undef(x, y, z) {
  return (isUndefined(x) && isUndefined(y) && isUndefined(z))
}

export default class Vector3 {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    assert(
      ok(x, y, z) || undef(x, y, z),
      "arguments X, Y and Z must be a numbers"
    )

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }

  /**
   * @param {number | Vector2} value
   */
  set(value) {
    if (is3DVectorLike(value)) {
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
    }

    this.x = this.y = this.z = value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  add(value) {
    if (is3DVectorLike(value)) {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
    }

    this.x += value || 0;
    this.y += value || 0;
    this.z += value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  subtract(value) {
    if (is3DVectorLike(value)) {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
    }

    this.x -= value || 0;
    this.y -= value || 0;
    this.z -= value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  multiply(value) {
    if (is3DVectorLike(value)) {
      this.x *= value.x;
      this.y *= value.y;
      this.z *= value.z;
    }

    this.x *= value || 0;
    this.y *= value || 0;
    this.z *= value || 0;
    return this
  }

  /**
   * @param {number | Vector2} value
   */
  divide(value) {
    if (is3DVectorLike(value)) {
      this.x /= value.x;
      this.y /= value.y;
      this.z /= value.z;
    }

    assert(value !== 0, "Vector.divide(); Argument is a `zero` value")

    this.x /= value || 1;
    this.y /= value || 1;
    this.z /= value || 1;
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

  abs() {
    if (this.x < 0) this.x *= -1;
    if (this.y < 0) this.y *= -1;
    if (this.z < 0) this.z *= -1;
    return this
  }

  /**
   * @param {Vector3} vector
   */
  dot(vector) {
    assert3DVector(vector)
    return (this.x * vector.x) + (this.y * vector.y) + (this.z * vector.z);
  }

  /**
   * @param {Vector3} vector
   */
  cross(vector) {
    assert3DVector(vector)
    this.x = (this.y * vector.z) - (this.z * vector.y);
    this.y = (this.z * vector.x) - (this.x * vector.z);
    this.z = (this.x * vector.y) - (this.y * vector.x);
    return this
  }

  normalize() {
    var magnitude = this.magnitude()
    if (magnitude !== 0) this.divide(magnitude)
    return this
  }

  /**
   * @param {Vector3} vector
   */
  equals(vector) {
    assert3DVector(vector)
    return (
      (this.x === vector.x) &&
      (this.y === vector.y) &&
      (this.z === vector.z)
    )
  }

  clone() { return new Vector3(...this) }
  magSq() { return ((this.x ** 2) + (this.y ** 2) + (this.z ** 2)) }
  mag() { return Math.sqrt(this.magSq()) }
  magnitude() { return Math.sqrt(this.magSq()) }
  negative() { return this.multiply(-1) }
  norm() { return this.normalize() }
  isOK() { return ok(this.x, this.y, this.z) }

  toString() { return `[Vector3 ${this.x},${this.y},${this.z}]` }
  toJSON() { return { x: this.x, y: this.y, z: this.z, } }
  toArray() { return [this.x, this.y, this.z,] }

  /**
   * @param  {number | [number, number] | { x: number, y: number, z: number }} target
   * @return {Vector3}
   */
  static from(target) {
    if (is3DVectorLike(target)) {
      return new this(target.x, target.y, target.z,)
    }
    if (isArray(target)) {
      return new this(target[0], target[1], target[2],)
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
   * @param {number} z
   */
  static of(x, y, z) {
    assert(isNumber(x), "X, Y and Z must be a number.")
    if (!isNumber(y)) y = x;
    if (!isNumber(z)) z = x;
    return new this(x, y, z)
  }

  /**
   * @param {Vector3} A
   * @param {Vector3} B
   */
  static dot(A, B) {
    assert3DVector(A)
    assert3DVector(B)
    return ((A.x * B.x) + (A.y * B.y) + (A.z * B.z))
  }

  /**
   * @param {Vector3} A
   * @param {Vector3} B
   * @param {number} fraction
   */
  static lerp(A, B, fraction) {
    return this.from(B).subtract(A).multiply(fraction).add(A)
  }

  /**
   * @param {Vector3} A
   * @param {Vector3} B
   */
  static distance(A, B) {
    assert3DVector(A)
    assert3DVector(B)
    return Math.sqrt(((B.x - A.x) ** 2) + ((B.y - A.y) ** 2) + ((B.z - A.z) ** 2))
  }

  /**
   * @param {Vector3} A
   * @param {Vector3} B
   */
  static equals(A, B) {
    assert3DVector(A)
    assert3DVector(B)
    return (
      (A.x === B.x) &&
      (A.y === B.y) &&
      (A.z === B.z)
    )
  }

  /**
   * @param  {...Vector3} vectors
   */
  static min(...vectors) {
    assert3DVector(vectors[0])
    const minVec = this.from(vectors[0])

    for (const vector of vectors) {
      assert3DVector(vector)
      if (minVec.x > vector.x) minVec.x = vector.x
      if (minVec.y > vector.y) minVec.y = vector.y
      if (minVec.z > vector.z) minVec.z = vector.z
    }
    return minVec
  }

  /**
   * @param  {...Vector3} vectors
   */
  static max(...vectors) {
    assert3DVector(vectors[0])
    const maxVec = this.from(vectors[0])

    for (const vector of vectors) {
      assert3DVector(vector)
      if (maxVec.x < vector.x) maxVec.x = vector.x
      if (maxVec.y < vector.y) maxVec.y = vector.y
      if (maxVec.z < vector.z) maxVec.z = vector.z
    }
    return maxVec
  }

  static zero() { return new this(0, 0, 0) }
  static one() { return new this(1, 1, 1) }
  static neg() { return new this(-1, -1, -1) }

  static left() { return new this(-1, 0, 0) }
  static forward() { return new this(0, -1, 0) }
  static right() { return new this(1, 0, 0) }
  static back() { return new this(0, 1, 0) }
  static up() { return new this(0, 0, -1) }
  static down() { return new this(0, 0, 1) }
}
