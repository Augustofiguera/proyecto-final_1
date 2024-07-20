const div = document.querySelector('#navLateral');




const createNavLateral = () => {
    div.innerHTML = `
     
  <div id="sidebar" class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform -translate-x-full transition-transform duration-300 z-50">
    <button id="closeButton" class="text-white mb-4">
      <i class="fas fa-times"></i> Cerrar
    </button>
    <nav>
      <ul class="space-y-2">
       
        <li>
          <a href="/addProfile" class="p-2 hover:bg-gray-700 flex items-center">
            <i class="fas fa-chevron-right mr-2 text-xs"></i>
            Agregar Personal
          </a>
        </li>
        
        
        
        <!-- Agrega más enlaces para la navegación lateral -->
      </ul>
    </nav>
  </div>

   `
  
};

// const close = document.querySelector('#close');

// close.addEventListener('click', async e => {
//   try {
//     await axios.get('/api/logout');
//     window.location.pathname = '/login'
//  } catch (error) {
//   console.log(error);
//  }
// })




createNavLateral();