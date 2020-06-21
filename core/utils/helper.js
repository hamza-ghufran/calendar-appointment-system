module.exports = {
  arrayToObject: (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {}),
  filterBookedSlots: (generated_slots, booked_slots, interval) => {
    if (!booked_slots.length) return generated_slots
    let final_slots = []

    generated_slots.forEach(element => {
      booked_slots.forEach(slot => {

        if (slot.split(':')[0] == element.split(':')[0]) {
          if (Math.abs(slot.split(':')[1] - element.split(':')[1]) < interval) return
          final_slots.push(element)
        }

        else final_slots.push(element)
      })
    });
    return final_slots
  },
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

      while (start_time <= end_time) {
        start_time = addMinutes(start_time, duration)
        timeslots.push(start_time);
      }

      timeslots.pop()
      return cb(null, timeslots)
    }, 0)
  },
}