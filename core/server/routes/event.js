const router = require("express").Router();
const Event = require('../../modules/event-management/api');
// Handle incoming requests to /Event

router.post("/list", (req, res, next) => {

  Event.list(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });

      return next()
    }

    res.status(200).json({ ...result })
  });
})

router.post("/add", (req, res, next) => {

  Event.add(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err
      });
      return next()
    }

    res.status(200).json({ campaign: result })
  })
});

module.exports = router;
