const express= require('express');

const bodyParser = require('body-parser');

const app = express();

const authRoutes = require('../routes/auth');
const detailRoutes = require('../routes/details');
const medicineRoutes = require('../routes/medicine');
const patientlistRoutes = require('../routes/patientlist');
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4200"
  };

app.use(cors(corsOptions));

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res) {
    res.send("Welcome to Nodejs");
});

const ports = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Accept, X-Custom-Header, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use('/auth', authRoutes);
app.use('/details',detailRoutes);
app.use('/medicine',medicineRoutes);
app.use('/patientlist',patientlistRoutes);

app.listen(ports, () => console.log(`Listening on port ${ports}`))