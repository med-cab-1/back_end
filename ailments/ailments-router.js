const router = require('express').Router()
const Users = require('../users/users-model')
const Ailments = require('./ailments-model')
const restricted = require('../auth/restricted-model')


router.use(restricted)

router.get('/', (req,res)=>{
    Ailments.find()
    .then(ailment =>{
        res.json(ailment)
    })
})

router.get('/:id', (req, res)=>{
    const {id} = req.params
    Ailments.findBy(id)
        .then(ailment =>{
            if(ailment){
                res.json(ailment)
            }else{
                res.status(404).json({message: "Error finding this specific ailment by id"})
            }
        }).catch(err =>{
            message: err.message
        })

})

router.post('/', (req,res)=>{
    const ailmentData = req.body
    Ailments.add(ailmentData)
    .then(ailment =>{
        res.status(201).json({created: ailment})
    }).catch(err =>{
        message: err.message
    })
})

router.put('/:id', (req, res)=>{
    const {id} = req.params
    const changes = req.body

    Ailments.findBy(id)
    .then(updates =>{
        if(updates){
            Ailments.updateAilment(changes, id)
                .then(updatedAilment =>{
                    res.json(updatedAilment)
                })
        }else{
            res.status(404).json({message: 'could not find specific ailment'})
        }
    }).catch(err =>{
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id',(req, res)=>{
    Ailments.deleteAilment(req.params.id)
        .then(removed =>{
            if(removed > 0){
                res.status(200).json({removed: removed})
            }else{
                res.status(500).json({
                    message: 'This ailent failed to delete'
                })
            }
        }).catch(err =>{
            res.json({message: err.messages})
        })
})









module.exports = router;

