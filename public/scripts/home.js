// homepage starts
document.getElementById("photographer-arrow-down").addEventListener("click", handleModal);
document.getElementById("company-arrow-down").addEventListener("click", handleModal);

function handleModal() {
  const allContainers = Array.from(document.getElementsByClassName('gb-card-50-skewed'));
  const allModals = Array.from(document.getElementsByClassName('modal'));
  const allNormalDivs = Array.from(document.getElementsByClassName('without-extend'));

  // reset other containers
  allContainers.forEach(container => container.classList.remove("extended"));
  allModals.forEach(modal => modal.style.display = "none");
  allNormalDivs.forEach(modal => modal.style.display = "flex");

  const containerDiv = this.parentNode.parentNode.parentNode;
  const modalDiv = containerDiv.querySelector('.modal');
  const normalDiv = containerDiv.querySelector('.without-extend');

  // show modal of clicked item
  containerDiv.classList.add("extended");
  modalDiv.style.display = "flex";
  normalDiv.style.display = "none";
}