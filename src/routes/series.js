const express = require('express');
const router = express.Router();

const get_series_controller =  require('../controllers/get_series');
const updates = require('../controllers/updates');
const validator = require('./validator');

router.get('/get/series', get_series_controller.getSerieCover);
router.post('/get/serie', validator.validator, get_series_controller.getSerie);
router.post('/get/language', validator.validator, get_series_controller.getLanguage);
router.post('/get/season', validator.validator, get_series_controller.getSeason);
router.post('/get/chapter', validator.validator, get_series_controller.getChapter);
router.post('/get/search', validator.validator, get_series_controller.search);
router.post('/get/viewing', validator.validator, get_series_controller.getViewing);

router.post('/update/serie/views', validator.validator, updates.views);
router.post('/update/serie/viewing', validator.validator, updates.viewing);

module.exports = router;