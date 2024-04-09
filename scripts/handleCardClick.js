function handleCardClick(event) {
  const cardTextContent = event.target.textContent;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const hamburgerInner = document.querySelector(".nextra-hamburger > svg");

  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

  // Open the hamburger menu when clicking a Card on mobile
  const openHamburger = () => {
    console.log("hit open dropdown script");
    if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
      console.log("On mobile. Menu not open. Open menu");
      hamburgerMenu.click();
    }
    // This fn below fixes a bug, specifically when a user on mobile taps the hamburger menu, it would sometimes quickly open and close on the first tap. This "double clicks" it if it doesn't open properly with the first click.
    setTimeout(() => {
      if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
        console.log("On mobile. Menu not open. Double click menu");
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
          console.log(
            `Page is small. Text matches and it is not open already, open sidebar ${cardTextContent}`
          );
          sidebarElement.click();
        } else if (
          // Close  sidebar menus that are open && text doesn't match Card's
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
          // Open sidebar menu where the text matches Card's
          console.log(
            `Page is large. Text matches, open sidebar ${cardTextContent}`
          );
          sidebarElement.click();
        } else if (
          // Close sidebar menus that are open && text doesn't match Card's
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

  openAndCloseSidebarMenus();
  openHamburger();
}

export { handleCardClick };
