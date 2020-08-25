const router = require('express').Router()
const Strains = require('./strains-model')
const restricted = require('../auth/restricted-model')


// router.use(restricted)
router.get('/', (req, res)=>{
    Strains.getAll()
        .then(strains =>{
            res.status(200).json(strains)
        }).catch(err =>{
            res.status(500).json({message: err.message})
        })
})

// router.get('/', (req,res)=>{
//     Strains.getStrains()
//         .then(strains =>{
//             console.log(strains)
//             if(strains.length === 0){
//                 res.status(404).json({message: 'there are no strains available currently'})
//             }else{
//             res.status(200).json(strains)}
//         })
// })

router.get('/:id', (req, res)=>{
    Strains.getStrainsById(req.params.id)
    .then(strains =>{
        if(strains.length){
            res.status(200).json(strains)
        
        }else{
            res.status(400).json({message: 'Failed to retrieve this strain, check to make sure id associated with it exists'})
        }
    }).catch(err =>{
        res.status(500).json({message: err.message})
    })
})

router.post('/', restricted, (req,res)=>{
    const strainData = req.body
    Strains.addStrain(strainData)
        .then(strains =>{
            res.status(201).json({added: strains})
        }).catch( err =>{
            res.status(500).json({message: err})
            
})
    
})

router.delete('/:id', restricted, (req, res)=>{
    Strains.deleteStrain(req.params.id)
    .then(removed =>{
        if(removed >0){
            res.status(200).json({removed: removed})
        }else{
            res.status(500).json({message: 'this strain was not deleted'})
        }
    }).catch(err =>{
        res.json({message: err.message})
    })
})

module.exports = router;