const systemConfig = require('../config');

function eventValidator() {
  let { start_time, end_time, duration } = systemConfig
  let flag = false

  return ({
    validate: (data) => {
      let hour = data.time.split(':')[0]
      let minute = data.time.split(':')[1]

      if (hour < start_time.split(':')[0] || hour > end_time.split(':')[0]) {
        this.invalid_time = `Please Provide with a time value range between ${start_time}-${end_time}`
        flag = true
      }
      if (minute != duration) {
        if (minute !== '00') {
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