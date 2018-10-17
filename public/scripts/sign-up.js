const database = firebase.database().ref();

// get type of the url
const url = window.location.href;
const type = url.split("?type=")[1];

const typeSpan = document.getElementById('type');
const typeSelect = document.getElementById('type-select');
const selectType = document.getElementById('select-type');

// select SVGs
const camera = document.getElementById('camera');
const contactCard = document.getElementById('business-card');

if (type !== undefined &&
  type === "photographer" || type === "company") {
  // replace header for the type
  typeSpan.innerText = `as a ${type}`;
  // set value of the type select
  typeSelect.value = type;
  selectType.innerText = type;
  camera.style.display = type === "photographer" ? "block" : "none";
  contactCard.style.display = type === "company" ? "block" : "none";
}

/**
 * Signs up user.
 *
 * @param e
 */
function signUp(e) {
  e.preventDefault();
  const form = document.getElementById("sign-up-form").elements;

  const name = form["name"].value;
  const email = form["email"].value;
  const password = form["password"].value;
  const password2 = form["password2"].value;
  const type = selectType.innerText;

  const messages = inputIsValid(name, password, password2);

  if (messages.length < 1) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((snap) => {
        let user = snap.user;
        user.updateProfile({
          displayName: name,
          photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
        });
        //TODO: find better profile url
        database.child(type).child(user.uid).set({
          email: user.email
        })
          .then(() => {
            database.child("users").child(user.uid).set({
              type: type,
              email: user.email,
              displayName: name,
              photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
            });
          })
          .then(() => {
            console.log("success!");
            window.location = "http://localhost:3000/dashboard";
          })
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  } else {
    showErrorMessage(messages.join("<br>"));
  }
}

function inputIsValid(name, password, password2) {
  let messages = [];
  if (name.length < 3) messages.push("Name has to be at least 3 characters long.");
  if (password !== password2) messages.push("Passwords have to match each other.");
  return messages;
}

/**
 * Displays error message for user.
 *
 * @param message
 */
function showErrorMessage(message) {
  const errorContainer = document.getElementById("error-message");
  errorContainer.style.display = "block";
  errorContainer.innerHTML = message;
}

let show = false;

function showCustomSelectHandler(e) {
  const selectDropDown = document.getElementById("select-dropdown");
  if (!e.target.classList.contains("custom-select-option")) {
    selectDropDown.style.display = show ? "block" : "none";
    show = !show;
  }
}

function optionSelectHandler(selectedType) {
  const selectDropDown = document.getElementById("select-dropdown");
  selectType.innerText = selectedType;
  camera.style.display = selectedType === "photographer" ? "block" : "none";
  contactCard.style.display = selectedType === "company" ? "block" : "none";
  selectDropDown.style.display = "none";
}
