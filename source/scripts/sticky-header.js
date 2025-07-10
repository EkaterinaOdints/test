const header = document.querySelector('[data-js-header]');
const headerAdditional = header.querySelector('[data-js-header-desktop-additional]');
const headerControls = header.querySelector('[data-js-header-desktop-controls]');
const headerNavigation = header.querySelector('[data-js-header-desktop-nav]');

let resizeTimeout;
let wasScrolled = null;

const setElementHeight = (el) => {
  el.style.height = `${el.scrollHeight}px`;
};

const setLargeHeaderControlsPadding = () => {
  headerControls.style.paddingTop = '26px';
  headerControls.style.paddingBottom = '26px';
};

const setDefaultHeaderControlsPadding = () => {
  headerControls.style.paddingTop = '16px';
  headerControls.style.paddingBottom = '8px';
};

const setHiddenHeaderNavOverflow = () => {
  headerNavigation.style.overflow = 'hidden';
};

const setDefaultHeaderNavOverflow = () => {
  headerNavigation.style.overflow = 'visible';
};

const updateHeader = () => {
  setElementHeight(headerAdditional);
  setElementHeight(headerNavigation);

  if (window.scrollY > 0) {
    headerAdditional.style.height = 0;
    headerNavigation.style.height = 0;
    setLargeHeaderControlsPadding();
    setHiddenHeaderNavOverflow();
  } else {
    setDefaultHeaderNavOverflow();
    setElementHeight(headerAdditional);
    setElementHeight(headerNavigation);
    setDefaultHeaderControlsPadding();
  }
};

const updateHeaderHeight = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateHeader();
  }, 100);
};

const onScroll = () => {
  const isScrolled = window.scrollY > 0;

  if (isScrolled !== wasScrolled) {
    wasScrolled = isScrolled;
    updateHeaderHeight();
  }
};

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', updateHeaderHeight);
