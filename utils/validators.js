export const singleCharacter = (val) =>
  val.length === 1 || 'Only a single Character allowed'

export const singleWord = (val) =>
  val.split(' ').length === 1 || 'Only single word allowed'
