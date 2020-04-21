console.log("hello world!");

// reference to the form
const form = document.querySelector("form");

// reference to the loading gif
const loadingElement = document.querySelector(".loading");
const mewsElement = document.querySelector(".mews");
const API_URL = window.location.hostname === "localhost" ? "http://localhost:5000/mews" : "https://dparis-twitter-clone.now.sh/mews";

loadingElement.style.display = "";

listAllMews();

// adds an event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents the form attempting to upload data

  // FormData is built into the browser, it works by passing a reference to the form
  const formData = new FormData(form);

  // Since our <input> in html has the name 'name' that's how we access it
  const name = formData.get("name");

  // Since our <textarea> in html has the name 'content' that's how we access it
  const content = formData.get("content");

  const mew = {
    name,
    content,
  };
  console.log(mew);
  form.style.display = "none";
  loadingElement.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(mew),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdMew) => {
      console.log(createdMew);
      form.reset();
      //loadingElement.style.display = "none";
      form.style.display = "";
      listAllMews();
    });
});

function listAllMews() {
    mewsElement.innerHTML = "";
  fetch(API_URL)
    .then((response) => response.json())
    .then((mews) => {
      console.log(mews);
      console.log("This is for le dillan");
      mews.reverse();
      mews.forEach((mew) => {
        const div = document.createElement("div");

        const header = document.createElement("h3");
        header.textContent = mew.name;

        const contents = document.createElement("p");
        contents.textContent = mew.content;

        const date = document.createElement('small');
        date.textContent = new Date(mew.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        mewsElement.appendChild(div);
      });
      loadingElement.style.display = "none";
    });
}
