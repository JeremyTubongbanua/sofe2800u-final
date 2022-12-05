const userExists = async (username) => {
  const data = {
    username,
  };
  const res = await fetch("/exists/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  console.log(body);
  return body["exists"];
};

const sessionExists = async (sessionId) => {
  const data = {
    sessionId,
  };
  const res = await fetch("/exists/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = res.body;
  console.log(body);
  return body["sessionExists"];
};

const sendLoginRequest = async (username, password) => {
  const sessionId = crypto.randomUUID();

  document.cookie = `sessionId=${sessionId}`;

  const data = {
    username,
    password,
    sessionId,
  };

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  // console.log('sent login request and got: ' + JSON.stringify(body));
  if (body["success"]) {
    return true;
  } else {
    alert("Wrong password!");
    return false;
  }
};

const onLoginClick = async () => {
  let username, password;
  try {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
  } catch (err) {
    alert("Make sure all fields are filled out.");
    return;
  }
  const uExists = await userExists(username);
  if (uExists) {
    alert("Logging in...");
    await sendLoginRequest(username, password);
  } else {
    alert("Username dose not exist... Sign up first!");
    return;
  }
};
