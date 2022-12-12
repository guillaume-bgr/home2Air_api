const db = require('./../models/index');
const Subscriptions = db['Subscriptions'];

/**********************************/
/*** Routage de la ressource Subscription */
exports.getAllSubscriptions = (req, res) => {
    Subscriptions.findAll()
        .then(subscriptions => res.json({ data: subscriptions }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getSubscription = async (req, res) => {
    let subscriptionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!subscriptionId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }
    try{
        // Récupération du subscription et vérification
        let subscription = await Subscriptions.findOne({ where: { id: subscriptionId }})
        if (subscription === null) {
            return res.status(404).json({ message: 'This subscription does not exist !'})
        }
        console.log("not not found")
        return res.json({ data: subscription })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err})
    }    
}

exports.addSubscription = async (req, res) => {
    const { name } = req.body
    // Validation des données reçues
    if ( !name ) {
        return res.status(400).json({ message: 'Missing Data' })
    }else{
    try {
        // Création du subscription
        let subscriptionc = await Subscriptions.create(req.body)
    
        return res.json({ message: 'Subscription Created', data: { subscriptionc } })
    }catch(err){
        console.log(err)
        err.name == 'SequelizeDatabaseError'
            res.status(500).json({ message: 'Database Error', error: err })     
    }
}}

exports.updateSubscription = async (req, res) => {
    let subscriptionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'abonnement et vérification
        let subscription = await Subscriptions.findOne({ where: {id: subscriptionId}, raw: true})
        if(subscription === null){
            return res.status(404).json({ message: 'This customer does not exist !'})
        }

        // Mise à jour de l'abonnement
        await Subscriptions.update(req.body, { where: {id: subscriptionId}})
        return res.json({ message: ' Updated Subscription'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashSubscription =  (req, res) => {
    let subscriptionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    Subscriptions.restore({ where: { id: subscriptionId }})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashSubscription = (req, res) => {
    let subscriptionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Subscriptions.destroy({ where: {id: subscriptionId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteSubscription =  (req, res) => {
    let subscriptionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!subscriptionId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Subscriptions.destroy({ where: {id: subscriptionId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}