const express = require('express');
const app = express ();
app.use(express.json());

let cars = [
    {"id": 1,
        "make": "T",
        "model": "c",
        "year": 2010,
        "color": "black",
        "engineType": "v6"
    }, 
    {"id": 2,
    "make": "F",
    "model": "d",
    "year": 2020,
    "color": "blue",
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

 app.get("/cars/:id", (request, response) => {
    let car =
        cars.find(
            p =>
                p.id === parseInt(request.params.id)
        );
    if (!car) return response.status(404).send('Car not found.');

    return response.json(car);
 });

 app.post("/cars/add", (request, response) => {
    const body = request.body;
    const size = Object.keys(cars).length+1;
    let obj = new Object;
    obj.id = size;
    obj.make = body.make;
    obj.model = body.model;
    obj.year = body.year;
    obj.color = body.color;
    obj.engineType= body.engineType;
    cars.push(obj);
    response.status(201).json(obj);
 });

// PUT request - Update an existing post
app.put('/cars/update/:id', (request, response) => {
    const car =
        cars.find(
            p =>
                p.id === parseInt(request.params.id)
        );
    if (!car) return res.status(404).send('Car not found.');
 
    car.make = request.body.make;
    car.model = request.body.model;
    car.year = request.body.year;
    car.color = request.body.color;
    car.engineType= request.body.engineType;

    response.json(car);
});


// DELETE method to remove a car by ID
app.delete('/cars/delete/:id', (request, response) => {
    const cId = parseInt(request.params.id);
    const index = cars.findIndex(car=> car.id === cId);
 
    if (index !== -1) {
        const deletedCar = cars.splice(index, 1)[0];
        response.json({ message: 'Car deleted successfully', deletedCar });
    } else {
        response.status(404).json({ message: 'Car not found' });
    }
});


// DELETE method to remove a by ID and specification
app.delete('/cars/delete/:id/:spec', (request, response) => {
    const cId = parseInt(request.params.id);
    let index = cars.findIndex(car=> car.id === cId);
    let spec = request.params.spec;
    cars[index][spec] = null;
    response.json(cars);
});



