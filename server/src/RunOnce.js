
export default runOnce = (db) => {

    let cars = {}

    const brand = ['Audi', 'Bmw', 'Mercedes-Benz']
    const brandModel = {
        [brand[0]]: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8",],
        [brand[1]]: ["1", "2", "3", "4", "5", "6", "7", "8"],
        [brand[2]]: ['C', 'E', 'S']
    }


    const color = ['red', 'black', 'white']
    const transmission = ["manual_gearbox", " semi_automatic", "automatic_transmission",]
    const fuel_type = ["petrol", "diesel",]
    const vehicle_type = ["sUV", "cabriolet", "coupe"]
    const dealer_id = [2, 6, 7, 9, 10, 11, 12, 13]

    const mileage = () => {
        let num = 0;
        const which = Math.random();
        if (which >= 0.5) {
            num = Math.floor((Math.random() * (250000)))
        } else {
            num = 0
        }
        return num
    }



    const createCar = () => {
        let count = 0
        return (brand, brandModel, mileage, color, transmission, fuel_type, vehicle_type, dealer_id) => {
            db(cars).insert({
                date_of_creation: x.date_of_creation
                , date_of_last_update: new Date().toISOString()
                , make: brand
                , model: brandModel
                , mileage: mileage
                , color: color
                , transmission: transmission
                , fuel_type: fuel_type
                , vehicle_type: vehicle_type
                , dealer_id: dealer_id
                , owner_id: owner_id
            }).returning()
            .then()

            count++;
        }

    }

    const dealer = () => {
        let num = Math.floor(Math.random() * 7)
        return num
    }

    const create = createCar()
    const models = Object.keys(brandModel);

    for (let a = 0; a < brand.length; a++) {
        for (let j = 0; j < brandModel[brand[a]].length; j++) {
            for (let c = 0; c < color.length; c++) {
                for (let d = 0; d < transmission.length; d++) {
                    for (let e = 0; e < fuel_type.length; e++) {
                        for (let f = 0; f < vehicle_type.length; f++) {
                            create(brand[a], brandModel[brand[a]][j], mileage(), color[c], transmission[d], fuel_type[e], vehicle_type[f], dealer_id[dealer()])
                        }
                    }

                }
            }
        }
    }

    for (let x in cars) {
        db(cars).insert({
            date_of_creation: x.date_of_creation
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
        })
    }


}