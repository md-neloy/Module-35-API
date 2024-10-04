// fetch, load & show categories in html

// crate loadCategories()
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => DisplayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// create DisplayCategories
const DisplayCatagories = (data) => {
  const sectionCetegroyButton = document.getElementById("cetegroyButton");
  data.forEach((element) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList = "btn";
    categoryBtn.innerText = element.category;
    sectionCetegroyButton.appendChild(categoryBtn);
  });
};
loadCatagories();

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

// create loadVideos()
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => DisplayVideos(data["videos"]))
    .catch((error) => console.log(error));
};
// create a function which coverts seconds to an hours, minutes & seconds
function converSeconds(seconds) {
  let hour = parseInt(seconds / 3600);
  let restsecond = seconds % 3600;
  let minutes = parseInt(restsecond / 60);
  let second = restsecond % 60;
  return `${hour} hrs ${minutes} ago`;

}
// create DisplayVideos()
const DisplayVideos = (data) => {
  const videosSection = document.getElementById("videos");
  data.forEach((element) => {
    console.log(element.others);
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
          : `<span class="absolute right-2 bottom-2 bg-black text-white p-1">${converSeconds(element.others.posted_date)}</span>`
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
    videosSection.appendChild(card);
  });
};
loadVideos();
