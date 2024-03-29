function handleClick(event) {
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const cardTextContent = event.target.textContent;
  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

  // Function to open the hamburger menu and open a sub-menu in the navigation when clicking a home button

  sidebarElements.forEach((sidebarElement) => {
    if (mediaSmall.matches) {
      console.log("Click hamburger menu");
      // open hamburger menu
      hamburgerMenu.click();

      if (
        // Initiate dropdown if dropdown nav item has the same text as the home button and is not open already
        cardTextContent === sidebarElement.textContent &&
        !sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
        console.log(
          "Initiate dropdown if dropdown nav item has the same text as the home button and is not open already"
        );
        sidebarElement.click();
      } else if (
        // Close dropdowns that don't have same text as the home button
        // and are open already
        cardTextContent !== sidebarElement.textContent &&
        sidebarElement.parentNode.parentNode.classList.contains("open")
      ) {
        console.log(
          "Close dropdowns if they have different text than home button and are open"
        );
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
