const async = require('async');
const Slot = require('../../utils/db').Slot;
const Event = require('../../utils/db').Event;
const validator = require('../../utils/validate')

module.exports.add = function (data, _cb) {

  async.auto({
    validate_inputs: (cb) => {
      if (validator().validate(data)) {

        return _cb({
          code: 'INVALID_INPUT',
          message: validator().errorsText()
        })
      }

      return cb(null)
    },
    check_if_event_already_exist_at_the_time_date_specified: ['validate_inputs', (result, cb) => {
      let date = data.date
      let time = data.time

      Event
        .where('date', '==', date)
        .where('time', '==', time)
        .get()
        .then((event) => {
          if (!event.empty) {
            return _cb(null, { code: 'EVENT_ALREADY_EXIST', message: `An event already exist at ${time} on ${date}` })
          }

          return cb(null)
        })
        .catch(err => {
          return cb({ code: 'CHECK_EVENT_EXIST_ERROR', message: err })
        });
    }],
    create_new_event: ['check_if_event_already_exist_at_the_time_date_specified', (result, cb) => {
      Event
        .add({
          title: data.title,
          time: data.time,
          date: data.date,
          subject: data.subject,
          duration: data.duration,
        })
        .then((event) => {
          return cb(null, { event: event.id })
        })
        .catch(err => {
          console.log(err)
          return cb({ code: 'EVENT__INSERT_ERROR', message: err })
        });
    }],
    book_slot_for_the_event: ['create_new_event', (result, cb) => {

      Slot
        .add({
          date: data.date,
          time: data.time,
          duration: data.duration,
        })
        .then((slot) => {
          return cb(null)
        })
        .catch(err => {
          return cb({ code: 'SLOT__INSERT_ERROR', message: err })
        })
    }]
  }, function (error, results) {

    if (error) {
      return _cb({ code: 'CREATE_EVENT_ERROR', message: error })
    }

    return _cb(null, { code: 'CREATE_EVENT_SUCCESS', result: results.create_new_event.event })
  })
}

module.exports.list = function (data, cb) {
  let start_date = data.start_date
  let end_date = data.end_date

  Event
    .where('date', '>=', start_date)
    .where('date', '<=', end_date)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        let events = []
        docs.forEach(doc => events.push(doc.data()))

        return cb(null, { code: 'LIST_EVENT_FETCHED', data: events })
      }

      return cb(null, { code: 'EVENT__NO_ENTRIES_FOUND' })
    })
    .catch((err) => {

      return cb({ cb: 'EVENT__LIST_ERROR' })
    });
}