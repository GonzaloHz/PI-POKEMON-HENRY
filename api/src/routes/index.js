const router  = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokesApi, getAllPokes, loadingPokesDB } = require ('../utils/utils');
const { Pokemon, Types } = require("../db");
const { Op } = require('sequelize');
// const axios = require("axios");

// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons', async (req, res) => {
    
    let {name} = req.query;
    
    try {
        if(name) {
            const myPokes= await getAllPokes()
            const chosenPoke = myPokes.filter(p=>p.name.toLowerCase()===name.toLowerCase())
            if(chosenPoke){
                return res.status(200).json(chosenPoke);
            }
            return res.status(404).send('There is no pokemon with that name')
     
        } else {
            const allPokes = await getAllPokes();
            return res.status(200).json(allPokes)
        }
    } catch (error) {
        res.status(404).send('Error en el catch')
    }
})


router.get('/pokemons/:id', async (req, res)=>{
    try{
    const id = req.params.id
    const allPokes = await getAllPokes()
        if(id){
            const filteredPoke = allPokes.filter(p=>p.id==id)
            // console.log(filteredPoke)
            if(filteredPoke.length){return res.json(filteredPoke)}
            return res.status(404).send('There is no poke with that id')
        }
        
    }catch(error){
        console.log(error)
    }
})


router.post('/pokemons', async (req, res)=>{
    try{
    const { name, hp, attack, defense, speed, height, weight, strength, img } = req.body;
    if(!name){
        return res.status(404).send('Name not found')
    }
    // const newPoke = await createPokemon(name, hp, attack, defense, speed, height, weight, strength);
    const newPoke = await Pokemon.create({
        name: name,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height, 
        weight: weight,
        strength: strength,
        img:img
    })
        
    let typesDB = await  Types.findAll({
        where:{
            name:req.body.types 
        }
    })
    // const array=[];
    // array.push(newPoke)
    // array.push(req.body.types)
    await newPoke.addTypes(typesDB)
    
    //  res.send(array)
    }catch(error){console.log('se rompio algo')}

})

//ROUTE DELETE
router.delete('/pokemons/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const dltPoke = await Pokemon.findByPk(id)
        if(dltPoke){
            dltPoke.destroy()
            return res.send("poke deleted")
        }
        else{
            return res.send("need a valid id")}
            

    }catch(error){
        console.log(error)
    }
})

//ROUTE PUT
router.put('/pokemons/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const udtPoke = await Pokemon.findByPk(id)
        if(udtPoke){
            udtPoke.update({        
                name: req.body.name,
                hp: req.body.hp,
                attack: req.body.attack,
                defense: req.body.defense,
                speed: req.body.speed,
                height: req.body.height, 
                weight: req.body.weight,
                strength: req.body.strength,
                img:req.body.img
            })
            let typesDB = await Types.findAll({
                where:{
                    name: {
                        [Op.in]:req.body.types}
                }
            })
            await udtPoke.setTypes(typesDB);
            // return res.send("Poke updated")
        }
        else{
            return res.send("need a valid id")
        }
    }catch(error){
        console.log("PROBLEMA EN EL PUT")
    }
})

router.get('/types', async (req, res)=>{
    await loadingPokesDB();
    try{
    const findTypes = await Types.findAll();
     res.send(findTypes.map(t=>{
        return {
            id:t.id,
            name:t.name
        }
    }))
    }catch(error){console.log(error)}
})

module.exports = router;
