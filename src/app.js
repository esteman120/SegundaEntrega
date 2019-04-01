const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');

const directorioPublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
app.use(express.static(directorioPublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/views/interesado.hbs', (req, res)=>{
    res.render('interesado');
});

app.post('/Coordinador', (req, res)=>{ 
    console.log(req.body)
    res.render('Coordinador',{
        Idcurso: req.body.Idcurso,
        Nomcurso: req.body.Nomcurso,
        Valorcurso: req.body.Valorcurso,
        Descripcioncurso: req.body.Descripcioncurso,
        modalidadCurso: req.body.modalidadCurso,
        Intensidadcurso: req.body.Intensidadcurso 
    });
});

app.get('/verDetalle', (req, res)=>{ 
    console.log(req.query)
    res.render('verDetalle',{
        Idcurso: req.query.btnVer       
    });
});

app.get('/aspirante', (req, res)=>{ 
   
    idcurso= req.query.btnGuardar;
    res.render('aspirante',{
        Idcurso: req.query.btnGuardar       
    });
});

idcurso="";

app.post('/GuardarAspirante', (req, res)=>{ 
    console.log(idcurso)
    res.render('GuardarAspirante',{
        idCurso: idcurso,
        documento: req.body.documento,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono       
    });
});

app.get('/views/CoordinadorEducacion.hbs', (req, res)=>{
    res.render('CoordinadorEducacion');
});

app.get('/verInscritos', (req, res)=>{ 
    console.log(req.query)
    res.render('verInscritos',{
        Idcurso: req.query.btnVer       
    });
});

app.listen(3000, ()=>{
    console.log("escuchando el puerto 3000")
})