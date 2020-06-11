const system_config = require('../config');

function eventValidator() {
  let { start_time, end_time, duration } = system_config
  let flag = false

  return ({
    validate: (data) => {
      let slot_hour = data.time.split(':')[0]
      let slot_minute = data.time.split(':')[1]
      
      if (slot_hour < start_time.split(':')[0] || slot_hour > end_time.split(':')[0]) {
        this.invalid_time = `Please Provide with a time value range between ${start_time}-${end_time}`
        flag = true
      }
      if (slot_minute != duration) {
        if (slot_minute !== '00') {
          this.invalid_time_slot = 'Please proved with a valid time slot'
          flag = true
        }
      }
      if (data.duration > duration || data.duration < duration) {
        this.invalid_duration = `Duration should not be more than ${duration} min`
        flag = true
      }

      return flag
    },
    errorsText: () => {
      return {
        Time: this.invalid_time,
        Slot: this.invalid_time_slot,
        Duration: this.invalid_duration,
      }
    }
  })
}

module.exports = eventValidator