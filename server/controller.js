const { Pool, Client} = require('pg');
const config = require('../config.json');
const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`
const poolPG = new Pool({
    connectionString: conString,
  })



const controller = {
  getAll: (req, res) => {
    poolPG.query(`Select name from productListTable`)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(400).send(err))
    },
  getOne: (req, res) => {
    
    var productID = parseInt(req.params.productID);
   poolPG.query(`SELECT * FROM productTable where productid = ${productID};`)
   
    .then((data) => {
      res.status(200).send(data.rows);
    
  })
      .catch((err) => res.status(400).send(err))
    },
    getPreferences: (req, res) => {
    
      var productID = parseInt(req.params.productID);
     poolPG.query(`SELECT * FROM userTable where id = ${productID};`)
     
      .then((data) => {
        res.status(200).send(data.rows);
      
    })
        .catch((err) => res.status(400).send(err))
      },
      updatePreferences: (req, res) => {
    
        console.log(req.body)
        var productID = parseInt(req.params.productID);
        let {hrc} = req.body;
        let {peta} = req.body;
        let {fairtrade} =req.body; 
       poolPG.query(`UPDATE userTable SET hrc = ${hrc}, peta = ${peta}, fairtrade = ${fairtrade} WHERE id = ${productID};`)
       
        .then((data) => {
          res.status(200).send(data.rows);
        
      })
          .catch((err) => res.status(400).send(err))
        },
}

module.exports = controller;