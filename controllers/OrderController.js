const DB = require('../database.js');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');

/**********************************/
/*** Routage de la ressource Order */
exports.getAllOrders = (req, res) => {
    Order.findAll()
        .then(orders => res.json({ data: orders }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOrder = async (req, res) => {
    let orderId = parseInt(req.params.id)   

    // Vérification si le champ id est présent et cohérent
    if (!orderId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let order = await Order.findOne({ where: { id: orderId }})
        if (order === null) {
            return res.status(404).json({ message: 'This order does not exist !' })
        }

        return res.json({ data: order })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addOrder = async (req, res) => {
    const { address, city, post_code, is_delivered, customer_id } = req.body

    // Validation des données reçues
    if (!address || !city || !post_code, !is_delivered, !customer_id) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Création de l'utilisateur
        let orderc = await Order.create(req.body)
    
        return res.json({ message: 'Order Created', data: { orderc } })
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateOrder = async (req, res) => {
    let orderId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!orderId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let order = await Order.findOne({ where: {id: orderId}, raw: true})
        if(order === null){
            return res.status(404).json({ message: 'This order does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Order.update(req.body, { where: {id: orderId}})
        return res.json({ message: 'Order Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashOrder =  (req, res) => {
    let orderId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!orderId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    Order.restore({ where: {id: orderId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashOrder = (req, res) => {
    let orderId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!orderId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Order.destroy({ where: {id: orderId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteOrder =  (req, res) => {
    let orderId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!orderId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Order.destroy({ where: {id: orderId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}