/** @return {value is unknown} */
export function isDefined(value) {
  return (value != null)
}

/** @return {value is void | null} */
export function isEmpty(value) {
  return (value == null)
}

/** @return {value is number} */
export function isNumber(value) {
  return ((typeof value) === "number") && isFinite(value)
}

/** @type {(value: unknown) => value is Array<unknown>} */
export const isArray = Array.isArray || ((value) => (value instanceof Array));

/** @return { value is { x: number, y: number, } } */
export function is2DVectorLike(value) {
  return (
    isDefined(value) &&
    isNumber(value.x) &&
    isNumber(value.y)
  )
}

/** @return { value is { x: number, y: number, z: number, } } */
export function is3DVectorLike(value) {
  return (
    isDefined(value) &&
    isNumber(value.x) &&
    isNumber(value.y) &&
    isNumber(value.z)
  )
}
