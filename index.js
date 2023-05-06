const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
//const user = require('./models/user')

mongoose.connect('mongodb://0.0.0.0:27017/shopsparks', { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log("Mongo Connection open")
    })
    .catch(err => {
        console.log("Error")
        console.log(err)
    })

const app = express()

const sessionConfig = {
    name: 'SeSsion',
    secret: 'randomsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, //It means that the cookie can only be accessed through https. WE use this in production
        expires: Date.now() + 604800000, // Date.now() shows the date in milliseconds..so we do the req calculations. (1000*60*60*24*7)
        maxAge: 604800000
    }


}
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.post('/registerUser', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        await user.save()

        console.log(registeredUser)

        res.redirect('http://localhost:3000/login')


    } catch (e) {
        //req.flash('error', e.message)

        res.redirect('http://localhost:3000/register')
        console.log(e)
    }

})

app.post('/loginUser', passport.authenticate('local', { failureRedirect: 'http://localhost:3000/login', keepSessionInfo: true }), async (req, res) => {

    const redirectUrl = 'http://localhost:3000/products'
    // res.json(req.isAuthenticated())


    res.redirect(redirectUrl)



})

app.get('/logout', (req, res, next) => {
    req.logout(err => {
        res.redirect('/products')
    })
})




app.listen(5000, () => console.log('Server reading on port 5000'))

