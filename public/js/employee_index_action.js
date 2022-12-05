const loadUsers = async () => {
  const res = await fetch("/get/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const onLoad = async () => {
  /**
	 * <a class="font-class2" href="#">
			<div id="paragraphbox">
				<div class="picturebox"></div>
				<h3 class="business" class="font-class"> Google </h3>
				<p class="inboxtext"> Position: Ontario Tech University, Game Design </p>
				<p class="inboxtext2"> Location: Toronto </p>
				<p class="inboxtext3"> About: 2 Years of Experience in Web Design at Google </p>
			</div>
		</a>
	 */

  const users = await loadUsers();

  const div = document.getElementById("list");

  for (let i = 0; i < users.length; i++) {

	let user = users[i];
	console.log(user);

	let username, firstName, lastName, email, type;
	username = user['username'];
	firstName = user['firstName'];
	lastName = user['lastName'];
	email = user['email'];
	type = user['type'];

    const aOuter = document.createElement("a");
    aOuter.classList.add("font-class2");
    aOuter.href = "#";

    const div1 = document.createElement("div");
    div1.classList.add("paragraphbox");
	div1.style.top = (50 + (i+1)*30) + `%`;


    const div2 = document.createElement("div");
    div2.classList.add("picturebox");
    div2.style.backgroundImage =
      "url('http://localhost:3000/assets/profilepic.jpg')";


    const h3 = document.createElement("h3");
    h3.classList.add("business");
    h3.classList.add("font-class");
    h3.appendChild(document.createTextNode(firstName + " " + lastName));

	const p1 = document.createElement("p");
	p1.classList.add("inboxtext");
	p1.appendChild(document.createTextNode(email));

	const p2 = document.createElement("p");
	p2.classList.add("inboxtext2");
	p2.appendChild(document.createTextNode(type));

	const p3 = document.createElement("p");
	p3.classList.add("inboxtext3");
	p3.appendChild(document.createTextNode(username));

	div1.appendChild(div2);
	div1.appendChild(h3);
	div1.appendChild(p1);
	div1.appendChild(p2);
	div1.appendChild(p3);
	aOuter.appendChild(div1);

	div.appendChild(aOuter);
  }
};

onLoad();
