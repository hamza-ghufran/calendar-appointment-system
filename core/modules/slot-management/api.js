const async = require('async');
const Slot = require('../../utils/db').Slot;
const systemConfig = require('../../config')
const { arrayToObject, generateSlots, filterBookedSlots } = require('../../utils/helper')

module.exports.list = function (data, _cb) {
  systemConfig.duration = data.duration;

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
    generate_slots_by_duration_for_the_day: ['list_booked_slots_for_the_day', (result, cb) => {
      generateSlots(systemConfig)
        .then((free_slots) => {
          return cb(null, { free_slots: free_slots })
        })
    }],
    filter_booked_slots: ['generate_slots_by_duration_for_the_day', (result, cb) => {
      let free_slots = result.generate_slots_by_duration_for_the_day.free_slots
      let booked_slots = result.list_booked_slots_for_the_day.booked_slots

      let final_slot_list = filterBookedSlots(free_slots, booked_slots)

      final_slot_list = arrayToObject(final_slot_list, 'from')

      return cb(null, { free_slots: Object.keys(final_slot_list) })
    }]
  }, function (error, results) {
    if (error) {
      return _cb({ code: 'LIST_SLOT_ERROR', message: error })
    }

    return _cb(null, {
      code: 'LIST_SLOT_SUCCESS',
      data: {
        free_slots: results.filter_booked_slots.free_slots,
        date: data.date
      }
    })
  })
}