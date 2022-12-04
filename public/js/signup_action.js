function onSignUpEmployer() {
  signUpUser("EMPLOYER");
  alert("You are now signed up!");
  window.location.href = "/login.html";
}

function onSignUpEmployee() {
  signUpUser("EMPLOYEE");
  alert("You are now signed up!");
  window.location.href = "/login.html";
}

async function signUpUser(type) {
  let username, password, passwordRepeat, firstName, lastName, email;
  try {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    passwordRepeat = document.getElementById("passwordRepeat").value;
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
  } catch (err) {
    alert("Make sure all fields are filled out.");
    return;
  }

  if (password != passwordRepeat) {
    console.log(password + " " + passwordRepeat);
    alert("Passwords do not match!");
    return;
  }
  const utf8Encode = new TextEncoder();
  password = utf8Encode.encode(hash);

  crypto.subtle.digest("SHA-256", password).then(() => {
    const data = {
      username,
      password: hash,
      email,
      firstName,
      lastName,
      type,
    };
    fetch("/insert/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Request complete! response:", res);
    });
  });
}
