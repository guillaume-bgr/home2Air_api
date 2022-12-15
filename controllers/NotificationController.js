const db = require('./../models/index');
const Notification = db['Notifications'];
const bcrypt = require('bcrypt');

/**********************************/
/*** Routage de la ressource Notification */
exports.getAllNotifications = (req, res) => {
    if (res.tokenRole == "ADMIN") {
        Notification.findAll({
            order: [['createdAt', 'DESC']]
        })
            .then(notifications => res.json({ data: notifications }))
            .catch(err => res.status(500).json({ message: 'Database Error' }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.getNotification = async (req, res) => {
    let notificationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let notification = await Notification.findOne({where: { id: notificationId }})
        if (notification === null) {
            return res.status(404).json({ message: 'This notification does not exist !' })
        }

        return res.json({ data: notification })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addNotification = async (req, res) => {
    const { email, password } = req.body

    // Validation des données reçues
    if (!email || !password ) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Création de l'utilisateur
        let notification = await Notification.create(req.body)
    
        return res.json({ message: 'Notification Created', data: { notification } })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateNotification = async (req, res) => {
    let notificationId = parseInt(req.params.id);
    
    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole) {
        return res.status(400).json({ message: 'Missing token' })
    }
    
    if (res.tokenRole == "ADMIN") {
        try{
            // Recherche de l'utilisateur et vérification
            let notification = await Notification.findOne({ where: {id: notificationId, user_id: res.tokenId}, raw: true})
            if(notification === null) {
                return res.status(404).json({ message: 'This notification does not exist !' })
            }
    
            // Mise à jour de l'utilisateur
            await Notification.update(req.body, { where: {id: notificationId} })
            return res.json({ message: 'Notification Updated' })
        } catch(err){ 
            return res.status(500).json({ message: 'Database Error', error: err })
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.deleteNotification = (req, res) => {
    let notificationId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!notificationId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenId) {
        return res.status(400).json({ message: 'Missing token' })
    }

    if (res.tokenRole == "ADMIN" || notificationId === res.tokenId) {
        // Suppression de l'utilisateur
        Notification.destroy({ where: {id: notificationId}, force: true})
            .then(() => res.status(200).json({ message: 'Notification deleted' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}