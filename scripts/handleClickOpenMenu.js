function handleClickOpenMenu(event, sidebarText) {
  // Prevent default behavior
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Get all sidebar menu items
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");

  // Open the hamburger menu if it exists and is closed
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const hamburgerInner = document.querySelector(".nextra-hamburger > svg");

  if (
    hamburgerMenu &&
    hamburgerInner &&
    !hamburgerInner.classList.contains("open")
  ) {
    // hamburgerMenu.click();

    // Double-click failsafe for mobile
    setTimeout(() => {
      if (!hamburgerInner.classList.contains("open")) {
        // hamburgerMenu.click();
      }
    }, 100);
  }

  // Process sidebar elements after a short delay to ensure hamburger menu is open
  setTimeout(() => {
    let foundMatch = false;

    // Loop through all sidebar elements
    sidebarElements.forEach((sidebarElement) => {
      const currentSidebarText = sidebarElement.textContent.trim();
      const isMatch = currentSidebarText === sidebarText;

      if (isMatch) {
        foundMatch = true;

        // Toggle this sidebar (clicking will open if closed, close if open)
        sidebarElement.click();
      } else {
        // Close any other open sidebars
        if (sidebarElement.parentNode.parentNode.classList.contains("open")) {
          sidebarElement.click();
        }
      }
    });
  }, 200);
}

export { handleClickOpenMenu };
