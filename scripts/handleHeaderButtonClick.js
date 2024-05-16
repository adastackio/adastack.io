function handleHeaderButtonClick(event) {
  const buttonTitleTag = event.target.title;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const sidebar = document.querySelector(".nextra-sidebar-container");

  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

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
        if (
          buttonTitleTag === "Explore All" &&
          sidebar.style.width != "19rem"
        ) {
          sidebar.style.width = "19rem";
        } else if (
          buttonTitleTag === "Explore All" &&
          sidebar.style.width == "19rem"
        ) {
          sidebar.style.width = "16rem";
        }
      }
    });
  };

  openAndCloseSidebarMenus();
}

export { handleHeaderButtonClick };
