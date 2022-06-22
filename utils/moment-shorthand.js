const humanizedDiff = function (moment, someday, today) {
  const duration = moment.duration(today.diff(someday))
  return `${duration.get('day')}d, ${duration.get(
    'hour'
  )}hr, ${duration.get('minute')}min, ${duration.get(
    'second'
  )}s`
}

module.exports = {
  humanizedDiff,
}
