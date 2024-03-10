console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
// let navLinks = $$("nav a");
// let currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname
// );
// currentLink?.classList.add("current");

document.body.insertAdjacentHTML(
  "afterbegin",
  `
	<label class="color-scheme"  style="position: absolute; top: 1rem; right:1rem; font-size: 80%">
		Theme:
		<select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
		</select>
	</label>`
);

let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "resume/", title: "Resume" },
  { url: "contact/", title: "Contact" },
  { url: "A2/report.html", title: "A2" },
  { url: "A3/A3_report.html", title: "A3" },
  { url: "A4/A4_report.html", title: "A4" },
  { url: "https://github.com/shaylatn/datavis_portfolio", title: "Github" },
  // add the rest of your pages here
];

let nav = document.createElement("nav");
document.body.prepend(nav);
const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

  // TODO create link and add it to nav
  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;
  nav.append(a);

  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname
  );
  if (a.host !== location.host) {
    a.target = "_blank";
  }
}
let select = document.querySelector(".color-scheme select");
select.addEventListener("input", function (event) {
  console.log("color scheme changed to", event.target.value);
  document.documentElement.style.setProperty(
    "color-scheme",
    event.target.value
  );
  localStorage.colorScheme = event.target.value;
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.colorScheme) {
    // Set the color scheme to the value stored in localStorage
    document.documentElement.style.setProperty(
      "color-scheme",
      localStorage.colorScheme
    );

    // Update the <select> element to match the stored preference
    select.value = localStorage.colorScheme;
  }
});
