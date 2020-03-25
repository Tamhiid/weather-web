const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()
const port = process.env.PORT || 3000
// Paths for express
app.use(express.static(path.join(__dirname, './public')))
const viewPath = path.join(__dirname, './Templates/views')
const partialPath = path.join(__dirname, './Templates/partials')


app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.get('/',(req,res)=>{
    res.render('index', {
        title : 'Weather App',
        name : "Search a weather",
        footer : "Copyright Abdinasir Tamhiid"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About page",
        name : "Tamhiid",
        footer : "Copyright Abdinasir Tamhiid"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name : 'Abdinasir Tamhiid',
        footer : "Copyright Abdinasir Tamhiid"
    })
})



app.get('/weather', (req,res)=>{
    if(!req.query.address){
        res.send({
            error : "You must search a term"
        })
    }
    else{
        geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
            if(error){
              return  res.send({error})
            }
            forecast(latitude,longitude, (error, forecastData)=>{
                if(error){
                  return  res.send({error})
                }
                res.send({
                    forecat : forecastData,
                    location,
                    address : req.query.address
                })
            })
        })
    }
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg : '404 Page Not Found!',
        footer : "Copyright Abdinasir Tamhiid"
    })
})

app.listen(port,()=>{
    console.log('App listeing on port ' + port)
})