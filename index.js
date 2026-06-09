const express = require("express")

const app = express()

app.use(express.json());

const cars = [
    {id:1,make:"toyota",model:"corolla",year:2026},
    {id:2, make:"honda", model:"civic", year:2025},
    {id:3, make:"ford", model:"mustang", year:2024},
    {id:4, make:"bmw", model:"x5", year:2026},
    {id:5, make:"audi", model:"a4", year:2023},
    {id:6, make:"mercedes", model:"c-class", year:2025},
    {id:7, make:"hyundai", model:"creta", year:2024},
    {id:8, make:"kia", model:"seltos", year:2026},
    {id:9, make:"tesla", model:"model 3", year:2025},
    {id:10, make:"nissan", model:"altima", year:2023},
    {id:11, make:"volkswagen", model:"tiguan", year:2024}
]

app.post("/cars/:id",(req,res)=>{
    const carId = parseInt(req.params.id)
    const updatedCardData = req.body
    const carToUpdate = cars.find((car)=>car.id === carId)
    if (!carToUpdate) {
        res.status(400).json({error:"Car not found"})
    } else{
        Object.assign(carToUpdate,updatedCardData)
        if (!updatedCardData.make || !updatedCardData.model || !updatedCardData.year) {
            res.status(400).json({error:"make , model and year is required to update"})
        } else {
            Object.assign(carToUpdate,updatedCardData)
            res.status(200).json({message:"Car data updated successfully : ",carToUpdate})
        }
    }
})

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

app.delete("/cars/:id",(req,res)=>{
    const carId = req.params.id
    const index = cars.findIndex((car)=>car.id == carId)
    if(index === -1) {
        res.status(404).json({error:"Car not found"})
    } else {
        cars.splice(index,1)
        res.status(200).json({message:"item deleted successfully!"})
    }
})

const PORT = 3009

app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT}`)
})