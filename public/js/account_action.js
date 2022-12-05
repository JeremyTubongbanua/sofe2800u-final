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
  const body = JSON.stringify(await res.json());
  if (body.length === 0) {
    alert("No user found. Please login first");
    document.location.href = "login.html";
  }
  // TODO do stuff with body
  //   console.log(body);
};

onLoad();
