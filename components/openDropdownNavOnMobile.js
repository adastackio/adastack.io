openDropdownNavOnMobile = () => {
  const hamburgerMenu = document.querySelector(".nextra-hamburger");
  const hamburgerInner = document.querySelector(".nextra-hamburger > svg");
  const mediaSmall = window.matchMedia("(max-width: 767px)");
  const mediaLarge = window.matchMedia("(min-width: 767px)");

  if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
    console.log("on mobile. open automatically.");
    hamburgerMenu.click();
  }
};

openDropdownNavOnMobile();

export { openDropdownNavOnMobile };
