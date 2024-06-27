function handleBreadcrumbClickMobile(event) {
  const cardTextContent = event.target.textContent;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const hamburgerInner = document.querySelector(".nextra-hamburger > svg");

  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

  // Open the hamburger menu when clicking a Card on mobile
  const openHamburger = () => {
    if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
      hamburgerMenu.click();
    }
    // The below fn fixes a bug that when a user on mobile taps the hamburger menu, it sometimes quickly open and closes on the first tap. This "double clicks" it if it doesn't open properly with the first click.
    setTimeout(() => {
      if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
        hamburgerMenu.click();
      }
    }, 100);
  };

  // Open relevant sidebar (dropdown on mobile) category menus when clicking Cards.
  const openAndCloseSidebarMenus = () => {
    sidebarElements.forEach((sidebarElement) => {
      if (mediaSmall.matches) {
        if (
          // Open sidebar menu that is not open yet && text matches Card's
          cardTextContent === sidebarElement.textContent &&
          !sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          sidebarElement.click();
        } else if (
          // Close  sidebar menus that are open && text doesn't match Card's
          cardTextContent !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          sidebarElement.click();
        }
      }

      if (mediaLarge.matches) {
        if (cardTextContent === sidebarElement.textContent) {
          // Open sidebar menu where the text matches Card's
          sidebarElement.click();
        } else if (
          // Close sidebar menus that are open && text doesn't match Card's
          cardTextContent !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          sidebarElement.click();
        }
      }
    });
  };

  openAndCloseSidebarMenus();
  openHamburger();
}

export { handleBreadcrumbClickMobile };
