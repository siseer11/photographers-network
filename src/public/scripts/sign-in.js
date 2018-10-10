
function signIn(e) {
  e.preventDefault();
  const form = document.getElementById("sign-in-form").elements;

  firebase
    .auth()
    .signInWithEmailAndPassword(form["email"].value, form["password"].value)
    .then(() => {
      console.log("success!");
      window.location = "http://localhost:3000/dashboard";
      console.log(window);
    })
    .catch(error => {
      this.setState({ error: true, errorMessage: error.message });
    });
}
