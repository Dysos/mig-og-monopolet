const express = require('express');
const cors = require('cors');
const app = express();
const { validateDilemma, getAllDilemmas, createDilemma, newAnswer } = require('./routerController');

app.use(cors());
app.use(express.json());

const router = express.Router();
router.route('/dilemmas').get(getAllDilemmas).post(validateDilemma, createDilemma);
router.route('/answers').post(newAnswer);
app.use('/api/v1', router);

module.exports = app;
