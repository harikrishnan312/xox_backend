const express = require('express');
const controller = require('../controller/xoxController')

const userRoute = express();

userRoute.get('/', controller.test);
userRoute.post('/create_game', controller.createGame);
userRoute.get('/last_game',controller.lastGame)

module.exports = userRoute;