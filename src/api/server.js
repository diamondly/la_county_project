//express API server setup
const express = require('express');
const server = express();
const morgan = require('morgan'); //for HTTP logging
const cors = require('cors');
const dotenv = require('dotenv'); //to get environment variables
dotenv.config()
const config = require("config"); //getting configuration parameters when deployed
const deptRouter = require('./routes/deptRoute');
const parkingRouter = require('./routes/parkingRoute');
const employRouter = require('./routes/employRoute');
const keycardRouter = require('./routes/keycardRoute');

//Middleware setup
server.use(cors())
server.use(express.json())
server.use(morgan('dev'))
//server.use(morgan('tiny'));

//TODO: need to designate the default or home page later
server.get('/', (req, res) => {
    res.redirect('/dept/allDepts');
    res.redirect('/parking/allParking')
    res.redirect('/employees/allEmployees')
    res.redirect('/keycard/allKeycards')
})

//Dept & Parking routes, pointing to all their respective endpoints
server.use('/dept', deptRouter);
server.use('/parking', parkingRouter);
server.use('/employees', employRouter);
server.use('/keycard', keycardRouter)

//TODO: need to create one 404 page for page not found
server.use('*', (req, res, next) =>
  res.status(404).json({ error: 'page not found' })
)

const port = process.env.PORT || config.get('api.port')
server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${port}`);
});
