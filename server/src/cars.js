// optimizo fuksionin "func"

const create = (db) => async function (req, res) {
    const { make, model, mileage, color, transmission, fuel_type, vehicle_type, dealer_id, owner_id } = req.body;
    db.on('query', function (queryData) {
        console.log(queryData);
    });
    {
        await db.transaction(async trx => {
            trx('cars').insert({


                date_of_creation: new Date().toISOString()
                , date_of_last_update: new Date().toISOString()
                , make: make
                , model: model
                , mileage: mileage
                , color: color
                , transmission: transmission
                , fuel_type: fuel_type
                , vehicle_type: vehicle_type
                , dealer_id: dealer_id
                , owner_id: owner_id
            }).returning('*')
                .then(async ([car]) => {
                    await trx.select('dealers.*').from('cars').innerJoin('dealers', 'dealers.id', 'cars.dealer_id')
                        .where('cars.id', car.id)
                        .returning("*")
                        .then(([dealer]) => {
                            res.json({
                                dealer,
                                car,
                            })
                        })
                        .catch(async err => {
                            console.error(err)
                            await trx.rollback()
                            res.status(404).json('this dealer does not exist')
                        })

                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json('this car is missing something')
                })

                .then(await trx.commit)
                .catch(await trx.rollback)
        })

    }
}

const sortModel = (list) => {
    let finalCount = 0
    let finalList = []
    const audi = []
    let count1 = 0
    const bmw = []
    const bmwList = ['1', '2', '3', '4', '5', '6', '7', '8']
    let count2 = 0
    const mercedes = []
    let count3 = 0

    for (let x = 0; x < list.length; x++) {
        if (list[x].model[0] === 'A') {
            audi[count1++] = list[x].model
        } else if (bmwList.some(el => list[x].model.startsWith(el))) {
            bmw[count2++] = list[x].model
        } else {
            mercedes[count3++] = list[x].model
        }
    }
    // console.log(audi,mercedes,bmw)
    if (audi) {
        for (let x = 0; x < audi.length; x++) {

            let min = 999
            let index = 0;

            for (let y = x; y < audi.length; y++) {
                let numy = 0
                if (!Number.isInteger(audi[y])) {
                    numy = parseInt(audi[y][1])
                } else {
                    numy = audi[y]
                }

                if (numy <= min) {
                    min = numy;
                    index = y
                }
            }
            if (index !== x) {
                let num2 = audi[x]
                audi[x] = audi[index]
                audi[index] = num2
            }



        }

        finalList[finalCount++] = audi
    }
    if (bmw) {
        for (let x = 0; x < bmw.length; x++) {

            let min = 999
            let index = 0;

            for (let y = x; y < bmw.length; y++) {
                let numy = parseInt(bmw[y][0])

                if (numy <= min) {
                    min = numy;
                    index = y
                }
            }
            if (index !== x) {
                let num2 = bmw[x]
                bmw[x] = bmw[index]
                bmw[index] = num2
            }



        }
        finalList[finalCount++] = bmw
    }

    if (mercedes) {

        for (let y = 0; y < mercedes.length; y++) {
            let letter = mercedes[y][0]
            switch (letter) {
                case 'C':
                    if (y != 0) {
                        let car = mercedes[0]
                        mercedes[0] = mercedes[y]
                        mercedes[y] = car
                    }
                    break
                case 'S':
                    if (y != 2) {
                        let car = mercedes[2]
                        mercedes[2] = mercedes[y]
                        mercedes[y] = car
                    }
                    break
                case 'E':
                    if (y != 1) {
                        let car = mercedes[1]
                        mercedes[1] = mercedes[y]
                        mercedes[y] = car
                    }
            }

        }
        finalList[finalCount++] = mercedes
    }
    finalList = finalList.flat()
    const fList = []
    for (let x = 0; x < finalList.length; x++) {
        let obj = {}
        obj.model = finalList[x]
        obj.checked = false
        obj.id = x
        fList[x] = obj
    }
    return fList
}


const model = (db) => async (req, res) => {

    const { vehicleList } = req.query
    const list = []
    try {
        const models = await func2(db, vehicleList)
        if (models) {
            console.log(models, 'models for models')
            const finalModels = sortModel(models)
            console.log(finalModels, 'models')
            res.json(finalModels)
        } else {
            res.status(400).json('failed')
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}


const func = async (db, vehicle, model,limit,offset,id) => {

    let query = db("cars").join('dealers', 'cars.dealer_id', 'dealers.id')

    if (vehicle) {
        query = query.whereIn('make', vehicle);
    }

    if (model) {
        query = query.whereIn('model', model);
    }

    if (id) {
        query = query.orderBy("cars.owner_id", id);
    }

    const cars =await query.select("cars.*").limit(limit).offset(offset);

    return cars
}

const func2 = async (db, list) => {
    if (list) {
        return await db('cars')
            .select(db.raw('DISTINCT model'))
            .whereIn("make", list)

    }
    return await db('cars').select(db.raw('DISTINCT model'))


}

const readAllGuest = (db) => async (req, res) => {
    const { vehicle, model,limit,pageNumber } = req.query;
    const offset=(pageNumber-1)*limit

    console.log(limit)
        try {

        const cars = await func(db, vehicle, model,limit,offset)

        res.status(200).json(cars)
    } catch (err) {
        res.status(400).json("something went wrong")
    }
};

const make = (db) => async (req, res) => {
    try {
        const rows = await db('cars').select(db.raw("DISTINCT make"))
        if (!rows) {
            console.log('err')
        }
        res.json(rows)
    } catch (err) {
        res.status(400).json(err)
    }

}

const readAll = (db) => async (req, res) => {
    const { vehicle, model, id,limit,pageNumber } = req.query
    const offset=(pageNumber-1)*limit
    

    try {

        const cars = await func(db, vehicle, model, limit,offset,id)
        res.status(200).json(cars)
    } catch (err) {
        res.status(400).json("something went wrong")
    }
};

const read = (db) => (req, res) => {

    const { id } = req.params
    const clientId = id;

    db.where({
        id: clientId
    })
        .select('cars')
        .returning('*')
        .then(car => {
            res.json(car[0])
        })
        .catch(err => {
            res.status(404).json("car doesn't exist")
        })

}

const update = (db) => async (req, res) => {

    const { id, carId } = req.body;

    try {
        // Check if a car with carId exists
        const car = await db("cars").select("*").where("id", carId).first();

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Perform the update
        const result = await db("cars")
            .where("id", carId)
            .update("owner_id", id);

        if (result) {
            res.status(200).json("success");
        } else {
            res.status(400).json({ error: 'Update failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the owner_id' });
    }
};


const delet = (db) => (req, res) => {
    const { id: clientId } = req.params

    if (clientId) {
        res.status(403).json('id is missing')
    }

    db('cars').where({
        id: clientId
    }).del().then(user => {
        res.json('Car is now deleted')
    })
        .catch(err => {
            res.status(404).json('wrong id')
        })
}

module.exports = {
    createCar: create
    , readCar: read
    , updateCar: update
    , deleteCar: delet
    , readAll
    , readAllGuest
    , make
    , model

}



