const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const cars = [];

app.post("/add", (req, res) => {
    const newCar = {
        id : cars.length + 1,
        ...req.body
    }
    cars.push(newCar);
    res.status(201).json({message: 'Car added successfully', car: cars});
})
app.get("/cars", (req, res) => {
    res.json(cars);
})
app.get("/cars/:id", (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if(car) {
        res.json(car);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
})

app.put('/update/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if(car) {
        const {name, model, year} = req.body;
        car.name = name || car.name;
        car.model = model || car.model;
        car.year = year || car.year;
        res.json({message: 'Car updated successfully', car});
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

app.delete('/delete/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if(car) {
        const index = cars.indexOf(car);
        cars.splice(index, 1);
        res.json({message: 'Car deleted successfully', cars});
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});