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
  
        fs.readFile(path.join(__dirname, '../data/people.json'), 'utf8', (err, data3) => {
          if (err) {
            res.status(500).send('Error reading file');
            return;
          }
      
          let people = JSON.parse(data3);
        
          people.sort((a, b) => a.name.localeCompare(b.name));
    
          res.render('index', { title: "Pagina principal", departments: departments, towns: towns, people});
        });
      });
    });
  });

  
  router.post('/save', (req, res) =>{
    const {id, name, age, department, town} = req.body;

    const newPerson = {id, name, age, department, town}

    const filePath = path.join(__dirname, '../data/people.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err && err.code === 'ENOENT') {
          fs.writeFile(filePath, JSON.stringify([newPerson], null, 2), (err) => {
              if (err) {
                  res.status(500).send('Error al guardar los datos');
              } else {
                  res.redirect('/');
              }
          });
      } else if (err) {
          res.status(500).send('Error al leer el archivo');
      } else {
          let people = JSON.parse(data);
          people.push(newPerson);

          fs.writeFile(filePath, JSON.stringify(people, null, 2), (err) => {
              if (err) {
                  res.status(500).send('Error al guardar los datos');
              } else {
                  res.redirect('/');
              }
          });
      }
  });
  })

module.exports = router;