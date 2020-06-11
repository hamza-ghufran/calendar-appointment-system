module.exports = {
  arrayToObject: (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {}),
  generateSlots: (data, cb) => {
    function addMinutes(start_time, interval) {
      var date = new Date(new Date('01/01/2019 ' + start_time).getTime() + interval * 60000);
      var temp_time =
        ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
        ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes())

      return temp_time;
    }

    //asyncify
    setTimeout(() => {
      let { start_time, end_time, duration } = data
      let timeslots = [start_time]

      while (start_time != end_time) {
        start_time = addMinutes(start_time, duration)
        timeslots.push(start_time);
      }

      return cb(null, timeslots)
    }, 0)
  },
  filterBookedSlots: (array1, array2) => {
    return array1 = array1.filter(function (item) {
      return !array2.includes(item);
    })
  }
}