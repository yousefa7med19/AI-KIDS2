
const express = require('express');

const {
  getCoursesForChild,
  getCourseById
} = require('../controllers/course.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/child/:childId', getCoursesForChild);
router.get('/:id', getCourseById);

module.exports = router;