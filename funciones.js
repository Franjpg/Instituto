
$(document).ready(function(){

var alumnos;
function cerrarVentana(){
    $("#formulario").fadeOut();
    $("#fondoVentana").fadeOut();
}
}

/*
LOCAL STORAGE
Se utilizan dos cosas:

1) localStorage.setItem("Nombre", acá va la cadena de texto que queremos guardar) Esto se utiliza para guardar una cadena de texto en el navegador, con el nombre que queramos,
esta información no se borrará aunque cerremos la pestaña, el navegador, etc.
2) localStorage.getItem("Nombre") Esto se utiliza para acceder a la cadena de texto almacenada en el navegador, mediante el nombre clave que nosotros le asignamos anteriormente.

/* 
Este if de abajo lo que hace es: Comprobar que en la memoria del navegador, no se haya inicializado una clave llamada alumnosNav,
en caso de que no haya ninguna con ese nombre, lo que hace es llamar al ajax para que cargue el array de objetos que sebastián hizo en su página. 
*/
if(localStorage.getItem("alumnosNav") == undefined){ 

   $.ajax({
    url:'http://www.scaggiano.com.uy/json.js',
    data:{
      format: 'json'
    },
    error: function(){
    },
    success: function(data){
      alumnos = JSON.parse(data);
      // Utilizamos "localStorge.setItem" para guardar el array de objetos que sebastián puso en su web, en el navegador, con la clave "alumnosNav"
      localStorage.setItem("alumnosNav", data); 
        refrescarDatos();
      },
  });
}
/* 
Este else lo que hace es actuar cuando nosotros SÍ tenemos definido una clave en el navegador, que en mi caso es: alumnosNav
entonces lo que hace es tomar esa cadena de texto que contiene nuestro array de objetos, parsearla a la notación JSON y almacenarla en nuestra variable alumnos.
*/
else {
  alumnos = JSON.parse(localStorage.getItem("alumnosNav"));
  refrescarDatos();
}

// Creación del objeto
function Alumno(nom, apell, ed, em, url){
  this.nombre = nom;
  this.apellido = apell;
  this.edad = ed;
  this.email = em;
  this.src = url;
}

function refrescarDatos(){ // Agarra todo lo que esté en el array de objetos "alumnos", y lo imprime en la tabla html. Se utiliza varias veces a lo largo de nuestro javascript para actualizar datos.
    var contenido = "";
    for(var i =0; i < alumnos.length; i++){
        contenido += "<tr><td><img width='100px' src='" + alumnos[i].src + "'/></td>" + "<td>" + alumnos[i].nombre + "</td><td>" + 	alumnos[i].apellido + "</td><td>" + alumnos[i].edad + "</td><td>" + alumnos[i].email + "</td></tr>";
    }
    $("#cuerpoTabla").html(contenido);
  }

// Todo ésto es código para comprobar que el usuario ingrese datos en todos los input y no deje ninguno vacío, de lo contrario le saldrá error.
$("#boton").click(function(){
    nombreIngresado = $("#nombre").val();
    apellidoIngresado = $("#apellido").val();
    edadIngresada = parseInt( $("#edad").val() );
    emailIngresado = $("#email").val();
    url = $("#foto").val();

    if (nombreIngresado == "") {
      $("#errornombre").fadeIn(400);
    }
    else {
      $("#errornombre").fadeOut(400);
    }

    if (apellidoIngresado == "") {
      $("#errorapellido").fadeIn(400);
    }
    else {
      $("#errorapellido").fadeOut(400);
    }

    if (isNaN(edadIngresada)) {
      $("#erroredad").fadeIn(400);
    }
    else if (edadIngresada <= 0) {
      $("#erroredad").fadeIn(400);
    }
    else {
      $("#erroredad").fadeOut(400);
    }

    if (emailIngresado == "") {
      $("#erroremail").fadeIn(400);
    }
    else {
      $("#erroremail").fadeOut(400);
    }

    // Acá compruebo que si el usuario ingresó información en todos los campos, ahí sí ejecuto el código que crea el nuevo alumno.
    if (nombreIngresado && apellidoIngresado && edadIngresada && emailIngresado != ""){
      var nuevoAlumno = new Alumno(nombreIngresado, apellidoIngresado, edadIngresada, emailIngresado, url); // Toma valores del input.
      alumnos.push(nuevoAlumno); // Coloca el nuevo alumno fresquito, recién ingresado, en nuestro array de objetos llamado alumnos.
      /* 
      Esta línea siguiente es la más importante, lo que hace es tomar nuestro array de objetos llamado "alumnos" 
      que en éste momento se encuentra ya con nuestro NUEVO ALUMNO, y lo parsea a texto para guardarlo en el navegador, de esa forma
      cuando cerramos y abrimos el navegador, se ejecuta el else de nuestro primer IF, trayendo ese array de objetos almacenado en una cadena de texto
      en el navegador, lo parsea a la notación JSON mediante JSON.stringyfy y lo muestra ya con el nuevo alumno ingresado.
      */
      localStorage.setItem("alumnosNav", JSON.stringify(alumnos));

      var contenido = "";

      $("#cuerpoTabla").html(contenido);
      $("#nombre").val("")
      $("#apellido").val("")
      $("#edad").val("")
      $("#email").val("")

      cerrarVentana();
    } // Cierre de if
    refrescarDatos();
  });

  // Funciones visuales

  $("#verVentana").click(function(){
  	$("#formulario").fadeIn();
    $("#fondoVentana").fadeIn();
  });

  $("#cerrarVentana").click(function(){
		cerrarVentana();
  });

  $("#fondoVentana").click(function(){
    cerrarVentana();
  });

});
