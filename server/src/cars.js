// optimizo fuksionin "func"

const create = (db) =>
  async function (req, res) {
    const {
      make,
      model,
      mileage,
      color,
      transmission,
      fuelType,
      vehicleType,
      id
    } = req.body.specs;
    db.on("query", function (queryData) {
    });
    // {

      db('users').select('*').where('id', id)
        .then(([res]) => {
          if (!res) {
            return res.json('You are not a dealer')
          }
        })
        .catch(err => {
          console.log(err)
          return res.status(404).json('You are not a dealer')
        })
    console.log(
      make,
      model,
      mileage,
      color,
      transmission,
      fuelType,
      vehicleType,
      id)
      await db.transaction(async (trx) => {
        trx("cars")
          .insert({
            date_of_creation: new Date().toISOString(),
            date_of_last_update: new Date().toISOString(),
            make: make,
            model: model,
            mileage: mileage,
            color: color,
            transmission: transmission,
            fuel_type:fuelType,
            vehicle_type:vehicleType,
            dealer_id: id,
          })
          .returning("*")
          .then(async ([car]) => {
            if(car){
              res.json('succes')
             await trx.commit()
            }
          })
          .catch(async (err) => {
            console.log(err);
            res.status(400).json("this car is missing something");
            await trx.rollback()
          })

          
      });
    }

const sortModel = (list) => {
  let finalCount = 0;
  let finalList = [];
  const audi = [];
  let count1 = 0;
  const bmw = [];
  const bmwList = ["1", "2", "3", "4", "5", "6", "7", "8"];
  let count2 = 0;
  const mercedes = [];
  let count3 = 0;

  for (let x = 0; x < list.length; x++) {
    if (list[x].model[0] === "A") {
      audi[count1++] = list[x].model;
    } else if (bmwList.some((el) => list[x].model.startsWith(el))) {
      bmw[count2++] = list[x].model;
    } else {
      mercedes[count3++] = list[x].model;
    }
  }
  // console.log(audi,mercedes,bmw)
  if (audi) {
    for (let x = 0; x < audi.length; x++) {
      let min = 999;
      let index = 0;

      for (let y = x; y < audi.length; y++) {
        let numy = 0;
        if (!Number.isInteger(audi[y])) {
          numy = parseInt(audi[y][1]);
        } else {
          numy = audi[y];
        }
        if (numy <= min) {
          min = numy;
          index = y;
        }
      }
      if (index !== x) {
        let num2 = audi[x];
        audi[x] = audi[index];
        audi[index] = num2;
      }
    }

    finalList[finalCount++] = audi;
  }
  if (bmw) {
    for (let x = 0; x < bmw.length; x++) {
      let min = 999;
      let index = 0;

      for (let y = x; y < bmw.length; y++) {
        let numy = parseInt(bmw[y][0]);

        if (numy <= min) {
          min = numy;
          index = y;
        }
      }
      if (index !== x) {
        let num2 = bmw[x];
        bmw[x] = bmw[index];
        bmw[index] = num2;
      }
    }
    finalList[finalCount++] = bmw;
  }

  if (mercedes) {
    for (let y = 0; y < mercedes.length; y++) {
      let letter = mercedes[y][0];
      switch (letter) {
        case "C":
          if (y != 0) {
            let car = mercedes[0];
            mercedes[0] = mercedes[y];
            mercedes[y] = car;
          }
          break;
        case "S":
          if (y != 2) {
            let car = mercedes[2];
            mercedes[2] = mercedes[y];
            mercedes[y] = car;
          }
          break;
        case "E":
          if (y != 1) {
            let car = mercedes[1];
            mercedes[1] = mercedes[y];
            mercedes[y] = car;
          }
      }
    }
    finalList[finalCount++] = mercedes;
  }
  finalList = finalList.flat();
  const fList = [];
  for (let x = 0; x < finalList.length; x++) {
    let obj = {};
    obj.model = finalList[x];
    obj.checked = false;
    obj.id = x;
    fList[x] = obj;
  }
  return fList;
};

const model = (db) => async (req, res) => {
  const { vehicleList } = req.query;
  const list = [];
  try {
    const models = await func2(db, vehicleList);
    if (models) {
      const finalModels = sortModel(models);
      res.json(finalModels);
    } else {
      res.status(400).json("failed");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const func = async (db, vehicle, model, limit, offset, id,dealer) => {
  let query = db("cars").join("users", "cars.dealer_id", "users.id");

  if (vehicle) {
    query = query.whereIn("make", vehicle);
  }

  if (model) {
    query = query.whereIn("model", model);
  }

  if (id) {
    query = query.orderBy("cars.owner_id", id);
  }

  if(dealer){
    query=query
    .orderBy(knex.raw('dealer_id = ?',[dealer]),'DESC')
    .orderBy(knex.raw('owner_id IS NULL'),'DESC')
    .orderBy('date_of_creation','DESC')
    .orderBy('date_of_last_update','DESC')
  }

  const cars = await query.select("cars.*", "users.name", "users.surname").limit(limit).offset(offset);

  return cars;
};

const func2 = async (db, list) => {
  if (list) {
    return await db("cars").select(db.raw("DISTINCT model")).whereIn("make", list);
  }
  return await db("cars").select(db.raw("DISTINCT model"));
};

const readAllGuest = (db) => async (req, res) => {
  const { vehicle, model, limit, pageNumber } = req.query;
  const offset = (pageNumber - 1) * limit;

  try {
    const cars = await func(db, vehicle, model, limit, offset);

    res.status(200).json(cars);
  } catch (err) {
    console.log(err)
    res.status(400).json("something went wrong");
  }
};

const make = (db) => async (req, res) => {
  try {
    const rows = await db("cars").select(db.raw("DISTINCT make"));
    if (!rows) {
      console.log("err");
    }
    res.json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

const readAll = (db) => async (req, res) => {
  const { dealer,vehicle, model, id, limit, pageNumber } = req.query;
  const offset = (pageNumber - 1) * limit;

  try {
    const cars = await func(db, vehicle, model, limit, offset, id,dealer);
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json("something went wrong");
  }
};

const dealerModel = (db) => (req, res) => {

  const { make } = req.query

  let model = db('cars').distinct('model')

  if (make) {
    model = model.where('make', make)
    console.log(model)
  }
  model.then((models) => {
    const model = sortModel(models)
    const fModel = []
    for (let x = 0; x < model.length; x++) {
      fModel[x] = model[x].model
    }
    res.json(fModel)
  })
    .catch((err) => {
      console.log(err)
      res.status(400).json("something went wrong with the model query")

    })
}


const dealerMake = (db) => (req, res) => {

  const { model } = req.query

  console.log(model)

  let make = db('cars').distinct('make')
  if (model) {
    make = make.where('model', model)
  }
  make.then((makes) => {
    return res.json(makes)
  })
    .catch((err) => {
      console.log(err)
      res.status(400).json("something went wrong with the make query")
    })

}

const transmission = (db) => (req, res) => {
  let transmission = db('cars').distinct('transmission')
  transmission.then(transmission => {
    let fTransmission = []
    for (let x = 0; x < transmission.length; x++) {
      fTransmission[x] = transmission[x].transmission
    }
    console.log(fTransmission, 'transmission')
    res.json(fTransmission)
  })


}

const fuelType = (db) => (req, res) => {
  let fuelType = db('cars').distinct('fuel_type')
  fuelType.then(fuelType => {
    let finalFuelType = []
    for (let x = 0; x < fuelType.length; x++) {
      finalFuelType[x] = fuelType[x].fuel_type
    }
    console.log(finalFuelType, 'fuel')
    res.json(finalFuelType)
  })
}

const vehicleType = (db) => (req, res) => {
  let vehicleType = db('cars').distinct('vehicle_type')
  vehicleType.then(vehicleType => {
    let finalVehicleType = []
    for (let x = 0; x < vehicleType.length; x++) {
      finalVehicleType[x] = vehicleType[x].vehicle_type
    }
    console.log(vehicleType, 'vehicle')
    res.json(finalVehicleType)
  })
}

const read = (db) => (req, res) => {
  const { id } = req.params;
  const clientId = id;

  db.where({
    id: clientId,
  })
    .select("cars")
    .returning("*")
    .then((car) => {
      res.json(car[0]);
    })
    .catch((err) => {
      res.status(404).json("car doesn't exist");
    });
};

const update = (db) => async (req, res) => {
  const { id, carId } = req.body;

  try {
    // Check if a car with carId exists
    const car = await db("cars").select("*").where("id", carId).first();

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Perform the update
    const result = await db("cars").where("id", carId).update("owner_id", id);

    if (result) {
      res.status(200).json("success");
    } else {
      res.status(400).json({ error: "Update failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating the owner_id" });
  }
};

const delet = (db) => (req, res) => {
  const { id: clientId } = req.params;

  if (clientId) {
    res.status(403).json("id is missing");
  }

  db("cars")
    .where({
      id: clientId,
    })
    .del()
    .then((user) => {
      res.json("Car is now deleted");
    })
    .catch((err) => {
      res.status(404).json("wrong id");
    });
};

module.exports = {
  createCar: create,
  readCar: read,
  updateCar: update,
  deleteCar: delet,
  readAll,
  readAllGuest,
  make,
  model,
  dealerModel,
  dealerMake,
  transmission,
  fuelType,
  vehicleType
};
