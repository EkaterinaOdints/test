const headerDesktop = document.querySelector('[data-js-header-desktop]');
const catalog = headerDesktop.querySelector('[data-js-catalog]');
const tabList3 = catalog.querySelector('[data-js-tab-3]');
const tabContentCollection2 = tabList3.querySelectorAll('[data-js-tab-content]');

let openedSub1;
let openedSub2;

const isElementActive = (el) => el.classList.contains('is-active');

const closeElement = (el) => {
  if (el && isElementActive(el)) {
    el.classList.remove('is-active');
  }
};

const openElement = (el) => {
  if (el && !isElementActive(el)) {
    el.classList.add('is-active');
  }
};

const toggleButtonHover = (evt) => {
  const wrapper = evt.target.closest('[data-js-tab-1]');
  const collection = wrapper.querySelectorAll('[data-js-tab-button]');

  collection.forEach((button) => {
    if (isElementActive(button)) {
      closeElement(button);
    }
  });

  openElement(evt.target);
};

const closeSub = (content, onClose = () => {}) => {
  closeElement(content);
  onClose(content);
};

const openSub = (content, onOpen = () => {}) => {
  openElement(content);
  onOpen(content);
};

const toggleSubcatalog2 = (evt) => {
  const id = evt.target.getAttribute('data-js-tab-button');

  tabContentCollection2.forEach((content) => {
    if (isElementActive(content)) {
      closeSub(content);
      openedSub2 = null;
    }
    if (content.getAttribute('data-js-tab-content') === id) {
      openSub(content);
      openedSub2 = content;
    }
  });
};

const toggleSub = (target) => {
  if (openedSub2) {
    closeElement(openedSub2);
  }

  const id = target.getAttribute('data-js-tab-button');
  const wrapper = target.closest('[data-js-tab-wrapper]');
  const contentWrapper = wrapper.querySelector('[data-js-tab-content-wrapper]');
  const collection = contentWrapper.querySelectorAll('[data-js-tab-content]');

  collection.forEach((content) => {
    if (isElementActive(content)) {
      closeSub(content, () => {
        content.querySelectorAll('[data-js-tab-button]').forEach((button) => button.removeEventListener('mouseenter', toggleSubcatalog2));
      });
      openedSub1 = null;
    }

    if (content.getAttribute('data-js-tab-content') === id) {
      openSub(content, content.querySelectorAll('[data-js-tab-button]').forEach((button) => button.addEventListener('mouseenter', toggleSubcatalog2)));
      openedSub1 = content;
    }
  });
};

const useCatalogTab = () => {
  const catalogButton = headerDesktop.querySelector('[data-js-catalog-button]');
  const catalogButtonText = catalogButton.querySelector('[data-js-catalog-button-text]');
  const tabList1 = catalog.querySelector('[data-js-tab-1]');
  const tabCatalogButtonCollection = tabList1.querySelectorAll('[data-js-tab-button]');

  let isCatalogOpened = false;

  const toggleSubcatalog1 = (evt) => {
    toggleSub(evt.target);
  };

  const openCatalog = () => {
    openElement(catalog);
    openElement(catalog.querySelector('[data-js-tab-content="smartphones-gadgets"]'));
    openElement(catalog.querySelector('[data-js-tab-button="smartphones-gadgets"]'));
    document.body.classList.add('overlay');
    headerDesktop.classList.add('is-catalog-opened');

    catalogButtonText.textContent = 'Закрыть каталог';

    isCatalogOpened = true;

    tabCatalogButtonCollection.forEach((button) => {
      button.addEventListener('mouseenter', toggleSubcatalog1);
      button.addEventListener('mouseenter', toggleButtonHover);
    });

    window.addEventListener('click', onDocumentClick);
    window.addEventListener('keydown', onEscapeClick);
  };

  const closeCatalog = () => {
    closeElement(catalog);
    closeElement(catalog.querySelector('[data-js-tab-content="smartphones-gadgets"]'));
    closeElement(catalog.querySelector('[data-js-tab-button="smartphones-gadgets"]'));
    document.body.classList.remove('overlay');
    headerDesktop.classList.remove('is-catalog-opened');

    catalogButtonText.textContent = 'Открыть каталог';

    isCatalogOpened = false;

    tabCatalogButtonCollection.forEach((button) => {
      closeElement(button);
      button.removeEventListener('mouseenter', toggleSubcatalog1);
      button.removeEventListener('mouseenter', toggleButtonHover);
    });

    window.removeEventListener('click', onDocumentClick);
    window.removeEventListener('keydown', onEscapeClick);

    if (openedSub1) {
      closeElement(openedSub1);
    }

    if (openedSub2) {
      closeElement(openedSub2);
    }
  };

  const toggleCatalog = () => isCatalogOpened ? closeCatalog() : openCatalog();

  catalogButton.addEventListener('click', toggleCatalog);

  function onEscapeClick(evt) {
    if (evt.code === 'Escape') {
      closeCatalog();
    }
  }

  function onDocumentClick(evt) {
    if (!catalog.contains(evt.target) && !catalogButton.contains(evt.target)) {
      closeCatalog();
    }
  }
};

const useMainMenuTab = () => {
  const mainMenu = headerDesktop.querySelector('[data-js-main-menu]');
  const mainMenuTabCollection = mainMenu.querySelectorAll('[data-js-main-menu-tab]');

  let openedMainMenu = null;

  const toggleMainMenuSubmenu1 = (evt) => {
    toggleSub(evt.target);
  };

  const openMainMenu = (menu) => {
    document.body.classList.add('overlay');
    headerDesktop.classList.add('is-main-menu-opened');
    const tabButtonCollection = menu.querySelectorAll('[data-js-tab-button]');
    openElement(menu);
    tabButtonCollection.forEach((button) => {
      button.addEventListener('mouseenter', toggleMainMenuSubmenu1);
      button.addEventListener('mouseenter', toggleButtonHover);
    });
    openElement(menu.querySelector('[data-js-tab-button="purpose"]'));
    openElement(menu.querySelector('[data-js-tab-content="purpose"]'));
    openedMainMenu = menu;
    window.addEventListener('click', onDocumentClick);
    window.addEventListener('keydown', onEscapeClick);
  };

  const closeMainMenu = (menu) => {
    document.body.classList.remove('overlay');
    headerDesktop.classList.remove('is-main-menu-opened');
    const tabButtonCollection = menu.querySelectorAll('[data-js-tab-button]');
    closeElement(menu);
    tabButtonCollection.forEach((button) => {
      closeElement(button);
      button.removeEventListener('mouseenter', toggleMainMenuSubmenu1);
      button.removeEventListener('mouseenter', toggleButtonHover);
    });
    closeElement(menu.querySelector('[data-js-tab-button="purpose"]'));
    closeElement(menu.querySelector('[data-js-tab-content="purpose"]'));
    openedMainMenu = null;
    window.removeEventListener('click', onDocumentClick);
    window.removeEventListener('keydown', onEscapeClick);
  };

  const toggleMainMenu = (evt) => {
    const menu = evt.target.closest('[data-js-main-menu-tab]');

    if (openedMainMenu) {
      closeMainMenu(menu);
      evt.target.addEventListener('mouseenter', openMainMenuOnHover);
      evt.target.removeEventListener('mouseout', closeMainMenuOnHover);

      if (openedSub1) {
        closeElement(openedSub1);
      }
    } else {
      openMainMenu(menu);
      evt.target.removeEventListener('mouseenter', openMainMenuOnHover);
      evt.target.removeEventListener('mouseout', closeMainMenuOnHover);
    }
  };

  function openMainMenuOnHover(evt) {
    const menu = evt.target.parentNode;

    if (!isElementActive(menu)) {
      openElement(menu);
      openElement(menu.querySelector('[data-js-tab-button="purpose"]'));
      openElement(menu.querySelector('[data-js-tab-content="purpose"]'));
      evt.target.addEventListener('mouseout', closeMainMenuOnHover);
    }
  }

  function closeMainMenuOnHover(evt) {
    const menu = evt.target.parentNode;

    if (isElementActive(menu)) {
      closeElement(menu);
      closeElement(menu.querySelector('[data-js-tab-button="purpose"]'));
      closeElement(menu.querySelector('[data-js-tab-content="purpose"]'));
      evt.target.removeEventListener('mouseout', closeMainMenuOnHover);
    }
  }

  function onEscapeClick(evt) {
    if (evt.code === 'Escape') {
      const button = openedMainMenu.querySelector('[data-js-main-menu-button]');
      closeMainMenu(openedMainMenu);
      button.addEventListener('mouseenter', openMainMenuOnHover);
      button.removeEventListener('mouseout', closeMainMenuOnHover);
    }
  }

  function onDocumentClick(evt) {
    if (!evt.target.closest('[data-js-main-menu-tab]')) {
      const button = openedMainMenu.querySelector('[data-js-main-menu-button]');
      closeMainMenu(openedMainMenu);
      button.addEventListener('mouseenter', openMainMenuOnHover);
      button.removeEventListener('mouseout', closeMainMenuOnHover);
    }
  }

  mainMenuTabCollection.forEach((tab) => {
    const mainMenuButton = tab.querySelector('[data-js-main-menu-button]');
    mainMenuButton.addEventListener('click', toggleMainMenu);
    mainMenuButton.addEventListener('mouseenter', openMainMenuOnHover);
  });
};

const useMainMenuDropdown = () => {
  const dropdownCollection = headerDesktop.querySelectorAll('[data-js-main-menu-dropdown]');

  let openedDropdown = null;

  const closeDropdown = (dropdown) => {
    closeElement(dropdown);
    document.body.classList.remove('overlay');
    headerDesktop.classList.remove('is-main-menu-opened');
    window.removeEventListener('click', onDocumentClick);
    window.removeEventListener('keydown', onEscapeClick);
    openedDropdown = null;
  };

  const openDropdown = (dropdown) => {
    openElement(dropdown);
    document.body.classList.add('overlay');
    headerDesktop.classList.add('is-main-menu-opened');
    window.addEventListener('click', onDocumentClick);
    window.addEventListener('keydown', onEscapeClick);
    openedDropdown = dropdown;
  };

  const toggleDropdown = (evt) => {
    const dropdown = evt.target.closest('[data-js-main-menu-dropdown]');

    if (isElementActive(dropdown)) {
      closeDropdown(dropdown);
    } else {
      openDropdown(dropdown);
    }
  };

  function onEscapeClick(evt) {
    if (evt.code === 'Escape') {
      closeDropdown(evt.target.closest('[data-js-main-menu-dropdown]'));
    }
  }

  function onDocumentClick(evt) {
    if (!evt.target.closest('[data-js-main-menu-dropdown]')) {
      closeDropdown(openedDropdown);
    }
  }

  dropdownCollection.forEach((dropdown) => {
    const button = dropdown.querySelector('[data-js-dropdown-button]');
    button.addEventListener('click', toggleDropdown);
  });
};

const useMobileMenu = () => {
  const headerMobile = document.querySelector('[data-js-header-mobile]');
  const menuButton = headerMobile.querySelector('[data-js-mobile-menu-button]');
  const mobileMenu = headerMobile.querySelector('[data-js-mobile-menu]');
  const mobileMenuItemCollection = mobileMenu.querySelectorAll('[data-js-mobile-menu-item]');

  let isMobileMenuOpened = false;
  let isButtonTouched = false;
  let openedMobileSubmenu = null;

  const isElementHidden = (el) => el.classList.contains('is-hidden');

  const hideElement = (el) => {
    el.classList.add('is-hidden');
  };

  const showElement = (el) => {
    el.classList.remove('is-hidden');
  };

  const openSubmenu = (item) => {
    const submenu = item.querySelector('[data-js-mobile-submenu]');
    const submenuItemCollection = submenu.querySelectorAll(':scope > [data-js-mobile-submenu-item]');
    const submenuParentCollection = item.parentNode.querySelectorAll(':scope > [data-js-mobile-submenu-item]');
    const buttonToHide = item.parentNode.parentNode.querySelector(':scope > [data-js-mobile-submenu-button]');

    submenuItemCollection.forEach((subItem) => {
      const button = subItem.querySelector('[data-js-mobile-submenu-button]');

      if (button.classList.contains('mobile-submenu-button')) {
        button.addEventListener('click', toggleMobileSubmenu);
      }

      showElement(subItem);
    });

    submenuParentCollection.forEach((subItem) => {
      hideElement(subItem);
    });

    if (buttonToHide) {
      hideElement(buttonToHide);
    }

    openElement(item);
    showElement(item);
    openedMobileSubmenu = item;
    headerMobile.classList.add('is-mobile-submenu-opened');
  };

  const closeSubmenu = (item) => {
    const submenu = item.querySelector('[data-js-mobile-submenu]');
    const submenuItemCollection = submenu.querySelectorAll(':scope > [data-js-mobile-submenu-item]');
    const submenuParentCollection = item.parentNode.querySelectorAll(':scope > [data-js-mobile-submenu-item]');

    submenuItemCollection.forEach((subItem) => {
      const button = subItem.querySelector('[data-js-mobile-submenu-button]');

      if (button.classList.contains('mobile-submenu-button')) {
        button.removeEventListener('click', toggleMobileSubmenu);
      }

      hideElement(subItem);
    });

    submenuParentCollection.forEach((subItem) => {
      if (isElementHidden(subItem)) {
        showElement(subItem);
      }
    });

    closeElement(item);
    hideElement(item);
    openedMobileSubmenu = item.parentNode.parentNode;

    if (isElementActive(openedMobileSubmenu)) {
      openSubmenu(openedMobileSubmenu);

      const buttonToHide = openedMobileSubmenu.querySelector(':scope > [data-js-mobile-submenu-button]');

      if (buttonToHide) {
        showElement(buttonToHide);
      }
    } else {
      headerMobile.classList.remove('is-mobile-submenu-opened');
    }

  };

  function toggleMobileSubmenu(evt) {
    const item = evt.target.closest('[data-js-mobile-submenu-item]');

    if (item === openedMobileSubmenu) {
      closeSubmenu(openedMobileSubmenu);
    } else {
      openSubmenu(item);
    }
  }

  const closeMobileMenu = () => {
    const openedSubmenuArray = Array.from(headerMobile.querySelectorAll('[data-js-mobile-submenu-item].is-active'));

    if (openedSubmenuArray) {
      openedSubmenuArray.reverse().forEach((submenu) => {
        closeSubmenu(submenu);
      });
    }

    headerMobile.classList.remove('is-mobile-menu-opened');
    isMobileMenuOpened = false;

    mobileMenuItemCollection.forEach((item) => {
      const button = item.querySelector('[data-js-mobile-menu-button]');

      if (button.classList.contains('mobile-submenu-button')) {
        button.removeEventListener('click', toggleMobileSubmenu);
      }
    });
  };

  const openMobileMenu = () => {
    headerMobile.classList.add('is-mobile-menu-opened');

    isMobileMenuOpened = true;

    mobileMenuItemCollection.forEach((item) => {
      const button = item.querySelector('[data-js-mobile-menu-button]');

      if (button.classList.contains('mobile-submenu-button')) {
        button.addEventListener('click', toggleMobileSubmenu);
      }
    });
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpened) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  menuButton.addEventListener('touchstart', (evt) => {
    isButtonTouched = true;
    evt.preventDefault();
    toggleMobileMenu();
  }, { passive: false });

  menuButton.addEventListener('click', () => {
    if (isButtonTouched) {
      isButtonTouched = false;
      return;
    }
    toggleMobileMenu();
  });
};

useCatalogTab();
useMainMenuTab();
useMainMenuDropdown();
useMobileMenu();
