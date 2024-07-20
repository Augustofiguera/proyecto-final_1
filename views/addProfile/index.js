( async () => {

try {
    const { data } = await axios.get('/api/personals', {
        withCredentials: true
    });
    
    data.forEach(personal => {
        
        const newPersonal = document.createElement('tr');
        newPersonal.id = personal.id;
        newPersonal.innerHTML = `
            <tr>
                <td class="px-4 py-3 border text-sm">
                    <button   class="editBtn bg-indigo-600 w-16 h-8 text-white font-bold rounded-lg m-1">editar</button>
                    <button  class="deleteBtn m-1 bg-indigo-600 w-16 h-8 text-white font-bold rounded-lg">eliminar</button>
                </td>
                <td class="px-4 py-3 border text-sm text-black">${personal.fullname}</td>
                <td class="px-4 py-3 border text-sm">${personal.cedula}</td>
                <td class="px-4 py-3 border text-sm">${personal.sereal_carnetpatria}</td>
                <td class="px-4 py-3 border text-sm">${personal.fecha_de_ingreso}</td>
                <td class="px-4 py-3 border text-sm">${personal.antiguedad}</td>
                <td class="px-4 py-3 border text-sm">${personal.tipo_del_personal}</td>
                <td class="px-4 py-3 border text-sm">${personal.codigo}</td>
                <td class="px-4 py-3 border text-sm">${personal.cargo_nominal}</td>
                <td class="px-4 py-3 border text-sm">${personal.funciones}</td>
                <td class="px-4 py-3 border text-sm">${personal.turno}</td>
                <td class="px-4 py-3 border text-sm">${personal.fecha_de_nacimiento}</td>
                <td class="px-4 py-3 border text-sm">${personal.edad}</td>
                <td class="px-4 py-3 border text-sm">${personal.estadoCivil}</td>
                <td class="px-4 py-3 border text-sm">${personal.direccion}</td>
                <td class="px-4 py-3 border text-sm">${personal.Municipio}</td>
                <td class="px-4 py-3 border text-sm">${personal.email}</td>
                <td class="px-4 py-3 border text-sm">${personal.telefono}</td>
                <td class="px-4 py-3 border text-sm">${personal.numeroDeHijos}</td>
                <td class="px-4 py-3 border text-sm">${personal.especialidad}</td>
            </tr>
        `;

        div.append(newPersonal);
        
    });
    
    
} catch (error) {
    window.location.pathname = '/login'
}


 })();


const btn_agregar = document.querySelector('#boton_agregar');
const form = document.querySelector('#form');
const div = document.querySelector('#list');
const inputName = document.querySelector('#fullname');
const inputCedula = document.querySelector('#cedula');
const inputSerealCarnetPatria = document.querySelector('#sereal_carnetpatria');
const inputFechaDeIngreso = document.querySelector('#fecha_de_ingreso');
const inputAntiguedad = document.querySelector('#antiguedad');
const inputTipoDelPersonal = document.querySelector('#tipo_del_personal');
const inputCodigo = document.querySelector('#codigo');
const inputCargoNominal = document.querySelector('#cargo_nominal');
const inputFunciones = document.querySelector('#funciones');
const inputTurno = document.querySelector('#turno');
const inputFechaDeNacimiento = document.querySelector('#fecha_de_nacimiento');
const inputEdad = document.querySelector('#edad');
const inputEstadoCivil = document.querySelector('#estadoCivil');
const inputDireccion = document.querySelector('#direccion');
const inputMunicipio = document.querySelector('#municipio');
const inputEmail = document.querySelector('#email');
const inputTelefono = document.querySelector('#telefono');
const inputNumeroDeHijos = document.querySelector('#numeroDeHijos');
const inputEspecialidad = document.querySelector('#especialidad');
const formBuscar = document.querySelector('#formBuscar');
const inputBuscar = document.querySelector('#Buscar');
const contenedorDeBusqueda = document.querySelector('#contenedorDeBusqueda');
const inputCedulaBuscar = document.querySelector('#cedulaBuscar');
const close = document.getElementById('close');

close.addEventListener('click', e => {
          window.location.pathname = '/login';
});



let validationFullname = false;
let validationCedula = false;
let validationSerealCarnet = false;
let validationFechaDeIngreso = false;
let validationAntiguedad = false;
let validationTipoDePersonal = false;
let validationCodigo = false;
let validationCargoDominal = false;
let validationFunciones = false;
let validationTurno = false;
let validationFechaDeNacimiento = false;
let validationEdad = false;
let validationEstadoCivil = false;
let validationDireccion = false;
let validationMunicipio = false;
let validationEmail = false;
let validationTelefono = false;
let validationEspecialidad = false;
let validationNumeroDeHijos = false;


const validation = (input, regexvalidation) => {
    //funcion de activar la funcion
    if (nameValidation && emailValidation && passwordValidation && password_confirmValidation) {
        btn.disabled = false;
        btn.classList.remove('disabled:opacity-60')
      } else {
        btn.disabled = true;
        btn.classList.add('disabled:opacity-60')
        
      }

    if (input.value === '') {
        input.classList.remove('outline-red-700,', 'outline-2', 'outline');
        input.classList.remove('outline-green-500,', 'outline-2', 'outline');
        input.classList.add('focus:outline-indigo-700');
        info.style.display = 'none';
    } else if (regexvalidation) {
        input.classList.remove('focus:outline-indigo-700');
        input.classList.add('outline-green-500', 'outline-2', 'outline');
        info.style.display = 'none';
     } else if (!regexvalidation) {
        input.classList.remove('focus:outline-indigo-700');
        input.classList.remove('outline-green-500', 'outline-2', 'outline');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
        info.style.display = 'block';
        
     }
}


btn_agregar.addEventListener('click', () => {
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
        btn_agregar.textContent = 'Ocultar Formulario';
    } else {
        form.classList.add('hidden');
        btn_agregar.textContent = 'Agregar una persona';
    }
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    try {
        const { data } = await axios.post('/api/personals', { 
            fullname: inputName.value,
            cedula: inputCedula.value,
            sereal_carnetpatria: inputSerealCarnetPatria.value,
            fecha_de_ingreso: inputFechaDeIngreso.value,
            antiguedad: inputAntiguedad.value,
            tipo_del_personal: inputTipoDelPersonal.value,
            codigo: inputCodigo.value,
            cargo_nominal: inputCargoNominal.value,
            funciones: inputFunciones.value,
            turno: inputTurno.value,
            fecha_de_nacimiento: inputFechaDeNacimiento.value,
            edad: inputEdad.value,
            estadoCivil: inputEstadoCivil.value,
            direccion: inputDireccion.value,
            Municipio: inputMunicipio.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
            numeroDeHijos: inputNumeroDeHijos.value,
            especialidad: inputEspecialidad.value,

        });

        
        const newPersonal = document.createElement('tr');
        newPersonal.id = data.id
        newPersonal.innerHTML = `
            <tr>
                <td class="px-4 py-3 border text-sm">
                    <button  class="deleteBtn m-1 bg-indigo-600 w-16 h-8 text-white font-bold rounded-lg">eliminar</button>
                </td>
                <td class="px-4 py-3 border font-medium text-sm">${inputName.value}</td>
                <td class="px-4 py-3 border text-sm">${inputCedula.value}</td>
                <td class="px-4 py-3 border text-sm">${inputSerealCarnetPatria.value}</td>
                <td class="px-4 py-3 border text-sm">${inputFechaDeIngreso.value}</td>
                <td class="px-4 py-3 border text-sm">${inputAntiguedad.value}</td>
                <td class="px-4 py-3 border text-sm">${inputTipoDelPersonal.value}</td>
                <td class="px-4 py-3 border text-sm">${inputCodigo.value}</td>
                <td class="px-4 py-3 border text-sm">${inputCargoNominal.value}</td>
                <td class="px-4 py-3 border text-sm">${inputFunciones.value}</td>
                <td class="px-4 py-3 border text-sm">${inputTurno.value}</td>
                <td class="px-4 py-3 border text-sm">${inputFechaDeNacimiento.value}</td>
                <td class="px-4 py-3 border text-sm">${inputEdad.value}</td>
                <td class="px-4 py-3 border text-sm">${inputEstadoCivil.value}</td>
                <td class="px-4 py-3 border text-sm">${inputDireccion.value}</td>
                <td class="px-4 py-3 border text-sm">${inputMunicipio.value}</td>
                <td class="px-4 py-3 border text-sm">${inputEmail.value}</td>
                <td class="px-4 py-3 border text-sm">${inputTelefono.value}</td>
                <td class="px-4 py-3 border text-sm">${inputNumeroDeHijos.value}</td>
                <td class="px-4 py-3 border text-sm">${inputEspecialidad.value}</td>
            </tr>
        `;
        div.append(newPersonal);
    } catch (error) {
        console.error(error);
    }
});


formBuscar.addEventListener('submit', async e => {
    e.preventDefault();
    
    const fullname = inputBuscar.value; // Asumiendo que el inputBuscar contiene el nombre a buscar
    const cedula = inputCedulaBuscar.value; // Nuevo input para buscar por cédula

    try {
        const { data } = await axios.get('/api/personals/search', {
            params: { fullname, cedula },
            withCredentials: true
        });

        // Limpiar la tabla antes de añadir los resultados
        contenedorDeBusqueda.innerHTML = '';

        data.forEach(personal => {
            const newPersonal = document.createElement('tr');
            newPersonal.id = data.id
            newPersonal.innerHTML = `

                          
          <td class="px-4 py-3 border text-sm" bg-white rounded-lg>
              <button class="editBtn bg-indigo-600 w-16 h-8 text-white font-bold rounded-lg m-1">editar</button>
              <button class="deleteBtn m-1 bg-indigo-600 w-16 h-8 text-white font-bold rounded-lg">eliminar</button>
          </td>
          <td class="px-4 py-3 border text-sm text-black">${personal.fullname}</td>
          <td class="px-4 py-3 border text-sm">${personal.cedula}</td>
          <td class="px-4 py-3 border text-sm">${personal.sereal_carnetpatria}</td>
          <td class="px-4 py-3 border text-sm">${personal.fecha_de_ingreso}</td>
          <td class="px-4 py-3 border text-sm">${personal.antiguedad}</td>
          <td class="px-4 py-3 border text-sm">${personal.tipo_del_personal}</td>
          <td class="px-4 py-3 border text-sm">${personal.codigo}</td>
          <td class="px-4 py-3 border text-sm">${personal.cargo_nominal}</td>
          <td class="px-4 py-3 border text-sm">${personal.funciones}</td>
          <td class="px-4 py-3 border text-sm">${personal.turno}</td>
          <td class="px-4 py-3 border text-sm">${personal.fecha_de_nacimiento}</td>
          <td class="px-4 py-3 border text-sm">${personal.edad}</td>
          <td class="px-4 py-3 border text-sm">${personal.estadoCivil}</td>
          <td class="px-4 py-3 border text-sm">${personal.direccion}</td>
          <td class="px-4 py-3 border text-sm">${personal.Municipio}</td>
          <td class="px-4 py-3 border text-sm">${personal.email}</td>
          <td class="px-4 py-3 border text-sm">${personal.telefono}</td>
          <td class="px-4 py-3 border text-sm">${personal.numeroDeHijos}</td>
          <td class="px-4 py-3 border text-sm">${personal.especialidad}</td>
        
            `;
            contenedorDeBusqueda.append(newPersonal);
        });
    } catch (error) {
        console.error(error);
        if (inputBuscar.value || inputCedulaBuscar.value === '') {
            contenedorDeBusqueda.innerHTML = ''
        }
    }
});

div.addEventListener('click', async e => {
    // Handle delete
    if (e.target.closest('.deleteBtn')) {
        const div = e.target.closest('.deleteBtn').parentElement.parentElement;
        await axios.delete(`/api/personals/${div.id}`);
        div.remove();
    }
});
contenedorDeBusqueda.addEventListener('click', async e => {
console.log(e.target.closest('.deleteBtn'));

    // Handle delete
    if (e.target.closest('.deleteBtn')) {
        const contenedorDeBusqueda = e.target.closest('.deleteBtn').parentElement.parentElement;
        await axios.delete(`/api/personals/${contenedorDeBusqueda.id}`);
        contenedorDeBusqueda.remove();
    }
});

    
  
    



















