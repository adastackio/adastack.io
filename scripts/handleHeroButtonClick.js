function handleHeroButtonClick() {
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  // Filter sidebar elements to only the top level ones that can open and close
  const topLevelSidebarElements = Array.from(sidebarElements).filter(
    (el) => el.parentNode.tagName === "BUTTON"
  );

  // Function to and close sidebar menus when clicking Hero button.
  const openAndCloseSidebarMenus = () => {
    let openMenuCount = 0;
    let menuCount = 0;

    topLevelSidebarElements.forEach((sidebarElement) => {
      menuCount++;
      if (sidebarElement.parentNode.parentNode.classList.contains("open")) {
        openMenuCount++;
      }
    });

    // Close all sidebar menus if all sidebar menus are already open
    if (openMenuCount === menuCount) {
      topLevelSidebarElements.forEach((sidebarElement) => {
        if (sidebarElement.parentNode.parentNode.classList.contains("open")) {
          sidebarElement.click();
        }
      });
    }

    // Open all sidebar menus that aren't open yet
    if (openMenuCount <= menuCount) {
      topLevelSidebarElements.forEach((sidebarElement) => {
        if (!sidebarElement.parentNode.parentNode.classList.contains("open")) {
          sidebarElement.click();
        }
      });
    }
  };

  openAndCloseSidebarMenus();
}

export { handleHeroButtonClick };
