const db = require('../models/index');
const Sensors = db['Sensors'];
const Customers = db['Customers'];
const Parks = db['Parks'];
const SensorHistory = db['SensorHistories'];
const bcrypt = require('bcrypt');
const { Op, Sequelize } = require("sequelize");
const { calculateAqi, createFakeData } = require('../services/aqiService');

/**********************************/
/*** Routage de la ressource Sensor */
exports.getAllSensors = (req, res) => {
    Sensors.findAll()
        .then(sensors => res.json({ data: sensors }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getSensor = async (req, res) => {
    let sensorId = parseInt(req.params.id)   
    // Vérification si le champ id est présent et cohérent
    if (!sensorId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }
    try{
        // Récupération de l'utilisateur et vérification
        let sensor = await Sensors.findOne({ where: { id: sensorId }})
        if ( sensor === null ) {
            return res.status(404).json({ message: 'This sensor does not exist !' })
        }
        return res.json({ data: sensor })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addSensor = async (req, res) => {
    const { name, companies_id, parks_id } = req.body
    // Validation des données reçues
    if ( !name || !companies_id || !parks_id ) {
        return res.status(400).json({ message: 'Missing Datas' })
    }
    try {
        // Création de l'utilisateur
        let sensorc = await Sensors.create(req.body)
    
        return res.json({ message: 'Sensor Created', data: { sensorc } })
    }catch(err){
        console.log(err)
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateSensor = async (req, res) => {
    let sensorId = parseInt(req.params.id)
    // Vérification si le champ id est présent et cohérent
    if (!sensorId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        // Recherche de l'utilisateur et vérification
        let sensor = await Sensors.findOne({ where: {id: sensorId}, raw: true})
        if(sensor === null){
            return res.status(404).json({ message: 'This sensor does not exist !'})
        }
        // Mise à jour de l'utilisateur
        await Sensors.update(req.body, { where: {id: sensorId}})
        return res.json({ message: 'Sensor Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.deleteSensor =  (req, res) => {
    let sensorId = parseInt(req.params.id)
    // Vérification si le champ id est présent et cohérent
    if (!sensorId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    // Suppression de l'utilisateur
    Sensors.destroy({ where: {id: sensorId}, force: true})
        .then(() => res.status(200).json({ message: 'Sensor Deleted'}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getSensorHistory = async (req, res) => {
    let sensorId = parseInt(req.params.id)
    // Vérification si le champ id est présent et cohérent
    if (!sensorId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        // Recherche du capteur et vérification
        let sensor = await Sensors.findOne({ where: {id: sensorId}, raw: true});
        if(sensor === null){
            return res.status(404).json({ message: 'This sensor does not exist !'});
        }
        SensorHistory.findOne({
            where: {
            sensors_id: sensorId,
            },
            order: [['date', 'DESC']]
        }).then(sensorHistory => res.json({ data: sensorHistory }))
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err.message })
    }
}

exports.getDataOverTime = async (req, res) => {
    let sensorId = parseInt(req.params.id)

    if (!sensorId || !req.query.time) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    if (isNaN(parseInt(req.query.time))) {
        return res.status(400).json({ message: 'Number expected for time (in hours)' })
    }
    try {
        let sensor = await Sensors.findOne({ where: {id: sensorId} });
        if (sensor === null) {
            return res.status(404).json({ message: 'This sensor does not exist !' })
        }
        let customer = await Customers.findOne({ where: {id: res.tokenId} })
        if (customer.companies_id != sensor.companies_id) {
            return res.status(403).json({ message: 'Forbidden'})
        }
        let lastTime = new Date();
        lastTime.setHours(lastTime.getHours() - parseInt(req.query.time));
        SensorHistory.findAll({
            where: {
                sensors_id: sensorId,
                createdAt: {
                    [Op.between]: [lastTime, Date.now()]
                }
            }
        }).then((sensorHistories) => {
            res.json(sensorHistories);
        })
    } catch(err) {
        return res.status(500).json({ message: 'Database Error', error: err.message })
    }
}

exports.getAvgSensorHistory = async (req, res) => {
    let sensorId = parseInt(req.params.id)
    // Vérification si le champ id est présent et cohérent
    if (!sensorId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        // Recherche de l'utilisateur et vérification
        let sensor = await Sensors.findOne({ where: {id: sensorId}, raw: true});
        if(sensor === null){
            return res.status(404).json({ message: 'This sensor does not exist !'});
        }
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        SensorHistory.findAll({
            attributes: [[Sequelize.fn('avg', Sequelize.col('oxydants')),'avgOxydants'],
            [Sequelize.fn('avg', Sequelize.col('reducers')), 'avgReducteur'],
            [Sequelize.fn('avg', Sequelize.col('nh3')), 'avgNh3'],
            [Sequelize.fn('avg', Sequelize.col('humidity')), 'avgHumidity'],
            [Sequelize.fn('avg', Sequelize.col('pm1')), 'avgPm1'],
            [Sequelize.fn('avg', Sequelize.col('pm10')), 'avgPm10'],
        ], 
            where: {
            sensors_id: sensorId,
            createdAt: {
                [Op.between]: [lastWeek, Date.now()]
            }
        }
        }).then((sensorHistory) => {
            if (!sensorHistory.avgCo || !sensorHistory.avgNo2 || !sensorHistory.avgNh3) {
                res.status(422).json({ message: 'No data' })
            }
            res.json({ data: sensorHistory })
        })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err.message })
    }
}

exports.saveSensorInput = async (req, res) => {
    let sensorId = parseInt(req.params.id);
    if (!sensorId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }
    try{
        let sensor = await Sensors.findOne({ where: {id: sensorId}, raw: true})
        if(sensor === null){
            return res.status(404).json({ message: 'This sensor does not exist !'})
        }
        let sensorhc = await SensorHistory.create(req.body)
        sensorhc.sensor_id = sensor.id;
        return res.json({ message: 'Sensor Input Saved', data: { sensorhc } })      
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err.message })
    }
}

exports.calculateAqi = async (req, res) => {
    const { sensorHistory } = req.body;
    if (!sensorHistory) {
        return res.status(400).json({message: 'Missing parameter'});
    }
    jsonSH = JSON.parse(sensorHistory);
    let polluants = ['oxydants', 'reducers', 'pm2_5', 'pm10'];

    try {
        let aqis = {};
        for (const polluant of polluants) {
            console.log(polluant);
            aqis[polluant] = calculateAqi(jsonSH[polluant], polluant);
        }
        let finalAqi = 0;
        for(let aqi in aqis) {
            if (finalAqi < aqis[aqi]) {
                finalAqi = aqis[aqi]
            }
        }
        return res.status(200).json({ globalAQI: finalAqi, AQIs: aqis})
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error: error.message })
    }
}

exports.getCustomerSensorsAverageAqi = async (req, res) => {
    
    let polluants = ['oxydants', 'reducers', 'pm2_5', 'pm10'];
    const customerId = req.query.customerId;
    if (!customerId) {
        return res.status(400).json({message: 'Missing parameter'});
    }
    if (res.tokenId != customerId) {
        return res.status(404).json({message: 'You have no right of access to this ressource'})
    }
    try {
        const customer = await Customers.findOne({ include: ["Roles", "Companies"], where: { id: customerId } })
        if (customer == null) {
            return res.status(404).json({ message: `Customer not found.` });
        } else {
                let parks = await Parks.findAll({ include: ["Sensors", "Buildings"], where: { company_id : customer.companies_id } });
                let sensors = []
                for(let park of parks) {
                    for (let sensor of park.Sensors) {
                        if (!sensors.includes(sensor)) {
                            sensors.push(sensor);
                        } 
                    }
                }
                let sensorsAqiHistory = []
                for (let sensor of sensors) {
                    let sensorHistories = await SensorHistory.findAll({
                        where: {
                            sensors_id: sensor.id,
                        },
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        limit: 7
                    })
                    let sensorAqiHistory = [];
                    for (let sensorHistory in sensorHistories) {
                        let aqis = {}
                        for (const polluant of polluants) {
                            aqis[polluant] = calculateAqi(sensorHistories[sensorHistory][polluant], polluant);
                        }
                        let finalAqi = 0;
                        for(let aqi in aqis) {
                            if (finalAqi < aqis[aqi]) {
                                finalAqi = aqis[aqi]
                            }
                        }
                        sensorAqiHistory.push(finalAqi);
                    }
                    if (sensorAqiHistory.length != 0) {
                        sensorsAqiHistory.push(sensorAqiHistory);
                    }
                }
                if (sensorsAqiHistory.length > 0) {
                    let aqisAverage = [];
                    for (i = 0; i < sensorsAqiHistory[0].length; i++) {
                        let numbersOfArrays = sensorsAqiHistory.length;
                        let aqiSum = 0;
                        for (j = 0; j < numbersOfArrays; j++) {
                            aqiSum = aqiSum + sensorsAqiHistory[j][i];
                        }
                        let aqiAverage = aqiSum / numbersOfArrays;
                        aqisAverage.push(parseInt(aqiAverage))
                    }
                    return res.status(200).json(aqisAverage);
                }
                return res.status(404).json({message: "No Data Found"});
        }
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Database Error', error: err })
    }
    
}


exports.createFakeData = async (req, res) => {
    try {
        let sensors = await Sensors.findAll();
        let histories = [];
        sensors.forEach(sensor => {
            let data = createFakeData(req.body.hours)
            let index = 0
            data.forEach(dummydata => {
                currentDate = new Date()
                let sensorhc = SensorHistory.create({
                    ...dummydata,
                    date: currentDate.getTime() - (req.body.hours - index) * 60 * 60 * 1000,
                    sensors_id: sensor.id
                })
                index = index + 1;
                histories.push(sensorhc);
            });
        });
        return res.status(200).json({ histories })
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error: error.message })
    }
}

exports.getLeastAndMaxPolluant = async (req, res) => {
    let polluant = req.query.polluant;
    if (!polluant) {
        return res.status(400).json('Missing parameter')
    }
    try {
        let customer = await Customers.findOne({ where: {id: res.tokenId} });
        let sensors = await Sensors.findAll({ 
            where: {companies_id: customer.companies_id},
            include: {
                model: SensorHistory,
                as: 'SensorHistories',
            }
        });
        let sensorHistories = []
        sensors.forEach(sensor => {
            let mostRecent = {};
            sensor.SensorHistories.forEach(sensorHistory => {
                let jsTimestamp = Date.parse(sensorHistory.date);
                if (jsTimestamp > Date.parse(mostRecent?.date) || !mostRecent?.date) {
                    mostRecent = sensorHistory
                }
            })
            sensorHistories.push(mostRecent);
        })
        let least = false;
        let most = false;
        sensorHistories.forEach(sensorHistory => {
            if (sensorHistory[polluant] > most || most == false) {
                most = sensorHistory[polluant];
            }
            if (sensorHistory[polluant] < least || least == false) {
                least = sensorHistory[polluant];
            }
        })
        return res.status(200).json({ polluant: req.query.polluant, min: least, max: most});
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error: error.message })
    }
} 


exports.insertData = async (req, res) => {
    console.log(req.body)
    console.log(req.body.mac_address)
    if (!req.body) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }
    try{
        // Récupération du sensor et vérification
        let sensor = await Sensors.findOne({ where: { mac_address: req.body.mac_address }})
        if ( sensor === null ) {
            return res.status(404).json({ message: 'This sensor does not exist !' })
        }
        currentDate = new Date()
        let sensorhc = SensorHistory.create({
            ...req.body,
            date: currentDate.getTime(),
            sensors_id: sensor.id
        })
        return res.status(200).json({ sensorhc })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}