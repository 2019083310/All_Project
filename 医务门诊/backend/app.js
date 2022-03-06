const express = require('express')
const path = require('path')
const createError = require('http-errors')
const app = express()
const cors = require('cors')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: false
    }))
    // parse application/json
app.use(bodyParser.json())

const userRouter = require('./routes/users')
const adminRouter = require('./routes/admin')
const doctorRouter = require('./routes/doctor')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/doctor', doctorRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
})

app.listen(3000, () => {
    console.log('3000端口启动成功!')
})