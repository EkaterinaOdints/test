const headerDesktop = document.querySelector('[data-js-header-desktop]');
const catalog = headerDesktop.querySelector('[data-js-catalog]');
const catalogButton = headerDesktop.querySelector('[data-js-catalog-button]');
const catalogButtonText = catalogButton.querySelector('[data-js-catalog-button-text]');
const tabList1 = catalog.querySelector('[data-js-tab-1]');
const tabList2 = catalog.querySelector('[data-js-tab-2]');
const tabList3 = catalog.querySelector('[data-js-tab-3]');
const tabButtonCollection1 = tabList1.querySelectorAll('[data-js-tab-button]');
const tabContentCollection1 = tabList2.querySelectorAll('[data-js-tab-content]');
const tabContentCollection2 = tabList3.querySelectorAll('[data-js-tab-content]');

let isCatalogOpened = false;

const toggleSubcatalog2 = (evt) => {
  const button = evt.target;
  const id = button.getAttribute('data-js-tab-button');

  tabContentCollection2.forEach((content) => {
    if (content.classList.contains('is-subcatalog-opened')) {
      content.classList.remove('is-subcatalog-opened');
    }
    if (content.getAttribute('data-js-tab-content') === id) {
      content.classList.add('is-subcatalog-opened');
    }
  });
};

const toggleSubcatalog1 = (evt) => {
  const button = evt.target;
  const id = button.getAttribute('data-js-tab-button');

  tabContentCollection1.forEach((content) => {
    if (content.classList.contains('is-subcatalog-opened')) {
      content.classList.remove('is-subcatalog-opened');
      const tabButtonCollection2 = content.querySelectorAll('[data-js-tab-button]');
      tabButtonCollection2.forEach((nextButton) => {
        nextButton.removeEventListener('mouseenter', toggleSubcatalog2);
      });
    }
    if (content.getAttribute('data-js-tab-content') === id) {
      content.classList.add('is-subcatalog-opened');
      const tabButtonCollection2 = content.querySelectorAll('[data-js-tab-button]');
      tabButtonCollection2.forEach((nextButton) => {
        nextButton.addEventListener('mouseenter', toggleSubcatalog2);
      });
    }
  });
};

const openCatalog = () => {
  catalog.classList.add('is-catalog-opened');
  document.body.classList.add('overlay');

  catalogButtonText.textContent = 'Закрыть каталог';

  isCatalogOpened = true;

  tabButtonCollection1.forEach((button) => {
    button.addEventListener('mouseover', toggleSubcatalog1);
  });
};

const closeCatalog = () => {
  catalog.classList.remove('is-catalog-opened');
  document.body.classList.remove('overlay');

  catalogButtonText.textContent = 'Открыть каталог';

  isCatalogOpened = false;

  tabButtonCollection1.forEach((button) => {
    button.removeEventListener('mouseover', toggleSubcatalog1);
  });
};

const toggleCatalog = () => {
  if (isCatalogOpened) {
    closeCatalog();
  } else {
    openCatalog();
  }
};

catalogButton.addEventListener('click', toggleCatalog);
