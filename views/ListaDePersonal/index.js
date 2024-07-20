const BotonAgregarLista = document.querySelector('#BotonAgregarLista');
const formAgregarLista = document.querySelector('#formAgregarLista');
const botonAgregar = document.querySelector('#botonAgregar');
const botonBuscar = document.querySelector('#botonBuscar');
const contenedorBuscar = document.querySelector('#contenedorBuscar');
const ContenedorDeAgregar = document.querySelector('#ContenedorDeAgregar');
const formBuscar = document.querySelector('#formBuscar');
const contenedorDeBusqueda = document.querySelector('#contenedorDeBusqueda');
const inputBuscar = document.querySelector('.Buscar');
const inputCedulaBuscar = document.querySelector('.cedulaBuscar');

botonBuscar.addEventListener('click', () => {
    if (contenedorBuscar.classList.contains('hidden')) {
        contenedorBuscar.classList.remove('hidden');
        botonBuscar.textContent = 'Ocultar';
    } else {
        contenedorBuscar.classList.add('hidden');
        botonBuscar.textContent = 'Buscar';
    }
});

botonAgregar.addEventListener('click', () => {
    if (ContenedorDeAgregar.classList.contains('hidden')) {
        ContenedorDeAgregar.classList.remove('hidden');
        botonAgregar.textContent = 'Ocultar';
    } else {
        ContenedorDeAgregar.classList.add('hidden');
        botonAgregar.textContent = 'Agregar';
    }
});

formAgregarLista.addEventListener('submit', e => {
    e.preventDefault();
    // Lógica para agregar una nueva lista
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