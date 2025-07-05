// source/scripts/catalog.js
var headerDesktop = document.querySelector("[data-js-header-desktop]");
var catalogWrapper = headerDesktop.querySelector("[data-js-catalog-wrapper]");
var catalog = headerDesktop.querySelector("[data-js-catalog]");
var catalogItemCollection = catalog.querySelectorAll("[data-js-catalog-item]");
var catalogButton = headerDesktop.querySelector("[data-js-catalog-button]");
var catalogButtonText = catalogButton.querySelector("[data-js-catalog-button-text]");
var isCatalogOpened = false;
var openedCatalog2Level = null;
var openedCatalog3Level = null;
var catalogWidth = 0;
var catalog2LevelWidth = 0;
var catalog3LevelWidth = 0;
var getSubcatalog = (el) => el.querySelector("[data-js-subcatalog]");
var updateCatalogSize = () => {
  catalogWrapper.style.width = `${catalogWidth}px`;
};
var closeCatalog3Level = (item) => {
  item.classList.remove("is-subcatalog-opened");
  openedCatalog3Level = null;
  catalogWidth = catalogWidth - catalog3LevelWidth;
  catalog3LevelWidth = 0;
  updateCatalogSize();
};
var openCatalog3Level = (item, catalog3Level) => {
  item.classList.add("is-subcatalog-opened");
  if (openedCatalog3Level) {
    closeCatalog3Level(openedCatalog3Level.parentNode);
  }
  openedCatalog3Level = catalog3Level;
  catalog3LevelWidth = catalog3Level.offsetWidth;
  catalogWidth = catalogWidth + catalog3LevelWidth;
  updateCatalogSize();
};
var toggleCatalog3Level = function(evt) {
  const item = evt.target.parentNode.parentNode;
  const catalog3Level = getSubcatalog(item);
  if (item.classList.contains("is-subcatalog-opened")) {
    closeCatalog3Level(item);
  } else {
    openCatalog3Level(item, catalog3Level);
  }
};
var closeCatalog2Level = (item) => {
  catalogWidth = catalogWidth - catalog2LevelWidth;
  item.classList.remove("is-subcatalog-opened");
  catalog2LevelWidth = 0;
  updateCatalogSize();
  openedCatalog2Level = null;
  const catalog2Level = getSubcatalog(item);
  const catalog2LevelItemCollection = catalog2Level.querySelectorAll("[data-js-subcatalog-item]");
  catalog2LevelItemCollection.forEach((catalog2LevelItem) => {
    const catalog2LevelItemButton = catalog2LevelItem.querySelector("[data-js-subcatalog-item-button]");
    if (catalog2LevelItemButton.hasAttribute("data-js-subcatalog-item-button")) {
      catalog2LevelItemButton.removeEventListener("click", toggleCatalog3Level);
    }
  });
  if (openedCatalog3Level) {
    closeCatalog3Level(openedCatalog3Level.parentNode);
  }
};
var openCatalog2Level = (item) => {
  const catalog2Level = getSubcatalog(item);
  item.classList.add("is-subcatalog-opened");
  if (openedCatalog2Level) {
    closeCatalog2Level(openedCatalog2Level.parentNode);
  }
  openedCatalog2Level = catalog2Level;
  catalog2LevelWidth = catalog2Level.offsetWidth;
  catalogWidth = catalogWidth + catalog2LevelWidth;
  updateCatalogSize();
  const catalog2LevelItemCollection = catalog2Level.querySelectorAll("[data-js-subcatalog-item]");
  catalog2LevelItemCollection.forEach((catalog2LevelItem) => {
    const catalog2LevelItemButton = catalog2LevelItem.querySelector("[data-js-subcatalog-item-button]");
    if (catalog2LevelItemButton.hasAttribute("data-js-subcatalog-item-button")) {
      catalog2LevelItemButton.addEventListener("click", toggleCatalog3Level);
    }
  });
};
var toggleCatalog2Level = (evt) => {
  const item = evt.target.parentNode;
  if (item.classList.contains("is-subcatalog-opened")) {
    closeCatalog2Level(item);
  } else {
    openCatalog2Level(item);
  }
};
var openCatalog = () => {
  catalog.classList.add("is-catalog-opened");
  document.body.classList.add("overlay");
  catalogButtonText.textContent = "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433";
  isCatalogOpened = true;
  catalogWidth = catalogWrapper.offsetWidth;
  catalogItemCollection.forEach((item) => {
    const catalogItemButton = item.querySelector("[data-js-catalog-item-button]");
    if (catalogItemButton.hasAttribute("data-js-subcatalog-button")) {
      catalogItemButton.addEventListener("click", toggleCatalog2Level);
    }
  });
};
var closeCatalog = () => {
  catalog.classList.remove("is-catalog-opened");
  document.body.classList.remove("overlay");
  catalogButtonText.textContent = "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433";
  isCatalogOpened = false;
  catalogWidth = 0;
  catalogWrapper.style.width = "max-content";
  catalogItemCollection.forEach((item) => {
    const catalogItemButton = item.querySelector("[data-js-catalog-item-button]");
    if (catalogItemButton.hasAttribute("data-js-subcatalog-button")) {
      catalogItemButton.removeEventListener("click", toggleCatalog2Level);
    }
  });
  if (openedCatalog2Level) {
    closeCatalog2Level(openedCatalog2Level.parentNode);
  }
  if (openedCatalog3Level) {
    closeCatalog3Level(openedCatalog3Level.parentNode);
  }
};
var toggleCatalog = () => {
  if (isCatalogOpened) {
    closeCatalog();
  } else {
    openCatalog();
  }
};
catalogButton.addEventListener("click", toggleCatalog);
//# sourceMappingURL=catalog.js.map
