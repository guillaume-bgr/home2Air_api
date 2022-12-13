const db = require('./../models/index');
const Tickets = db['Tickets'];

/**********************************/
/*** Routage de la ressource Ticket */
exports.getAllTickets = (req, res) => {
    Tickets.findAll()
        .then(tickets => res.json({ data: tickets }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getTicket = async (req, res) => {
    let ticketId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!ticketId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }
    try{
        // Récupération du ticket et vérification
        let ticket = await Tickets.findOne({ where: { id: ticketId }})
        if (ticket === null) {
            return res.status(404).json({ message: 'This ticket does not exist !'})
        }
        console.log("not not found")
        return res.json({ data: ticket })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err})
    }    
}

exports.addTicket = async (req, res) => {
    const { status, title, content, customers_id } = req.body
    // Validation des données reçues
    if ( !status || !title || !content || !customers_id  ) {
        return res.status(400).json({ message: 'Missing Data' })
    }else{
    try {
        // Création du ticket
        let ticketc = await Tickets.create(req.body)
    
        return res.json({ message: 'Ticket Created', data: { ticketc } })
    }catch(err){
        console.log(err)
        err.name == 'SequelizeDatabaseError'
            res.status(500).json({ message: 'Database Error', error: err })     
    }
}}

exports.updateTicket = async (req, res) => {
    let ticketId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!ticketId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let ticket = await Tickets.findOne({ where: {id: ticketId}, raw: true})
        if(ticket === null){
            return res.status(404).json({ message: 'This customer does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Tickets.update(req.body, { where: {id: ticketId}})
        return res.json({ message: 'Customer Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashTicket =  (req, res) => {
    let ticketId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!ticketId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    Tickets.restore({ where: { id: ticketId }})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashTicket = (req, res) => {
    let ticketId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!ticketId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Tickets.destroy({ where: {id: ticketId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteTicket =  (req, res) => {
    let ticketId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!ticketId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Tickets.destroy({ where: {id: ticketId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}