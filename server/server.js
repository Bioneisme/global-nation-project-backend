const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const RedisStore = require('connect-redis')(session);

const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-route')
const adminRoute = require('./routes/admin-route')
const courseRoute = require('./routes/course-route')

const {isAdmin, isAuth} = require('./middlewares/permissions-middleware')

require('dotenv').config()
require('./controllers/passport-controller')(passport)

const app = express()
const PORT = process.env.PORT

const redisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    logErrors: true,
}

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore(redisOptions),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1d
    }
}));

app.use(passport.initialize())
app.use(passport.session())

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(process.env.SERVER_URL))
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

app.use('/api', authRoute)
app.use('/api', courseRoute)
app.use('/api', isAuth, userRoute)
app.use('/api', isAdmin, adminRoute)

start().then()