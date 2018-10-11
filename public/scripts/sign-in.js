function signIn(e) {
  e.preventDefault();
  const form = document.getElementById("sign-in-form").elements;
  const email = form["email"].value;
  const password = form["password"].value;

  const errorContainer = document.getElementById("error-message");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("success!");
      window.location = "http://localhost:3000/dashboard";
      console.log(window);
    })
    .catch(error => {
      errorContainer.style.display = "block";
      errorContainer.innerText = error.message;
    });
}
