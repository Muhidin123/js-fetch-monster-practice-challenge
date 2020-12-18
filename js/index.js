// {/* <body>
//     <h1>Monstr Inc.</h1>
//     <div id='create-monster'></div>
//     <div id='monster-container'></div>
//     <button id="back"><=</button>
//     <button id="forward">=></button>
//   </body> */}

const URL = "http://localhost:3000/";
const parentDiv = document.getElementById("monster-container");
let page = 1;

function fetchAllMonsters(page) {
  fetch(URL + `monsters/?_limit=50&_page=${page}`)
    .then((b) => b.json())
    .then((monsters) => {
      console.log(monsters);
      monsters.forEach(displayMonsters);
      createMonsterForm();
    });
}

function displayMonsters(monster) {
  let div = document.createElement("div");
  let hTag = document.createElement("h2");
  let hsTag = document.createElement("h4");
  let p = document.createElement("p");
  hTag.textContent = monster.name;
  hsTag.textContent = monster.age;
  p.textContent = monster.description;
  div.append(hTag, hsTag, p);
  parentDiv.append(div);
}
const back = document.getElementById("back");
const next = document.getElementById("forward");

back.addEventListener("click", (e) => {
  e.preventDefault();
  1 < page ? fetchAllMonsters(page) : (page = 1);
});

next.addEventListener("click", (e) => {
  page++;
  //   e.preventDefault();
  console.log(page);
  fetchAllMonsters(page);
});

(createMonsterForm = () => {
  const a = document.createElement("form"),
    b = document.createElement("input"),
    c = document.createElement("input"),
    d = document.createElement("input"),
    e = document.createElement("button");
  (a.id = "monster-form"),
    (b.id = "name"),
    (c.id = "age"),
    (d.id = "description"),
    (b.placeholder = "name..."),
    (c.placeholder = "age..."),
    (d.placeholder = "description..."),
    (e.innerHTML = "Create"),
    a.appendChild(b),
    a.appendChild(c),
    a.appendChild(d),
    a.appendChild(e),
    document.getElementById("create-monster").appendChild(a),
    addSubmitEventListener();
}),
  (addSubmitEventListener = () => {
    document.querySelector("#monster-form").addEventListener("submit", (a) => {
      a.preventDefault(),
        console.log("submitted", getFormData()),
        postNewMonster(getFormData()),
        clearForm();
    });
  }),
  (getFormData = () => {
    let a = document.querySelector("#name"),
      b = document.querySelector("#age"),
      c = document.querySelector("#description");
    return { name: a.value, age: parseFloat(b.value), description: c.value };
  }),
  (postNewMonster = (a) => {
    let b = URL + `monsters`,
      c = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(a),
      };
    fetch(b, c)
      .then((d) => d.json())
      .then((d) => console.log("new monster", d));
  }),
  (clearForm = () => {
    document.querySelector("#monster-form").reset();
  });

fetchAllMonsters();
