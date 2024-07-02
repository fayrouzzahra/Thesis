const route =require('express').Router()
const {getOwner,register,login,updateOwner,getOwnerEmail, acceptBooking,markeAsPayed}=require('../Controllers/OwnerController')

// const autoriser = require('../Middelware/Owner')
route.get('/getOwner',getOwner)
route.get('/:email',getOwnerEmail)
route.post('/reg',register)
route.post("/log/:email",login)
route.put("/upd/:id",updateOwner)
route.put("/payed/:id",markeAsPayed)
route.get("/Booked/:id",acceptBooking)
module.exports=route