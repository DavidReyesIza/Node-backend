

const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;


//Create and Save a new Tutorial
exports.create = (req, res) =>{

    if(!req.body.title){
        res.status(400).send({
            message: "content can not be empty!"
        });
        return;
    }

    //Create tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    //save tutorial in the dtabase
    Tutorial.create(tutorial)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error ocurred while creating the Tutorial"
        })
    })




};

//Retrieve all tutorials form the database.
exports.findAll = (req, res)=>{

    const title = req.query.title;
    var condition = title ? {title : {[Op.like] : `%${title}%`}} : null

    Tutorial.findAll({where: condition})
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || "some error ocurred while retrieving tutorials"
            });
        });


};

exports.findOne = (req, res) =>{

    const id = req.params.id;

    Tutorial.findByPk(id)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message: "error retrieving tutorial with id=" +id
        })
    })

}

exports.update = (req, res) =>{

    const id = req.params.id;

    Tutorial.update(req.body,{
        where: {id: id}
    })
    .then(num =>{
        if(num == 1){
            res.send({
                message: "tutorial was updated sucessfully"
            })
        } else {
            res.send({
                message: `cannot update Tutorial with id=${id}`
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Error updating Tutorial with id= "+id
        })
    })

}

exports.delete = (req, res)=>{

    const id = req.params.id;

    Tutorial.destroy(({
        where: {id: id}
    }))
    .then(num =>{
        if(num == 1){
            res.send({
                message: "Tutorial was deleted successfully!"
            })
        } else {
            res.send({
                message: `cannot delete Tutorial with that id, maybe tutorial was not found`
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "could not delete tutorial with that id "
        })
    })


};

exports.deleteAll = (req,res) => {

    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums =>{
        res.send({message : `${nums} Tutorias were deleted`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while removing all tutorials"
        })
    })
    
}

exports.findAllPublished = (req, res) =>{

    Tutorial.findAll({ where: {published:true}})
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "Some error has ocurred while retrieving tutorials"
        })
    })

};