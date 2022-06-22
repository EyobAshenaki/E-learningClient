export const singleCharacter = (val) =>
  val.length === 1 || 'Only a single Character allowed'

export const singleWord = (val) =>
  val.split(' ').length === 1 || 'Only single word allowed'

export const required = (val) => !!val || 'This field is required'

export const numbers = (val) =>
  isFinite(val) || 'Only numeric values are allowed'

export const isInRange = (val, min, max) =>
  (val <= max && val >= min) || `Has to be from ${min} - ${max}`

export const isInTheFuture = (val, moment) =>
  moment(val).isAfter(moment()) || 'Has to be in the future'
