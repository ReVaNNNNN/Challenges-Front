class PokemonTCGCatalog {
  constructor() {
    this.pageSize = 4;
    this.currentPage = 1;
    this.cards = [];
    this.newCards = [];
    this.catalog = null;
    this.button = null;
    this.loader = null;
    this.search = null;
    this.info = null;

    this.API = 'https://api.pokemontcg.io';
    this.API_VERSION = 'v1';
    this.API_RESOURCE = 'cards';
    this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`;

    this.UiSelectors = {
      content: '[data-content]',
      button: '[data-button]',
      loader: '[data-loader]',
      card: '[data-card]',
      info: '[data-info]',
      search: 'search',
    };
  }

  async initializeCatalog() {
    this.catalog = document.querySelector(this.UiSelectors.content);
    this.button = document.querySelector(this.UiSelectors.button);
    this.loader = document.querySelector(this.UiSelectors.loader);
    this.info = document.querySelector(this.UiSelectors.info);
    this.search = document.getElementById(this.UiSelectors.search);

    this.pullCards();
    this.addEventListeners();
  }

  addEventListeners() {
    this.button.addEventListener('click', () => this.pullCards()); //rejestracja zdarzeń po kliknięciu w przycisk
    this.search.addEventListener('keyup', () => this.filterCards()); //rejestracja zdarzeń przy wyszukiwaniu
  }

  async pullCards() {
    this.toggleShowElement(this.loader, this.button);

    const { cards } = await this.fetchData( //wywołanie metody odpowiedzialnej za pobieranie danych z API
      `${this.API_ENDPOINT}?page=${this.currentPage}&pageSize=${this.pageSize}`,
    );

    this.toggleShowElement(this.loader, this.button);
    this.newCards = [...cards];
    this.cards = [...this.cards, ...cards];
    this.createCatalog(this.newCards);
    this.currentPage++;
  }

  toggleShowElement(...elements) {
    elements.forEach((element) => element.classList.toggle('hide')); //Ukrywanie i pokazywanie elemetów z klasą 'hide'
  }

  async fetchData(url) {
    try {
      const response = await fetch(url); //pobranie danych z API
      const parsedResponse = await response.json(); //rozpakowanie danych do formatu JSON
      
      return parsedResponse;
    } catch (error) {
      console.error(error);

      return;
    }
  }

  createCatalog(cards) { //dodajemy element do drzewa DOM przed końcem wskazanego elementu
    this.catalog.insertAdjacentHTML('beforeend', [ 
      cards.map((card) => this.createCard(card)).join(''),
    ]);
  }

  filterCards() {
    const searchQuery = this.search.value.toLowerCase();
    document.querySelectorAll('[data-card]').forEach((el) => el.classList.remove('hide'));

    const filteredCards = this.cards.filter(
      ({ name }) => !name.toLowerCase().includes(searchQuery),
    );

    filteredCards.length === this.cards.length 
    ? this.info.classList.remove('hide')
    : this.info.classList.add('hide');
    
    filteredCards.forEach(({ id }) =>
      document.getElementById(id).classList.add('hide'),
    );
  }

  createCard({ id, name, number, imageUrl, supertype, subtype, rarity }) {
    return `<article class="card" id=${id} data-card>
              <header class="card__header">
                <h2 class="card__heading">${name}</h2>
                <p class="card__number">Nr: ${number}</p>  
              </header>
              <img class="card__image" src="${imageUrl}"/>
              <p class="card__description"><span class="bold">Supertype:</span> ${supertype}</p>
              <p class="card__description ${
                subtype ? '' : 'hide'
              }"><span class="bold">Subtype:</span> ${subtype}</p>
              <p class="card__description ${
                rarity ? '' : 'hide'
              }"><span class="bold">Rarity:</span> ${rarity}</p>
            </article>`;
  }
}