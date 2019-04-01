const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];
listaMatriculas = [];
hbs.registerHelper('GuardarCurso', (Idcurso, Nomcurso, Valorcurso, Descripcioncurso, modalidadCurso, Intensidadcurso) =>{
    listar();
    let curso = {
        IdCurso: Idcurso,
        nombreCurso: Nomcurso,
        ValorCurso: Valorcurso,
        Descripcion: Descripcioncurso,
        modalidadCurso: modalidadCurso,
        Intensidadcurso: Intensidadcurso,
        Estado: "Disponible"
    };
    let duplicado = listaCursos.find(x=> x.IdCurso=== Idcurso);
    if (!duplicado) {
        listaCursos.push(curso);
        // console.log(listaEstudiantes);
        guardar();
    }
    else{
        console.log("El curso ya existe");
        return mensaje = "el curso ya existe";
    }
})

const guardar = () =>{
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./cursos.json', datos, (error)=>{
        if (error) throw (err);
        console.log('Archivo creado con éxito');        
    });   
    return mensaje = "El curso se ha guardado con exíto";
}

const listar = ()=>{    
    try {
        listaCursos = require('./cursos.json');
        
    } catch (error) {
        listaCursos = [];
    }
}

hbs.registerHelper('listar', () =>{
    listar();    
    let texto =  '<table class="table">'+
                    '<thead>'+
                        '<tr>'+
                            '<th scope="col">Id del curso</th>'+
                            '<th scope="col">Nombre</th>'+
                            '<th scope="col">valor</th>'+
                            '<th scope="col">Desripción</th>'+
                            '<th scope="col">Modalidad</th>'+
                            '<th scope="col">Intensidad horaria</th>'+
                            '<th scope="col">Estado</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';                                                 
                    
        listaCursos.forEach(element => {
        texto = texto + '<tr>'+
                            '<th scope="row">'+element.IdCurso+'</th>'+
                            '<td>'+element.nombreCurso+'</td>'+
                            '<td>'+element.ValorCurso+'</td>'+
                            '<td>'+element.Descripcion+'</td>' +
                            '<td>'+element.modalidadCurso+'</td>' +
                            '<td>'+element.Intensidadcurso+'</td>' +
                            '<td>'+element.Estado+'</td>' +
                        '</tr>';
    });

    texto = texto + '</tbody>'+'</table>';
    
    return texto;
});

hbs.registerHelper('listarInteresado', () =>{
    listar();
    
    let resultado = listaCursos.filter(x=> x.Estado === "Disponible");
    
    let texto =  '<table class="table">'+
                    '<thead>'+
                        '<tr>'+                            
                            '<th scope="col">Nombre</th>'+
                            '<th scope="col">valor</th>'+
                            '<th scope="col">Desripción</th>'+                            
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';
                                                 
                    
        resultado.forEach(element => {
        texto = texto + '<tr>'+                            
                            '<td>'+element.nombreCurso+'</td>'+
                            '<td>'+element.ValorCurso+'</td>'+
                            '<td>'+element.Descripcion+'</td>' + 
                            '<td >'+
                                '<form action="/verDetalle" method="GET"><button type="submit" name="btnVer" value="'+element.IdCurso+'" class="btn btn-primary">Detalles</button></form>'+
                            '</td>' +  
                            '<td>'+
                                '<form action="/aspirante" method="GET"><button type="submit" name="btnGuardar" value="'+element.IdCurso+'" class="btn btn-primary">Inscribirme</button></form>'+
                            '</td>' +                         
                        '</tr>';
    });

    texto = texto + '</tbody>'+'</table>';
    
    return texto;
});
 
hbs.registerHelper('BuscarCurso', (Idcurso) =>{
    
    listar();
    let resultado = listaCursos.filter(x=> x.IdCurso === Idcurso);
    
    let texto =  '<table class="table">'+
                    '<thead>'+
                        '<tr>'+                            
                            '<th scope="col">Desripción</th>'+
                            '<th scope="col">Modalidad</th>'+
                            '<th scope="col">Intensidad horaria</th>'+                            
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';
                                                 
                    
        resultado.forEach(element => {
            
            texto = texto + '<tr>'+                            
                            '<td>'+element.Descripcion+'</td>' +
                            '<td>'+element.modalidadCurso+'</td>' +
                            '<td>'+element.Intensidadcurso+'</td>' +                                                       
                        '</tr>';
    });

    texto = texto + '</tbody>'+'</table>';
    
    return texto;
    
});

hbs.registerHelper('GuardarAspirante', (idCurso, documento, nombre, correo, telefono) =>{
    listarMatriculas();
    console.log("idcurso: "+idCurso);
    console.log("documento: "+ documento);
    let matricula = {
        IdCurso: idCurso,
        documento: documento,
        nombre: nombre,
        correo: correo,
        telefono: telefono       
    };
    console.log("mATRICULA: "+matricula);
    let duplicado = listaMatriculas.find(x=> x.IdCurso === idCurso && x.documento === documento);
    if (!duplicado) {
        listaMatriculas.push(matricula);
        // console.log(listaEstudiantes);
        //guardarMatricula();
        let datos = JSON.stringify(listaMatriculas);
        fs.writeFile('./matriculas.json', datos, (error)=>{
            if (error) throw (err);
            console.log('Archivo creado con éxito');  
                  
        });  
        return mensaje = "se ha matriculado con exíto";       
    }
    else{
        console.log("usted ya esta matriculado en este curso");
        return mensaje = "usted ya esta matriculado en este curso";
    }
})

const listarMatriculas = ()=>{    
    try {
        listaMatriculas = require('../src/matriculas.json');
        console.log(listaMatriculas);
    } catch (error) {
        listaMatriculas = [];
    }
}

const guardarMatricula = () =>{
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./matriculas.json', datos, (error)=>{
        if (error) throw (err);
        console.log('Archivo creado con éxito');        
    }); 
}

hbs.registerHelper('listarDisponibles', () =>{
    listar();    
    let resultado = listaCursos.filter(x=> x.Estado === "Disponible");
    
    let texto =  '<table class="table">'+
                    '<thead>'+
                        '<tr>'+                            
                            '<th scope="col">Nombre</th>'+
                            '<th scope="col">valor</th>'+
                            '<th scope="col">Desripción</th>'+                            
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';
                                                 
                    
        resultado.forEach(element => {
        texto = texto + '<tr>'+                            
                            '<td>'+element.nombreCurso+'</td>'+
                            '<td>'+element.ValorCurso+'</td>'+
                            '<td>'+element.Descripcion+'</td>' + 
                            '<td >'+
                                '<form action="/verInscritos" method="GET"><button type="submit" name="btnVer" value="'+element.IdCurso+'" class="btn btn-primary">Ver inscritos</button></form>'+
                            '</td>' + 
                            '<td >'+
                                '<form action="/Desabilitar" method="GET"><button type="submit" name="btnVer" value="'+element.IdCurso+'" class="btn btn-primary">Desabilitar curso</button></form>'+
                            '</td>' +                
                        '</tr>';
    });

    texto = texto + '</tbody>'+'</table>';
    
    return texto;
});

hbs.registerHelper('BuscarInscritos', (Idcurso) =>{
    
    listarMatriculas();
    console.log(Idcurso)
    let resultado = listaMatriculas.filter(x=> x.IdCurso === Idcurso);
    
    let texto =  '<table class="table">'+
                    '<thead>'+
                        '<tr>'+                            
                            '<th scope="col">Documento</th>'+
                            '<th scope="col">Nombre</th>'+
                            '<th scope="col">Correo</th>'+
                            '<th scope="col">Telefono</th>'+                            
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';
                                                 
                    
        resultado.forEach(element => {
            
            texto = texto + '<tr>'+                            
                            '<td>'+element.documento+'</td>' +
                            '<td>'+element.nombre+'</td>' +
                            '<td>'+element.correo+'</td>' +
                            '<td>'+element.telefono+'</td>' +                                                       
                        '</tr>';
    });

    texto = texto + '</tbody>'+'</table>';
    
    return texto;
    
});
