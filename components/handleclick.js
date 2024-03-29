function handleClick(event) {
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const cardTextContent = event.target.textContent;
  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");
  // Check if the media query is true

  sidebarElements.forEach((sidebarElement) => {
    if (
      mediaSmall.matches &&
      !sidebarElement.parentNode.parentNode.classList.contains("open")
    ) {
      hamburgerMenu.click();
      console.log("media matches");
      if (
        // Initiate dropdown menu if dropdown has the same text as the home button
        // and if it is not open already
        cardTextContent === sidebarElement.textContent &&
        !sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
        console.log("condition1");
        sidebarElement.click();
      } else if (
        // Close menu dropdowns that don't have same text as the home button
        // and are open already
        cardTextContent !== sidebarElement.textContent &&
        sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
        console.log("condition2");
        sidebarElement.click();
      }
    }

    if (mediaLarge.matches) {
      if (cardTextContent === sidebarElement.textContent) {
        console.log("condition3");
        sidebarElement.click();
      } else if (
        // Close menu dropdowns that don't have same text as the home button
        // and are open already
        cardTextContent !== sidebarElement.textContent &&
        sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
        console.log("condition4");
        sidebarElement.click();
      }
    }
  });
}

export { handleClick };
