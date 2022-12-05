const onLoad = async () => {
  let sessionId;
  const split = document.cookie.split(";");
  for (let i = 0; i < split.length; i++) {
    const [key, value] = split[i].split("=");
    if (key.trim() === "sessionId") {
      sessionId = value;
      break;
    }
  }
  if (!sessionId) {
    alert("No session id found. Please login first");
    document.location.href = "login.html";
  }
  const res = await fetch("/get/user/sessionid", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  const body = await res.json();
  if (body.length === 0) {
    alert("No user found. Please login first");
    document.location.href = "login.html";
  }
  const imageUrl = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
  const firstName = body['firstName'];
  const lastName = body['lastName'];
  const username = body['username'];
  const type = body['type'];

  const html = `<div>
  <img src="` + imageUrl + `" alt="profile picture">
  <h2>` + firstName + ' ' + lastName + `</h2>
  <p>` + username + `</p>
  <p>Type: ` + type + `</p>
</div>
<div>
  <h2>Experience</h2>
  <p>This paragraph is for listing all the experience.</p>
</div>`;
const div = document.getElementById('profileBox');
div.innerHTML = html;

};

const pushEdits = async () => {
  let username, email, password, passwordRepeat, firstName, lastName;
  try {
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    passwordRepeat = document.getElementById("passwordRepeat").value;
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    type = document.getElementById("type").value;
  } catch (err) {
    alert("Please fill out all fields");
    return;
  }
  if (password != passwordRepeat) {
    alert("Passwords do not match");
    return;
  }
  const res = await fetch("/edit/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName,
      type,
    }),
  });
  const body = JSON.stringify(await res.json());
  if (body["success"]) {
    alert("Successfully edited user");
  } else {
    alert("Could not edit user");
  }
};

onLoad();
