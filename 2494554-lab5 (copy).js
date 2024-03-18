const express = require('express');
const app = express ();
app.use(express.json());

let cars = [
    {"id": 1,
        "make": "T",
        "model": "c",
        "year": 2,
        "colour": "black",
        "engineType": "v6"
    }, {"id": 2,
    "make": "F",
    "model": "d",
    "year": 2,
    "colour": "blue",
    "engineType": "v7"
    }
]

const PORT = 3000; 

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });


app.get("/cars", (request, response) => {
    response.send(cars);
 });

 app.get("/cars/:carID", (request, response) => {
    const CarID = request.params.carID;
    const result = cars[CarID];
    response.send(result);
 });

 app.post("/cars/add", (request, response) => {
    const body = request.body;
    const size = Object.keys(cars).length+1;
    let obj = new Object;
    obj.id = size;
    obj.make = body.make;
    obj.model = body.model;
    obj.year = body.year;
    obj.colour = body.colour;
    obj.engineType= body.engineType;
    cars.push(obj);
    response.status(201).json(obj);
 });

// PUT request - Update an existing post
app.put('/cars/update/:id', (req, res) => {
    const car =
        cars.find(
            p =>
                p.id === parseInt(req.params.id)
        );
    if (!car) return res.status(404).send('Car not found.');
 
    car.make = req.body.make;
    car.model = req.body.model;
    car.year = req.body.year;
    car.colour = req.body.colour;
    car.engineType= req.body.engineType;

    res.json(car);
});

// PUT request - Update an existing post
app.put('/cars/update/:id/:spec', (req, res) => {
    const car =
        cars.find(
            p =>
                p.id === parseInt(req.params.id)
        );
    if (!car) return res.status(404).send('Car not found.');
 
    car.make = req.body.make;
    car.model = req.body.model;
    car.colour = req.body.colour;
    car.engineType= req.body.engineType;

    res.json(car);
});


// DELETE method to remove a car by ID
app.delete('/cars/delete/:id', (req, res) => {
    const cId = parseInt(req.params.id);
    const index = cars.findIndex(car=> car.id === cId);
 
    if (index !== -1) {
        const deletedCar = cars.splice(index, 1)[0];
        res.json({ message: 'Car deleted successfully', deletedCar });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});




