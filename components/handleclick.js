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
      if (
        // Click the menu dropdown if it has the same text as the home button
        // and if it is not open already
        homeCardTextContent === sidebarElement.textContent &&
        !sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
        sidebarElement.click();
      } else if (
        // Close menu dropdowns that don't have same text as the home button
        // and are open already
        homeCardTextContent !== sidebarElement.textContent &&
        sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
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
