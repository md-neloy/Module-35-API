const searchText = document.getElementById("searchText");
searchText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loadVideos(searchText.value);
    return;
  }
});
// fetch, load & show categories in html

// create a function which coverts seconds to an hours, minutes & seconds
function convertSeconds(seconds) {
  let hour = parseInt(seconds / 3600);
  let restsecond = seconds % 3600;
  let minutes = parseInt(restsecond / 60);
  let second = restsecond % 60;
  return `${hour} hrs ${minutes} ago`;
}

// crate loadCategories()
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => DisplayCatagories(data.categories))
    .catch((error) => console.log(error));
};

const removeActiveClass = () => {
  const categoryBtn = document.querySelectorAll(".category-btn");
  for (let btn of categoryBtn) {
    btn.classList.remove("bg-lime-500", "hover:bg-lime-500");
  }
};

// create DisplayCategories
const DisplayCatagories = (data) => {
  const sectionCetegroyButton = document.getElementById("cetegroyButton");
  data.forEach((element) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList = "btn category-btn";
    categoryBtn.addEventListener("click", () => {
      videosCatagory(element.category_id);
      removeActiveClass();
      categoryBtn.classList.add("bg-lime-500", "hover:bg-lime-500");
    });
    categoryBtn.innerText = element.category;
    sectionCetegroyButton.appendChild(categoryBtn);
  });
};
loadCatagories();

// crate videosCatagory function
const videosCatagory = async (videosCatagory) => {
  let response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${videosCatagory}`
  );
  let data = await response.json();
  DisplayVideos(data.category);
};

// crate load videos funtion
const loadVideos = (title = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${title}`
  )
    .then((response) => response.json())
    .then((data) => DisplayVideos(data["videos"]))
    .catch((error) => console.log(error));
};

// create DisplayVideos()
const DisplayVideos = (data) => {
  const videosSection = document.getElementById("videos");
  data.length
    ? ((videosSection.innerHTML = ""), videosSection.classList.add("grid"))
    : (videosSection.classList.remove("grid"),
      (videosSection.innerHTML = `
    <div class="flex flex-col justify-center items-center">
      <img src="./assets/Icon.png"/>
    </div>
    `));

  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl";
    const verify = element.authors[0]["verified"];
    let verifyIcon = "";
    if (verify) {
      verifyIcon = `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`;
    }
    card.innerHTML = `
    <figure class="h-56 relative">
      ${
        element.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 bottom-2 bg-black text-white p-1">${convertSeconds(
              element.others.posted_date
            )}</span>`
      }
      <img
      class="w-full h-full"
        src="${element.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body flex-row items-center gap-2">
      <div>
        <img class="w-10 h-10 rounded-full object-cover" src="${
          element.authors[0]["profile_picture"]
        }"/>
      </div>
      <div>
        <h2 class="font-bold">${element.title}</h2>
        <p class="flex gap-2 justify-center items-center">${
          element.authors[0]["profile_name"]
        } <span>${verifyIcon}</span></p>
        <p></p>
      </div>
    </div>
    `;
    const detailsButton = document.createElement("button");
    detailsButton.innerText = "Details";
    detailsButton.classList = "btn";
    detailsButton.addEventListener("click", () => {
      videoDetails(element.video_id);
    });
    card.appendChild(detailsButton);
    videosSection.appendChild(card);
  });
};
// fetch video details from api
const videoDetails = async (videoId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await response.json();
  console.log(data.video);
  const modalcontainer = document.getElementById("modal_container");
  modalcontainer.innerHTML = `
  <img class="w-full" important src="${data.video.thumbnail}"/>
  <p class="py-2">${data.video.description}</p>
  `;
  my_modal_1.showModal();
};
loadVideos();
