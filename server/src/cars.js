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
                        .catch(err => {
                            console.error(err)
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

const readAll = (db) => async (req, res) => {
    const cars = await db.raw("SELECT * FROM cars ORDER BY RANDOM()")
    console.log(cars.rows)
    res.status(200).json(cars.rows)
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

const update = (db) => (req, res) => {
    const { id } = req.params
    const { mileage: client_mileage } = req.body
    const clientId = id

    if (!id) {
        res.status(403).json('id is missing')
    }

    db('cars')
        .where({ id: clientId })
        .update({
            mileage: client_mileage,
            date_of_last_update: new Date().toISOString()

        })
        .returning('*')
        .then(updated_row => {
            res.json(uptaded_row[0])
        })
        .catch(err => {
            res.status(404).json('something went wrong or wrong id')
        })


}

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

}



