const headerDesktop = document.querySelector('[data-js-header-desktop]');
const catalogWrapper = headerDesktop.querySelector('[data-js-catalog-wrapper]');
const catalog = headerDesktop.querySelector('[data-js-catalog]');
const catalogItemCollection = catalog.querySelectorAll('[data-js-catalog-item]');
const catalogButton = headerDesktop.querySelector('[data-js-catalog-button]');
const catalogButtonText = catalogButton.querySelector('[data-js-catalog-button-text]');

let isCatalogOpened = false;
let openedCatalog2Level = null;
let openedCatalog3Level = null;

let catalogWidth = 0;
let catalog2LevelWidth = 0;
let catalog3LevelWidth = 0;

const getSubcatalog = (el) => el.querySelector('[data-js-subcatalog]');

const updateCatalogSize = () => {
  catalogWrapper.style.width = `${catalogWidth}px`;
};

const closeCatalog3Level = (item) => {
  item.classList.remove('is-subcatalog-opened');

  openedCatalog3Level = null;

  catalogWidth = catalogWidth - catalog3LevelWidth;
  catalog3LevelWidth = 0;
  updateCatalogSize();
};

const openCatalog3Level = (item, catalog3Level) => {
  item.classList.add('is-subcatalog-opened');

  if (openedCatalog3Level) {
    closeCatalog3Level(openedCatalog3Level.parentNode);
  }

  openedCatalog3Level = catalog3Level;

  catalog3LevelWidth = catalog3Level.offsetWidth;
  catalogWidth = catalogWidth + catalog3LevelWidth;
  updateCatalogSize();
};

const toggleCatalog3Level = function(evt) {
  const item = evt.target.parentNode.parentNode;

  const catalog3Level = getSubcatalog(item);

  if (item.classList.contains('is-subcatalog-opened')) {
    closeCatalog3Level(item);
  } else {
    openCatalog3Level(item, catalog3Level);
  }
};

const closeCatalog2Level = (item) => {
  catalogWidth = catalogWidth - catalog2LevelWidth;

  item.classList.remove('is-subcatalog-opened');

  catalog2LevelWidth = 0;
  updateCatalogSize();

  openedCatalog2Level = null;

  const catalog2Level = getSubcatalog(item);
  const catalog2LevelItemCollection = catalog2Level.querySelectorAll('[data-js-subcatalog-item]');

  catalog2LevelItemCollection.forEach((catalog2LevelItem) => {
    const catalog2LevelItemButton = catalog2LevelItem.querySelector('[data-js-subcatalog-item-button]');

    if (catalog2LevelItemButton.hasAttribute('data-js-subcatalog-item-button')) {
      catalog2LevelItemButton.removeEventListener('click', toggleCatalog3Level);
    }
  });

  if (openedCatalog3Level) {
    closeCatalog3Level(openedCatalog3Level.parentNode);
  }
};

const openCatalog2Level = (item) => {
  const catalog2Level = getSubcatalog(item);

  item.classList.add('is-subcatalog-opened');

  if (openedCatalog2Level) {
    closeCatalog2Level(openedCatalog2Level.parentNode);
  }

  openedCatalog2Level = catalog2Level;

  catalog2LevelWidth = catalog2Level.offsetWidth;
  catalogWidth = catalogWidth + catalog2LevelWidth;

  updateCatalogSize();

  const catalog2LevelItemCollection = catalog2Level.querySelectorAll('[data-js-subcatalog-item]');

  catalog2LevelItemCollection.forEach((catalog2LevelItem) => {
    const catalog2LevelItemButton = catalog2LevelItem.querySelector('[data-js-subcatalog-item-button]');

    if (catalog2LevelItemButton.hasAttribute('data-js-subcatalog-item-button')) {
      catalog2LevelItemButton.addEventListener('click', toggleCatalog3Level);
    }
  });
};

const toggleCatalog2Level = (evt) => {
  const item = evt.target.parentNode;

  if (item.classList.contains('is-subcatalog-opened')) {
    closeCatalog2Level(item);
  } else {
    openCatalog2Level(item);
  }
};

const openCatalog = () => {
  catalog.classList.add('is-catalog-opened');
  document.body.classList.add('overlay');

  catalogButtonText.textContent = 'Закрыть каталог';

  isCatalogOpened = true;

  catalogWidth = catalogWrapper.offsetWidth;

  catalogItemCollection.forEach((item) => {
    const catalogItemButton = item.querySelector('[data-js-catalog-item-button]');

    if (catalogItemButton.hasAttribute('data-js-subcatalog-button')) {
      catalogItemButton.addEventListener('click', toggleCatalog2Level);
    }
  });
};

const closeCatalog = () => {
  catalog.classList.remove('is-catalog-opened');
  document.body.classList.remove('overlay');

  catalogButtonText.textContent = 'Открыть каталог';

  isCatalogOpened = false;

  catalogWidth = 0;
  catalogWrapper.style.width = 'max-content';

  catalogItemCollection.forEach((item) => {
    const catalogItemButton = item.querySelector('[data-js-catalog-item-button]');

    if (catalogItemButton.hasAttribute('data-js-subcatalog-button')) {
      catalogItemButton.removeEventListener('click', toggleCatalog2Level);
    }
  });

  if (openedCatalog2Level) {
    closeCatalog2Level(openedCatalog2Level.parentNode);
  }

  if (openedCatalog3Level) {
    closeCatalog3Level(openedCatalog3Level.parentNode);
  }
};

const toggleCatalog = () => {
  if (isCatalogOpened) {
    closeCatalog();
  } else {
    openCatalog();
  }
};

catalogButton.addEventListener('click', toggleCatalog);
