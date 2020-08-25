const router = require('express').Router()
//const Users = require('../users/users-model')
//const Ailments = require('../ailments/ailments-model')
const Recc = require('./recc-model')
//const Strains = require('../strains')
const restricted = require('../auth/restricted-model')


router.use(restricted)

router.get('/', (req, res)=>{
    Recc.find()
        .then(reccs =>{
            res.status(200).json({reccs})
        }).catch(err =>{
            console.log(err)
        res.status(403).json( {message: err})
        })
})

router.get('/user/:id', (req, res)=>{
    const {id} = req.params
    Recc.getUsersReccs(id)
        .then(reccs =>{
            if(reccs){
                res.json(reccs)
            }else{
                res.status(404).json({message: 'no recommended strains for this user'})
            }
        }).catch(err =>{
            console.log(err)
            res.status(500).json({message: err.message})
        })
})


router.get('/ailment/:id', (req,res)=>{
    const {id} = req.params
    Recc.getAilmentRec(id)
        .then (recc =>{
            if(recc){
                res.json(recc)
            }else{
                res.status(404).json({message: 'no recommended strains for this specific ailment.'})
            }
        })
 })

router.get('/strain/:id', (req, res)=>{
    const {id} = req.params
    
    Recc.getStrainRec(id)
    .then (recc => {
        if(recc){
            res.json(recc)
        }else{
            res.status(404).json({message: 'Sorry no recommended strain for this ID'})
        }
    }).catch(err =>{
        console.log(err)
        res.status(500).json({message: err.message})
    })
})

module.exports = router;
