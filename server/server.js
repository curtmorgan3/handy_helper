require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT;


const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({msg: "Index Page"});
});

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
