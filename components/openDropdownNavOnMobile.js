const hamburgerMenu = document.querySelector(".nextra-hamburger");
const hamburgerInner = document.querySelector(".nextra-hamburger > svg");
const mediaSmall = window.matchMedia("(max-width: 767px)");
const mediaLarge = window.matchMedia("(min-width: 767px)");

console.log("hit open dropdown script");

if (mediaSmall.matches && !hamburgerInner.classList.contains("open")) {
  hamburgerMenu.removeEventListener("click", null);

  console.log("on mobile. open automatically.");
  hamburgerMenu.click();
}
