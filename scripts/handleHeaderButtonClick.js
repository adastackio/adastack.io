function handleHeaderButtonClick(event) {
  const buttonTitleTag = event.target.title;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  const sidebar = document.querySelector(".nextra-sidebar-container");
  const sidebarButtons = document.querySelectorAll(
    ".nextra-sidebar-container li button.nx-items-center"
  );

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
          sidebarButtons.forEach((sidebarElement, index) => {
            console.log(sidebarElement);
            setTimeout(() => {
              // Add your CSS changes here for each sidebar element
              // For example, changing text color
              sidebarElement.style.backgroundColor = "rgba(243,244,246,1)";
              sidebarElement.style.color = "rgba(17, 24, 39, 1)";
              // Reset the CSS after 1 second
              setTimeout(() => {
                sidebarElement.style.backgroundColor = "transparent";
                sidebarElement.style.color = "rgba(107,114,128,1)"; // Reset to default
              }, 100);
            }, index * 100); // Delay each sidebar item by 1 second
          });
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
