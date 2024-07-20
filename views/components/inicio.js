const div = document.querySelector('#div');


const createInicio = async ()  => {
  

  div.innerHTML = `
<nav class="bg-black opacity-90 p-4 flex items-center justify-between w-full fixed top-0 z-20">
    <div class="flex items-center">
      <button id="menuButton" class="text-white text-2xl mr-4">
        <i class="fas fa-bars"></i>
      </button>
      <h1 class="text-white font-bold text-xl">Departamento de Enfermería</h1>
    </div>
    <div class="flex items-center space-x-4">
    
      <span class="font-bold text-white">Bienvenidos</span>
      <i class="fas fa-user-circle text-white text-2xl"></i>
    </div>
  </nav>

  `
  document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.getElementById('closeButton');
    const close = document.querySelector('#close');

// close.addEventListener('click', async e => {
//   try {
//     await axios.get('/api/logout');
//     window.location.pathname = '/login'
//  } catch (error) {
//   console.log(error);
//  }
// })

    menuButton.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full'); 
    });

    closeButton.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
    });
  });
};


    
      

    





createInicio();



