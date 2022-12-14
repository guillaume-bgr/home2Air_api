const db = require('./../models/index');
const Notifications = db['Notifications'];
const bcrypt = require('bcrypt');

/**********************************/
/*** Routage de la ressource Notifications */
exports.getAllNotifications = (req, res) => {
    Notifications.findAll({
    })
        .then(notifications => res.json({ data: notifications }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getNotification = async (req, res) => {
    let notificationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de la notification et vérification
        let notification = await Notifications.findOne({ where: { id: notificationId }})
        if (notification === null) {
            return res.status(404).json({ message: 'This notification does not exist !' })
        }

        return res.json({ data: notification })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.getUserNotifications = async (req, res) => {
    let notificationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de la notification et vérification
        let notification = await Notifications.findOne({ where: { id: notificationId }})
        if (notification === null) {
            return res.status(404).json({ message: 'This notification does not exist !' })
        }

        return res.json({ data: notification })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}



exports.deleteNotification =  (req, res) => {
    let notificationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    // Suppression de la notification
    Notifications.destroy({ where: {id: notificationId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.updateNotification = async (req, res) => {
    let notificationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let notification = await Notifications.findOne({ where: {id: notificationId}, raw: true})
        if(notification === null){
            return res.status(404).json({ message: 'This notification does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Notifications.update(req.body, { where: {id: notificationId}})
        return res.json({ message: 'Notifications Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addNotification = async (req, res) => {
    const { name, content, customers_id } = req.body
    
    
    // Validation des données reçues

    if ( !name || !content || !customers_id ) {
        return res.status(400).json({ message: 'Missing Data' })
    }
  
    try {
        // Création de la notification
        let notification = await Notifications.create(req.body)
    
        return res.json({ message: 'Notifications created', data: { notification } })
    }catch(err){
        console.log(err)
       err.name == 'SequelizeDatabaseError'
            res.status(500).json({ message: 'Database Error', error: err })
        
       
    }
}