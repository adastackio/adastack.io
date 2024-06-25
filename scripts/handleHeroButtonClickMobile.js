function handleHeroButtonClickMobile() {
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const hamburgerInner = document.querySelector(".nextra-hamburger > svg");
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  // Filter sidebar elements to only the top level ones that can open and close
  const topLevelSidebarElements = Array.from(sidebarElements).filter(
    (el) => el.parentNode.tagName === "BUTTON"
  );

  // Open the hamburger menu when clicking Hero button
  const openHamburger = () => {
    if (!hamburgerInner.classList.contains("open")) {
      hamburgerMenu.click();
    }
  };

  // Close all menus within on every click of Hero button
  const closeHamburgerSubMenus = () => {
    topLevelSidebarElements.forEach((sidebarElement) => {
      if (sidebarElement.parentNode.parentNode.classList.contains("open")) {
        console.log(sidebarElement.textContent);
        sidebarElement.click();
      }
    });
  };

  closeHamburgerSubMenus();
  openHamburger();
}

export { handleHeroButtonClickMobile };
