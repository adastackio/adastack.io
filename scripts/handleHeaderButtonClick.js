function handleHeaderButtonClick(event) {
  const buttonTitleTag = event.target.title;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const sidebar = document.querySelector(".nextra-sidebar-container");
  const sidebarButtons = document.querySelectorAll(
    ".nextra-sidebar-container li button.nx-items-center"
  );
  const html = document.documentElement;
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

  // Open relevant sidebar (dropdown on mobile) category menus when clicking Button.
  const openAndCloseSidebarMenus = () => {
    sidebarElements.forEach((sidebarElement) => {
      if (mediaSmall.matches) {
        if (
          // Open sidebar menu that is not open yet && text matches Button's title tag
          buttonTitleTag === sidebarElement.textContent &&
          !sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          sidebarElement.click();
        } else if (
          // Close  sidebar menus that are open && text doesn't match Button's title tag
          buttonTitleTag !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          sidebarElement.click();
        }
      }

      if (mediaLarge.matches) {
        if (buttonTitleTag === sidebarElement.textContent) {
          // Open sidebar menu where the text matches Button's title tag
          sidebarElement.click();
        } else if (
          // Close sidebar menus that are open && text doesn't match Button's title tag
          buttonTitleTag !== sidebarElement.textContent &&
          sidebarElement.parentNode.parentNode.classList.contains("open")
        ) {
          sidebarElement.click();
        }
        if (buttonTitleTag === "Explore All") {
          sidebarButtons.forEach((sidebarElement) => {
            sidebarElement.click();
          });
        }
      }
    });
  };

  openAndCloseSidebarMenus();
  openHamburger();
}

export { handleHeaderButtonClick };
