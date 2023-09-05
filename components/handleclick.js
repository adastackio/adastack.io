function handleClick(event) {
  const homeCardTextContent = event.target.textContent;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 768px)");
  // Check if the media query is true

  sidebarElements.forEach((sidebarElement) => {
    if (mediaSmall.matches) {
      hamburgerMenu.click();
      if (homeCardTextContent === sidebarElement.textContent) {
        sidebarElement.click();
      }
    }

    if (mediaLarge.matches) {
      if (homeCardTextContent === sidebarElement.textContent) {
        sidebarElement.click();
      }
    }
  });
}

export { handleClick };
