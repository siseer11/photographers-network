const database = firebase.database().ref();

// get type of the url
const url = window.location.href;
const type = url.split("?type=")[1];

// replace header for the type
const typeSpan = document.getElementById('type');
typeSpan.innerText = type;

// set value of the type select
const typeSelect = document.getElementById('type-select');
typeSelect.value = type;

function signUp(e) {
  e.preventDefault();
  const form = document.getElementById("sign-up-form").elements;

  const name = form["name"].value;
  const email = form["email"].value;
  const password = form["password"].value;
  const password2 = form["password2"].value;
  const type = form["type"].value;

  if (password === password2) {
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
          });
      })
  }
}

