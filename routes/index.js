const router = require('express').Router();
const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, '../data/departments.json'), 'utf8', (err, data1) => {
      if (err) {
        res.status(500).send('Error reading file');
        return;
      }


      fs.readFile(path.join(__dirname, '../data/towns.json'), 'utf8', (err, data2) => {
        if (err) {
          res.status(500).send('Error reading file');
          return;
        }
    
        let departments = JSON.parse(data1);
        let towns = JSON.parse(data2);
        
        departments.sort((a, b) => a.name.localeCompare(b.name));
        towns.sort((a, b) => a.name.localeCompare(b.name));
  
        res.render('index', { title: "Pagina principal", departments: departments, towns: towns});
      });
    });
  });


module.exports = router;