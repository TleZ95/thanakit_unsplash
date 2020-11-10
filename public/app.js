//----- สร้าง function addImagestoGallery เพื่อเรียกเพิ่มรูปภาพที่ได้เข้าไปในส่วนแสดงผล

const addImagestoGallery = (res) => {
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.results.forEach((element) => {
    html += `
    <section class="photo">
      <a href = "profile.html?username=${element.user.username}">
        <header class="photo__header">
          <div class="photo__header-column">
            <img class="photo__avatar" src="${element.user.profile_image.medium}"/>
          </div>
          <div class="photo__header-column">
            <span class="photo__username">${element.user.username}</span>
          </div>
        </header>
      </a>
      <div class="photo__file-container">
        <img class="photo__file" src="${element.links.download}"/>
      </div>
      <div class="photo__info">
        <div class="photo__icons">
          <span class="photo__icon">
            <i class="fa fa-heart-o heart fa-lg"></i>
          </span>
          <span class="photo__icon">
            <i class="fa fa-comment-o fa-lg"></i>
          </span>
        </div>
        <span class="photo__likes">${element.user.total_likes} likes</span>
        <div class="photo__comments">
          <div class="photo__comment">
            ${element.alt_description}
          </div>
        </div>
      </div>
    </section>       
    `;
  });
  gallery.innerHTML = html;
};

//----- 11 สร้าง function callAPI เพื่อเรียกใช้งาน API -----------
const callAPI = async (keyword) => {
  try {
    console.log("keyword --> ", keyword);
    const response = await fetch("/api/searchPhotos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword
      }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
    //6. Add images to gallery
    addImagestoGallery(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};

const removeAllPhoto = () => {
  const galleryElement = document.querySelector(".gallery");
  galleryElement.innerHTML = "";
};

const searchPhoto = (event) => {
  const keyword = event.target.value;
  if (event.key === "Enter" && keyword) {
    removeAllPhoto();
    //5. Call API
    callAPI(keyword);
  }
};
const main = () => {
  const inputElement = document.querySelector(".search");
  inputElement.addEventListener("keydown", searchPhoto);
};

main();