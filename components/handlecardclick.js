function handleCardClick(event) {
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const hamburgerInner = document.querySelector(".nextra-hamburger > svg");
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const cardTextContent = event.target.textContent;
  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

  // Open the hamburger on mobile when clicking a Card
  const openHamburger = () => {
    if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
      console.log("Page is small. Menu is closed. Click hamburger menu");
      // open hamburger menu
      hamburgerMenu.click();
      if (!hamburgerInner.classList.contains("open")) {
        setTimeout(() => {
          console.log("Menu not open. Click again");
          hamburgerMenu.click();
        }, 100);
      }
      if (!hamburgerInner.classList.contains("open")) {
        setTimeout(() => {
          console.log("Menu not open. Click again");
          hamburgerMenu.click();
        }, 100);
      }
      if (!hamburgerInner.classList.contains("open")) {
        setTimeout(() => {
          console.log("Menu not open. Click again");
          hamburgerMenu.click();
        }, 100);
      }
      if (!hamburgerInner.classList.contains("open")) {
        setTimeout(() => {
          console.log("Menu not open. Click again");
          hamburgerMenu.click();
        }, 100);
      }
  };

  const InitiateSidebarActions = () => {
    sidebarElements.forEach((sidebarElement) => {
      if (mediaSmall.matches) {
        if (
          // Open sidebar item with the same text as Card and is not open already
          cardTextContent === sidebarElement.textContent &&
          !sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          console.log(
            `Page is small. Text matches and it is not open already, open sidebar ${cardTextContent}`
          );
          sidebarElement.click();
        } else if (
          // Close sidebar items where text doesn't match Card and they are open
          cardTextContent !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          console.log(
            `Page is small. Text matches and is open already, close sidebar ${
              cardTextContent !== sidebarElement.textContent
                ? sidebarElement.textContent
                : ""
            }`
          );
          sidebarElement.click();
        }
      }

      if (mediaLarge.matches) {
        if (cardTextContent === sidebarElement.textContent) {
          // Open sidebar item with the same text as Card
          console.log(
            `Page is large. Text matches, open sidebar ${cardTextContent}`
          );
          sidebarElement.click();
        } else if (
          // Close sidebar items where text doesn't match Card and they are open
          cardTextContent !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          console.log(
            `Page is large. Text matches and is open already, close sidebar  ${
              cardTextContent !== sidebarElement.textContent
                ? sidebarElement.textContent
                : ""
            }`
          );
          sidebarElement.click();
        }
      }
    });
  };

  InitiateSidebarActions();
  openHamburger();
}

export { handleCardClick };
