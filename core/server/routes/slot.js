const router = require("express").Router();
const Slot = require('../../modules/slot-management/api');
// Handle incoming requests to /Slot

router.post("/list", (req, res, next) => {

  Slot.list(req.body, (err, result) => {
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

  Slot.add(req.body, (err, result) => {
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
