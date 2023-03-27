let hamburger = document.getElementById("hamburger");
let sidebar = document.getElementById("sidebar");
let sidebarCloseIcon = document.getElementById(".sidebar_close-icon");

hamburger.onclick = () => {
  openSidebar();
};
sidebarCloseIcon.onclick = () => {
  closeSidebar();
};

function openSidebar() {
    if(sidebar.classList.contains("open")){
        return
    }
  setTimeout(() => {
  sidebar.classList.add("open");
  }, 100);
}
function closeSidebar() {
  sidebar.classList.remove("open");
}

function handleListener(event) {
  if (
    !event.target.matches("#sidebar, #sidebar *") &&
    sidebar.classList.contains("open") 
  ) {
    closeSidebar();
  }
}
document.addEventListener("click", handleListener);
