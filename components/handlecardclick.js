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
    }
  };

  const InitiateSidebarActions = () => {};

  setTimeout(openHamburger(), 20000);
  InitiateSidebarActions();
}

export { handleCardClick };
