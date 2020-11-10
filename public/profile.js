//----- สร้าง function addImagestoGallery เพื่อเรียกเพิ่มรูปภาพที่ได้เข้าไปในส่วนแสดงผล

const addInfo = (res) => {
    const profile = document.querySelector(".profile");
    let html = "";
        html += `
            <div class = "card" style="margin-top: 50px">
                <div class = "card-body">
                    <div class = "row">
                        <div class = "col-3">
                            <div align="right">
                                <img class="photo__profile" src="${res.profile_image.large}" />
                            </div>
                        </div>
                        <div class = "col-9">
                            <h3 style="margin: 0px;"> ${res.username} </h3>
                            <div style="margin-top: 15px; margin-bottom: 10px;">
                                ${res.total_photos} Photos | 
                                ${res.followers_count} Followers | 
                                ${res.following_count} Following
                            </div>
                            <div>
                                <b>${res.username}</b> ${res.bio}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    profile.innerHTML = html;
};

const addUserPhotos = (res) => {
    const profile = document.querySelector(".gallery");
    let html = "";
        res.forEach((element) => {
        html += `
            <div class = "card" style="margin-top: 50px">
                <div class = "card-body">
                    <div class = "row">
                        <div class = "col-3">
                            <div align="right">
                                <img class="photo__profile" src="${element.urls.full}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        });
    profile.innerHTML = html;
};

//----- 11 สร้าง function callAPI เพื่อเรียกใช้งาน API -----------
const callAPI = async (username) => {
    try {
        console.log("Username --> ", username);
        const response = await fetch("/api/searchUser", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username}),
        });
        const res = await response.json();
        //check response return from our API
        console.log("response ----> ", res);
        //6. Add images to gallery
        addInfo(res);
    } catch (error) {
        console.log("message error --->", error);
    }
};

const callPhotosAPI = async (username) => {
    try {
        console.log("Username --> ", username);
        const response = await fetch("/api/Photos", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username}),
        });
        const res = await response.json();
        //check response return from our API
        console.log("response ----> ", res);
        //6. Add images to gallery
        addUserPhotos(res);
    } catch (error) {
        console.log("message error --->", error);
    }
};

const main = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(queryString);
    const username = urlParams.get('username')

    if(urlParams.has('username')) {
        //console.log(username);
        callAPI(username);
        callPhotosAPI(username);
    } else {
        console.log('Please Enter Username');
    }
};

main();