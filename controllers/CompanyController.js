const db = require('./../models/index');
const Companies = db['Companies'];

/**********************************/
/*** Routage de la ressource Company */
exports.getAllCompanies = (req, res) => {
    if (res.tokenRole == "ADMIN") {
        Companies.findAll()
            .then(companies => res.json({ data: companies }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    }
}

exports.getCompany = async (req, res) => {

    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'entreprise et vérification
        let company = await Companies.findOne({ where: { id: companyId }})
        if (company === null) {
            return res.status(404).json({ message: 'This company does not exist !' })
        }

        return res.json({ data: company })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addCompany = async (req, res) => {
    const { name, siret } = req.body

    // Validation des données reçues
    if ( !name || !siret ) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si l'entrprise est déjà enregistrée
        const company = await Companies.findOne({ where: { siret: parseInt(siret) }, raw: true })
        if (company !== null) {
            return res.status(409).json({ message: `The siret n° ${siret} is already registered in the database` })
        }
        let companyc = await Companies.create(req.body)
    
        return res.json({ message: 'Company Created', data: { companyc } })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateCompanyOld = async (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let user = await Companies.findOne({ where: {id: companyId}, raw: true})
        if(user === null){
            return res.status(404).json({ message: 'This company does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Companies.update(req.body, { where: {id: companyId}})
        return res.json({ message: 'Company Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateCompany = async (req, res) => {
    let companyId = parseInt(req.params.id)
    
    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenId) {
        return res.status(400).json({ message: 'Missing token' })
    }
    
    if (res.tokenRole == "ADMIN" || companyId === res.tokenId) {
        try{

            // Recherche de l'utilisateur et vérification
            let customer = await Customer.findOne({ where: {id: customerId}, raw: true})
            if(customer === null) {
                return res.status(404).json({ message: 'This customer does not exist !' })
            }
    
            // Mise à jour de l'utilisateur
            await Customer.update(req.body, { where: {id: customerId} })
            return res.json({ message: 'Customer Updated' })
        } catch(err){ 
            return res.status(500).json({ message: 'Database Error', error: err })
        }
    } else {
        return res.status(401).json({ message: 'Forbidden' });
    }
}

exports.untrashCompany =  (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    Companies.restore({ where: { id: companyId }})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashCompany = (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Companies.destroy({ where: {id: companyId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteCompany =  (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Companies.destroy({ where: {id: companyId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}