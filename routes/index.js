const express = require('express');
const logger = require('../lib/logger');
const userRouter = require('./users');
const authRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);
router.use('/auths', authRouter);

module.exports = router;
