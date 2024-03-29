function handleCardClick(event) {
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const cardTextContent = event.target.textContent;
  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

  // Open the hamburger on mobile when clicking a Card
  const openHamburger = () => {
    if (mediaSmall.matches) {
      console.log("Page is small. Click hamburger menu");
      // open hamburger menu
      hamburgerMenu.click();
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
            "Page is small. Text matches and it is not open already, open sidebar"
          );
          sidebarElement.click();
        } else if (
          // Close sidebar items where text doesn't match Card and they are open
          cardTextContent !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          console.log(
            "Page is small. Text matches and is open already, close sidebar"
          );
          sidebarElement.click();
        }
      }

      if (mediaLarge.matches) {
        if (cardTextContent === sidebarElement.textContent) {
          // Open sidebar item with the same text as Card
          console.log("page is large and text matches, open sidebar");
          sidebarElement.click();
        } else if (
          // Close sidebar items where text doesn't match Card and they are open
          cardTextContent !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          console.log(
            "page is large and text matches, close matching sidebars"
          );
          sidebarElement.click();
        }
      }
    });
  };

  setTimeout(openHamburger(), 10);
  InitiateSidebarActions();
}

export { handleCardClick };
