export const singleCharacter = (val) =>
  val.length === 1 || 'Only a single Character allowed'

export const singleWord = (val) =>
  val.split(' ').length === 1 || 'Only single word allowed'

export const required = (val) => !!val || 'Required'

export const numbers = (val) => /[0-9]*/.test(val) || 'Only digits allowed'