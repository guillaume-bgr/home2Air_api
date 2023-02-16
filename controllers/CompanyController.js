const db = require('./../models/index');
const Company = db['Companies'];

/**********************************/
/*** Routage de la ressource Company */
exports.getAllCompanies = (req, res) => {
    Company.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(companies => res.json({ data: companies }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getCompany = async (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'entreprise et vérification
        let company = await Company.findOne({ where: { id: companyId }})
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
        const company = await Company.findOne({ where: { siret: parseInt(siret) }, raw: true })
        if (company !== null) {
            return res.status(409).json({ message: `The siret n° ${siret} is already registered in the database` })
        }
        let companyc = await Company.create(req.body)
    
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

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenCompany) {
        return res.status(400).json({ message: 'Missing token' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let user = await Company.findOne({ where: {id: companyId}, raw: true})
        if(user === null){
            return res.status(404).json({ message: 'This company does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Company.update(req.body, { where: {id: companyId}})
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
    
    if (res.tokenRole == "ADMIN" || companyId === res.tokenCompany) {
        try{
            // Recherche de l'utilisateur et vérification
            let company = await Company.findOne({ where: {id: companyId}, raw: true})
            if(company === null) {
                return res.status(404).json({ message: 'This company does not exist !' })
            }
    
            // Mise à jour de l'utilisateur
            await Company.update(req.body, { where: {id: companyId} })
            return res.json({ message: 'Company Updated' })
        } catch(err){ 
            return res.status(500).json({ message: 'Database Error' })
        }
    } else {
        return res.status(401).json({ message: 'Forbidden' });
    }
}

exports.deleteCompany =  (req, res) => {
    let companyId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenCompany) {
        return res.status(400).json({ message: 'Missing token' })
    }

    if (res.tokenRole == "ADMIN" || companyId === res.tokenCompany) {
        // Suppression de l'entreprise
        Company.destroy({ where: {id: companyId}, force: true})
            .then(() => res.status(200).json({ message: 'Customer deleted' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}