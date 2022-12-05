const list = document.getElementById("list");

const loadJobs = async () => {
  const res = await fetch("/get/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const body = await res.json();
    console.log(body);
  return body;
};

const initializeCheckboxes = () => {

    const canadaCheckbox = document.getElementById("canadaCheckbox");
    const usCheckbox = document.getElementById("us-checkbox");

    const softwareEngineeringCheckbox = document.getElementById("softwareengineering-checkbox");
    const mechanicalEngineeringCheckbox = document.getElementById("mechanicalengineering-checkbox");
    const chemicalEngineeringCheckbox = document.getElementById("chemicalengineering-checkbox");
    const financeCheckbox = document.getElementById("finance-checkbox");
    const accountingCheckbox = document.getElementById("accounting-checkbox");
    const economicsCheckbox = document.getElementById("economics-checkbox");

    canadaCheckbox.addEventListener("change", (e) => {
        console.log(e);
    });
};

// initializeCheckboxes();

loadJobs().then((jobs) => {
  const div = document.getElementById("list");
  console.log(jobs.length)
  for (let i = 0; i < jobs.length; i++) {
    let name, organization, location, qualification;
    name = jobs[i].name;
    organization = jobs[i].organization;
    location = jobs[i].location;
    qualification = jobs[i].qualification;
    imageUrl = jobs[i].imageUrl;

    const aOuter = document.createElement("a");
    aOuter.classList.add("font-class2");
    aOuter.href = "#";

    const divOuter = document.createElement("div");
    divOuter.classList.add("paragraphbox");
	divOuter.style.top = (50 + (i+1)*30) + `%`;

    const divOuter2 = document.createElement("div");
    divOuter2.classList.add('picturebox');
    divOuter2.style.backgroundImage = `url(${imageUrl})`;

    const h3 = document.createElement("h3");
    h3.classList.add("business");

    const p1 = document.createElement("p");
    p1.classList.add("inboxtext");
    p1.appendChild(document.createTextNode(organization));

    const p2 = document.createElement("p");
    p2.classList.add('inboxtext2');
    p2.appendChild(document.createTextNode(location));

    const p3 = document.createElement("p");
    p3.classList.add('inboxtext3');
    p3.appendChild(document.createTextNode(qualification));

    divOuter.appendChild(divOuter2)
    divOuter.appendChild(h3);
    divOuter.appendChild(p1);
    divOuter.appendChild(p2);
    divOuter.appendChild(p3);

    aOuter.appendChild(divOuter);

    div.appendChild(aOuter);
    console.log(div);
  }
});
// strings

/**
 *  <a class="font-class2" href="#">
        <div id="paragraphbox">
            <div class="picturebox"></div>
            <h3 class="business" class="font-class"> Harold Bell </h3>
            <p class="inboxtext"> School: Ontario Tech University, Game Design </p>
            <p class="inboxtext2"> Country: Canada </p>
            <p class="inboxtext3"> Main Qualification: 2 Years of Experience in Web Design at Google </p>
        </div>
    </a> 
 */
