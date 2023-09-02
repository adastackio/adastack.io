function handleClick(event) {
  const homeCardTextContent = event.target.textContent;
  const sidebarElements = document.querySelectorAll(".sidebar-menu-item");
  sidebarElements.forEach((sidebarElement) => {
    if (homeCardTextContent === sidebarElement.textContent) {
      sidebarElement.click();
    }
  });
}

export { handleClick };
