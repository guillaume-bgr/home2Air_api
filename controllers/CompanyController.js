const db = require('./../models/index');
const { Op } = require("sequelize");
const sequilize = require("sequelize");
const Company = db['Companies'];
const Customers = db['Customers'];

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

exports.getMyCompanies = async (req, res) => {
    let userId = parseInt(req.params.idUser)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'entreprise et vérification
        let company = await Company.findAll({
            attributes:[
            'owner', 'name', 'id'
            ],
            include: {
            model: Customers,
            as: "Customers",},
            where: { owner : userId }})
        if (company === null) {
            return res.status(404).json({ message: 'This company does not exist !' })
        }

        return res.json({ data: company })

    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.getInvitedCompanies = async (req, res) => {
    let userId = parseInt(req.params.idUser)
    let id = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId || !id) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'entreprise et vérification
        // let company = await sequelize.query("SELECT DISTINCT c.* FROM companies c JOIN customers cu ON cu.companies_id = c.id WHERE c.owner != "+userId+" AND cu.companies_id =" +id);
        // let company = await Company.findAll({
        //     attributes:[
        //         'owner', 'name', 'id'
        //     ],
        //     include: {
        //         model: Customers,
        //         as: "Customers",
        //         attributes:[
        //             'id', 'first_name', 'last_name', 'email'
        //         ],
        //         where: {
        //             id:{
        //                 [Op.ne]: id
        //             } 
        //             // [Op.and]: {
        //             //     [Op.eq]: {"Customers.companies_id": id},
        //             //     [Op.ne]: {"Companies.owner": userId},
        //             // }
        //         }
        //     },
        //     where: {
        //         id:{
        //             [Op.eq]: userId
        //         } 
        //     }
        //     }
        // )
        let results = await db['sequelize'].query("SELECT DISTINCT c.* FROM companies c JOIN customers cu ON cu.companies_id = c.id WHERE c.owner != :userId AND cu.companies_id = :id",
        {
            replacements: { userId : userId, id : id},
            type: sequilize.QueryTypes.SELECT
          })
        console.log(results)
        if (results === null) {
            return res.status(404).json({ message: 'This company does not exist !' })
        }

        return res.json({ data: results })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addCompany = async (req, res) => {
    const { name, siret } = req.body

    // Validation des données reçues
    if ( !req.body ) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si l'entrprise est déjà enregistrée
        let companyc = await Company.create(req.body)
    
        return res.json({ message: 'Company Created', data: { companyc } })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateCompany = async (req, res) => {
    let companyId = parseInt(req.params.id)
    
    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    let owner = await Company.findOne({ where: {owner: req.body.actualOwner}, raw: true})
    
    if (owner) {
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

exports.deleteCompany =  async (req, res) => {
    let companyId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    let owner = await Company.findOne({ where: {owner: req.body.actualOwner}, raw: true})


     if (owner) {
        // Suppression de l'entreprise
        Company.destroy({ where: {id: companyId}, force: true})
            .then(() => res.status(200).json({ message: 'Customer deleted' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}