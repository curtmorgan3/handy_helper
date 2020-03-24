require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// Imported Routers 
const { listingRouter } = require('./routes/listingRouter.js');
const { bookingRouter } = require('./routes/bookingRouter.js');
const { userRouter } = require('./routes/userRouter.js');


const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

// Funnel requests to appropriate router
app.use('/listings', listingRouter);
app.use('/bookings', bookingRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
	res.json({msg: "Index Page"});
});

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
