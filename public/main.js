
let limit = 60;
let offset = 0;
let search = '';


const app = document.querySelector('#app');
const main_container = document.createElement('main');
const search_container = document.createElement('section');
const footer_container = document.createElement('footer');

document.body.className = 'flex items-center justify-center bg-neutral-900 min-h-screen text-white';

app.className = 'max-w-[90%] w-[1080px]';
app.append(main_container);
app.insertAdjacentElement("afterbegin", search_container)
app.insertAdjacentElement("beforeend", footer_container)

main_container.setAttribute('id', 'main_container');
main_container.className = 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3';


async function simpsonsList() {
  try {
    const BASE_URL = `${window.location.href}api/simpsons?limit=${limit}&offset=${offset}&search=${search}`;
    const response = await fetch(BASE_URL);
    const simpsons = await response.json();
    return simpsons;
  } catch (error) {
    handleError(error);
  }
}

async function printSimpsonsList() {
  try {
    const simpsons_list_raw = await simpsonsList();

    const card_container = document.querySelectorAll('.card-container')
    if (card_container) card_container.forEach(card => card.remove())

    const simpsons_list = simpsons_list_raw.map(character => {
      const image_character = document.createElement('img');
      image_character.className = 'w-[70px] h-[70px] object-cover rounded bg-neutral-500';
      image_character.setAttribute('src', character?.image);
      image_character.setAttribute('loading', 'lazy');

      const name_character = document.createElement('h3');
      name_character.className = 'truncate font-semibold';
      name_character.textContent = character?.name;

      const card = document.createElement('div');
      card.dataset.character = JSON.stringify(character);
      card.className =
        'bg-neutral-800 rounded-lg py-3 px-5 flex items-center gap-5 ' +
        'rounded cursor-pointer hover:bg-[#FFDE00] hover:text-neutral-900 hover:shadow-lg ease-in-out duration-300 card-container';
      card.appendChild(image_character);
      card.appendChild(name_character);

      return card;
    });

    main_container.append(...simpsons_list);
  } catch (error) {
    handleError(error);
  }
}

function printSearchContainer() {
  const logo = document.createElement('img');
  logo.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/9/98/The_Simpsons_yellow_logo.svg');
  logo.className = 'w-[350px] max-w-full mb-3 mx-auto'

  const input_search = document.createElement('input');
  input_search.onkeyup = async (e) => {
    search = e.target.value;
    await printSimpsonsList();
  }
  input_search.className = 'w-full sm:w-[350px] max-w-full h-[48px] px-3 rounded focus:outline-none focus:border-[#FFDE00] border-4 text-neutral-900';
  input_search.type = 'search';
  input_search.placeholder = 'Buscar por nombre ...';

  const documentation = document.createElement('a');
  documentation.setAttribute('href', '/docs.html');
  documentation.className = 'text-sm hover:text-[#FFDE00] font-bold cursor-pointer block text-right mt-3';
  documentation.textContent = 'Ver documentación'

  search_container.className = 'text-center mb-8 mt-16';
  search_container.append(logo, input_search, documentation);
}

function printFooterContainer() {
  const stack_container = document.createElement('small');
  stack_container.textContent = 'Made with NestJS, MongoDB, TailwindCSS';

  const profile_container = document.createElement('a');
  profile_container.textContent = '@carloscdev';
  profile_container.className = 'cursor-pointer text-[#FFDE00] font-semibold';
  profile_container.setAttribute('href', 'https://me.carlosc.dev');
  profile_container.setAttribute('target', '_blank');

  footer_container.className = 'text-center max-w-[90%] mx-auto my-16 grid';
  footer_container.append(stack_container, profile_container);
}

function handleError(error) {
  console.error('ERROR CUSTOM LOG: ',error);
}

function root() {
  printSimpsonsList();
  printSearchContainer();
  printFooterContainer();
}

root();