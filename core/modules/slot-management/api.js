const async = require('async');
const Slot = require('../../utils/db').Slot;
const systemConfig = require('../../config')
const { arrayToObject, generateSlots, filterBookedSlots } = require('../../utils/helper')

module.exports.list = function (data, _cb) {

  async.auto({
    list_booked_slots_for_the_day: (cb) => {
      let date = data.date

      Slot
        .where('date', '==', date)
        .get()
        .then((docs) => {
          if (!docs.empty) {
            let slots = []
            docs.forEach(doc => slots.push(doc.data()))

            return cb(null, { booked_slots: slots })
          }

          return cb(null, { code: 'NO_BOOKED_SLOTS_FOR_THE_DAY', booked_slots: [] })
        })
        .catch((err) => {
          console.log(err)
          return cb({ cb: 'SLOT__LIST_ERROR', message: err })
        });
    },
    generate_free_slots_for_the_day: ['list_booked_slots_for_the_day', (result, cb) => {
      let booked_slots = result.list_booked_slots_for_the_day.booked_slots
      let booked_slots_by_booked_time = arrayToObject(booked_slots, 'time');

      generateSlots(systemConfig, (err, time_slots) => {
        let free_slots = filterBookedSlots(time_slots, Object.keys(booked_slots_by_booked_time))

        return cb(null, { free_slots: free_slots })
      })
    }]
  }, function (error, results) {
    if (error) {
      return _cb({ code: 'LIST_SLOT_ERROR', message: error })
    }

    return _cb(null, {
      code: 'LIST_SLOT_SUCCESS',
      data: {
        free_slots: results.generate_free_slots_for_the_day.free_slots,
        date: data.date
      }
    })
  })
}


