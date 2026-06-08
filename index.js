const express = require("express")

const app = express()

app.use(express.json());

const cars = [
    {id:1,make:"toyota",model:"corolla",year:2026}
]

app.get("/",(req,res)=>{
    res.send("Hello Express - updated")
})

app.post("/cars",(req,res)=>{
    const newCar = req.body;

    if (!newCar.make || !newCar.model || !newCar.year ) {
        res.status(400).json({error:"Make, model and year are required"})
    } else {
        cars.push(newCar)
        res.status(201).json({message:"Car added successfully",car:newCar})
    }
})

app.get("/cars",(req,res)=>{
    res.send(cars)
})

const PORT = 3005

app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT}`)
})