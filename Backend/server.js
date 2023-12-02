// "start":"node --watch server.js"
// create nodejs server 
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX');
const app=express()
app.use(express.json())
app.use(cors())
//http://localhost:1000
app.get('/',(req,res)=>{
    
    res.send({"message":"hello from server"})
})
//http://localhost:1000/payment
app.post('/payment',async (req,res)=>{
    //stripe payment 
    // console.log(req.body)
    let {cartItems,userEmail,shippingAddress,description,totalAmount}=req.body
    const paymentIntent=await stripe.paymentIntents.create({
        amount:totalAmount,
        currency:"usd",
        automatic_payment_methods:{enabled:true},
        description:description,
        shipping:{
            address:{
                line1:shippingAddress.line1,
                line2:shippingAddress.line2,
                city:shippingAddress.city,
                state:shippingAddress.state,
                country:shippingAddress.country,
                postal_code:shippingAddress.postal_code
            },
            name:shippingAddress.name,
            phone:shippingAddress.mobile
        }
    })
    res.send({clientSecret:paymentIntent.client_secret})
})
const PORT=1000
app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})