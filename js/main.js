
//Definición de funciones
function mostrarImagen(){
    const fileInput = document.getElementById("imgInput");
    const imgPreview = document.getElementById("imgPreview");
    const file = fileInput.files[0];
    var supportImages = ["image/jpeg","image/png"];
    if(file){
        if(supportImages.indexOf(file.type) != -1){
            const reader = new FileReader();
            reader.onload = function(e){
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = '15em';
                img.style.maxHeight = '15em';
                imgPreview.innerHTML = '';
                imgPreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
        else{
            imgPreview.innerHTML = 'Archivo no válido.';
        }
    }
    else{
        imgPreview.innerHTML = 'No se ha seleccionado ninguna imagen.';
    }
}

function actualizarCiudades(){
    const ciudadesPorPais = {
        ecuador: ['Quito', 'Cuenca'],
        peru: ['Lima', 'Cusco'],
        colombia: ['Bogotá', 'Medellín']
    };
    const paisSeleccionado = document.getElementById("pais");
    const ciudadSeleccionada = document.getElementById("ciudad");
    ciudadSeleccionada.innerHTML = '';
    //Obtener las ciudades seleccionadas del país y agregar a la lista
    const ciudades = ciudadesPorPais[paisSeleccionado.value];
    //Definición de bucle for each
    ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.className = "ciudades_gen"
        option.text = ciudad;
        //option.value = ciudad;
        ciudadSeleccionada.add(option)
    });
}

function calcularEdadCompleta(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento)
    var ageDifMs = Date.now() - fechaNac.getTime();
    var ageDate = new Date(ageDifMs); 
    var anios = Math.abs(ageDate.getUTCFullYear() - 1970);
    var meses = Math.abs(ageDate.getUTCMonth());
    var dias = Math.abs(ageDate.getUTCDate() - 1);
    var horas = Math.abs(ageDate.getUTCHours());

    const edadCompleta = anios+" años "+meses+" meses "+dias+" días "+horas+" horas "
    return edadCompleta;
  }
function limpiarCampos(){
    const imgPreview = document.getElementById("imgPreview");
    imgPreview.innerHTML = 'No se ha seleccionado ninguna imagen.';
    //imgPreview.appendChild();
    //reader.readAsDataURL("");
    document.getElementById('datosPersonales').reset();
    const pais = document.getElementById("pais");
}
function actualizarTabla(){
    var cedula = document.getElementById("cedula");
    const nombres = document.getElementById("nombre");
    const apellidos = document.getElementById("apellido");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono");
    const fech_nac = document.getElementById("fech-nac");
    const genero = document.querySelector('input[name="genero"]:checked');
    //genero radio
    const genero_m = document.getElementById("genero_m");
    const genero_f = document.getElementById("genero_f");
    const genero_o = document.getElementById("otro");
    //-------------
    //Alergias radio
    const alergia_si = document.getElementById("alergia_si");
    const alergia_no = document.getElementById("alergia_no");
    //--------
    const pais = document.getElementById("pais").options[document.getElementById('pais').selectedIndex].text;
    const ciudad = document.getElementById("ciudad").options[document.getElementById('ciudad').selectedIndex].text;
    const fecha_consulta = new Date();
    const lugar_nacimiento = pais+"/"+ciudad;
    var validacion = false;
    //Validaciones de los datos ingresados
    if(cedula.value.length == 0){
        alert("Campo cédula no puede estar vacío");
        validacion = false
        return;
    }
    else if(nombres.value.length == 0){
        alert("Campo nombre no debe estar vacío");
        validacion = false;
        return;
    }
    else if(apellidos.value.length == 0){
        alert("Campo apellido no debe estar vacío");
        validacion = false;
        return;
    }
    else if(!alergia_si.checked && !alergia_no.checked){
        alert("Debe seleccionar si tiene alergías");
        validacion = false;
        return;
    }
    else if(fech_nac.value.length == 0){
        alert("Ingrese la fecha de nacimiento");
        validacion = false;
        return;
    }
    if(validaCedula(cedula.value)){
        validacion = true;
    }
    else{
        cedula.value = "";
        validacion = false;
    }

    //Cargar valores a la tabla
    if(validacion)
    {
        const cuerpoTabla = document.getElementById("cuerpoTabla");
        const fila = cuerpoTabla.insertRow();
        fila.insertCell().textContent = cedula.value;
        fila.insertCell().textContent = nombres.value;
        fila.insertCell().textContent = apellidos.value;
        fila.insertCell().textContent = direccion.value;
        fila.insertCell().textContent = telefono.value;
        fila.insertCell().textContent = calcularEdadCompleta(fech_nac.value);
        
        if(genero_m.checked)
        {
            fila.insertCell().textContent = genero_m.value;
        }
        else if(genero_f.checked){
            fila.insertCell().textContent = genero_f.value;
        }
        else{
            fila.insertCell().textContent = genero_o.value;
        }
        if(alergia_si.checked){
            fila.insertCell().textContent = alergia_si.value;
        }else{
            fila.insertCell().textContent = alergia_no.value;
        }
        
        fila.insertCell().textContent = lugar_nacimiento;
        fila.insertCell().textContent = fecha_consulta.value;
    
        limpiarCampos();
    }
}
function validaCedula(cedula){
    var cedula = cedula;
    var total = 0;
    var longitud = cedula.length;
    var longcheck = longitud - 1;

    if(cedula !== "" && longitud == 10){
        for(i = 0; i < longcheck; i++){
            if(i%2 === 0){
                var aux = cedula.charAt(i) * 2;
                if(aux > 9) aux -= 9;
                total += aux;
            }else{
                total += parseInt(cedula.charAt(i));
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if(cedula.charAt(longitud-1) == total){
            return true;
        }else{
            alert("CÉDULA NO VALIDA")
            return false;
        }
    }else{
        alert("CÉDULA NO VALIDA")
        return false;
    }
}
// ---------------------------------------------------------------------------