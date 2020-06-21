const moment = require('moment')

function addInterval(data) {
  let time_string = moment(data.time, "HH:mm")
  time_string = moment(time_string).add(data.duration, 'minutes');

  return moment(time_string).format('HH:mm')
}

module.exports = {
  arrayToObject: (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {}),
  filterBookedSlots: (generated_slots, booked_slots) => {
    let final_slot = []
    if (!booked_slots.length) return generated_slots

    booked_slots.forEach(slot => {
      let booked_slot_from = moment(slot.from, "HH:mm")
      let booked_slot_to = moment(slot.to, "HH:mm")

      generated_slots.forEach(element => {
        let flag = true
        let generated_slot_from = moment(element.from, "HH:mm")
        let generated_slot_to = moment(element.to, "HH:mm")


        if (booked_slot_from >= generated_slot_from) {
          if (booked_slot_from < generated_slot_to) {
            flag = false
          }
        }

        if (booked_slot_to >= generated_slot_from) {
          if (booked_slot_to <= generated_slot_to) {
            flag = false
          }
        }

        flag && final_slot.push(element)
      })
    })

    return final_slot
  },
  generateSlots: (data) => {
    let { start_time, end_time, duration } = data
    let slot_array = []

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        while (start_time < end_time) {
          let to = addInterval({ time: start_time, duration: duration })
          slot_array.push({ from: start_time, to: to })
          start_time = to
        }

        resolve(slot_array)
      })
    }, 0)
  }
}
module.exports.addInterval = addInterval