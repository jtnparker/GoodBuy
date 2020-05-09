const controller = require('./controller');
const router = require('express').Router();

router
  .route('/api')
    .get(controller.getAll)

router
  .route('/api/:productID')
    .get(controller.getOne)

  router
    .route('/api/pref/:productID')
      .get(controller.getPreferences)
      .put(controller.updatePreferences)


module.exports = router;