const db = require('./../models/index');
const Notification_Types = db['Notification_Types'];
const bcrypt = require('bcrypt');

/**********************************/
/*** Routage de la ressource Notification */

exports.getNotificationsTypes = async (req, res) => {
    if (res.tokenRole == "ADMIN") {
        Notification_Types.findAll()
        .then(notificationsType => res.json({ count: notificationsType.length, notificationsType:notificationsType }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


exports.addNotificationTypes = async (req, res) => {
    const { name } = req.body

    // Validation des données reçues
    if (!name) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Création du type de notifications
        let notificationType = await Notification_Types.create(req.body)
    
        return res.json({ message: 'Notification Type Created', data: { notificationType } })

    }catch(err){
            res.status(500).json({ message: 'Database Error', error: err }) 
    }     
}

exports.updateNotificationTypes = async (req, res) => {
    let notificationTypesId = parseInt(req.params.id);
    
    // Vérification si le champ id est présent et cohérent
    if (!notificationTypesId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole) {
        return res.status(400).json({ message: 'Missing token' })
    }
    
    if (res.tokenRole == "ADMIN") {
        try{
            // Recherche de l'utilisateur et vérification
            let notification_type = await Notification.findOne({ where: {id: notificationId, user_id: res.tokenId}, raw: true})
            if(notification_type === null) {
                return res.status(404).json({ message: 'This notification type does not exist !' })
            }
    
            // Mise à jour de l'utilisateur
            await Notification_Types.update(req.body, { where: {id: notificationId} })
            return res.json({ message: 'Notification Type Updated' })
        } catch(err){ 
            return res.status(500).json({ message: 'Database Error', error: err })
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.deleteNotificationTypes = (req, res) => {
    let notificationTypesId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!notificationTypesId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenId) {
        return res.status(400).json({ message: 'Missing token' })
    }

    if (res.tokenRole == "ADMIN" || notificationTypesId === res.tokenId) {
        // Suppression de l'utilisateur
        Notification_Types.destroy({ where: {id: notificationTypesId}, force: true})
            .then(() => res.status(200).json({ message: 'Notification Type deleted' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}