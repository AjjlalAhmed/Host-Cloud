// Burger Button
const navMenu = document.getElementById("nav-menu");
const burgerBtn = document.querySelector(".burger-menu");
let clicked = true;
burgerBtn.addEventListener("click", () => {
  if (clicked === true) {
    navMenu.style.maxHeight = `500px`;
    clicked = false;
  } else {
    navMenu.style.maxHeight = `0px`;
    clicked = true;
  }
});

// Scroll Event
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY < 80) {
    header.style.background = "transparent";
  } else {
    header.style.background = "#000";
  }
});

// Testomonial function
const comments = [
  "Lorem ipsum dolor sit amet consectetur,adipisicing elit. Quotenetur incidunt natus in sed dicta nihil est vero eumconsectetur?",

  "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",

  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",
];
const Name = ["william smith", "jack", "joe"];

let count = 0;
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
nextBtn.addEventListener("click", () => {
  count++;
  if (count > 2) {
    count = 0;
  }
  const commentBox = document.querySelector(".comment");
  const userName = document.querySelector(".user > h1");
  commentBox.innerHTML = comments[count];
  userName.innerHTML = Name[count];
});

prevBtn.addEventListener("click", () => {
  count--;
  if (count < 0) {
    count = 2;
  }
  const commentBox = document.querySelector(".comment");
  const userName = document.querySelector(".user > h1");
  commentBox.innerHTML = comments[count];
  userName.innerHTML = Name[count];
});

// Search Domain function
const searchBtn = document.querySelector(".search > button");
// if (searchBtn == null) {
//   searchBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     document.getElementById("result-info").style.display = "flex";
//     const animateClass = document.querySelector("#result-info > div");
//     animateClass.classList.add("loading-animation");
//     let inputValue = document.querySelector(".search > input").value;
//     if (inputValue.includes(`.`)) {
//       let radioNames = document.querySelectorAll("input[name='radio-dots']");
//       for (const radioName of radioNames) {
//         if (radioName.checked) {
//           afterDot = radioName.value;
//           inputValue = inputValue.split(".")[0];
//           inputValue = inputValue.concat(afterDot);
//           await fetch("/api/search", {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify([inputValue]),
//           });
//         } else {
//           await fetch("/api/search", {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify([inputValue]),
//           });
//         }
//       }
//       const siteName = document.querySelector(".site-name");
//       const siteAvailability = document.querySelector(".site-availability");
//       await fetch("/search")
//         .then((response) => response.json())
//         .then((data) => {
//           fetch("/api/save", {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           });
//           siteName.innerHTML = data.domainName;
//           siteAvailability.innerHTML = data.domainAvailability;
//           document.getElementById("result-info").style.display = "flex";
//           const animateClass = document.querySelector("#result-info > div");
//           animateClass.classList.remove("loading-animation");
//           if (siteAvailability.innerHTML == "available") {
//             document.getElementById("available").style.background = "#6CA468";
//           } else {
//             document.getElementById("available").style.background = "	#cc3300";
//           }
//         })
//         .catch((error) => {
//           document.getElementById("result").style.display = "flex";
//           document.getElementById("result-info").style.display = "flex";
//           const animateClass = document.querySelector("#result-info > div");
//           animateClass.classList.remove("loading-animation");
//           siteAvailability.innerHTML = "something is wrong";
//           siteName.innerHTML = "error";
//           document.getElementById("available").style.background = "	#cc3300";
//         });
//     } else {
//       document.getElementById("result-info").style.display = "flex";
//       const animateClass = document.querySelector("#result-info > div");
//       animateClass.classList.remove("loading-animation");
//       const siteName = document.querySelector(".site-name");
//       const siteAvailability = document.querySelector(".site-availability");
//       document.getElementById("result").style.display = "flex";
//       siteAvailability.innerHTML = "error";
//       siteName.innerHTML = "missing dot";
//       document.getElementById("available").style.background = "	#cc3300";
//     }
//     await fetch("/searchNet")
//       .then((response) => response.json())
//       .then((data) => {
//         fetch("/api/searchNet", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//       });
//     await fetch("/searchOrg")
//       .then((response) => response.json())
//       .then((data) => {
//         fetch("/api/searchNet", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//       });
//     await fetch("/searchIn")
//       .then((response) => response.json())
//       .then((data) => {
//         fetch("/api/searchIn", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//       });
//   });
// }

if (searchBtn !== null) {
  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    getdomainData().then(async () => {
      await fetch("/searchNet")
      .then((response) => response.json())
      .then((data) => {
        getMoreDomainData(data);
        fetch("/api/searchNet", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    await fetch("/searchOrg")
      .then((response) => response.json())
      .then((data) => {
        getMoreDomainData(data);
        fetch("/api/searchNet", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    await fetch("/searchIn")
      .then((response) => response.json())
      .then((data) => {
        getMoreDomainData(data);
        fetch("/api/searchIn", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      })
  
    });
  });
}

async function getdomainData() {
  document.getElementById("result-info").style.display = "flex";
  const animateClass = document.querySelector("#result-info > div");
  animateClass.classList.add("loading-animation");
  let inputValue = document.querySelector(".search > input").value;
  if (inputValue.includes(`.`)) {
    let radioNames = document.querySelectorAll("input[name='radio-dots']");
    for (const radioName of radioNames) {
      if (radioName.checked) {
        afterDot = radioName.value;
        inputValue = inputValue.split(".")[0];
        inputValue = inputValue.concat(afterDot);
        await fetch("/api/search", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([inputValue]),
        });
      } else {
        await fetch("/api/search", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([inputValue]),
        });
      }
    }
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    const siteName = document.createElement("p");
    const siteAvailability = document.createElement("p");
    const resultWraper = document.createElement("div");
    resultWraper.classList.add("result-wraper");
    resultWraper.appendChild(siteName);
    resultWraper.appendChild(siteAvailability);
    siteAvailability.style.padding = "10px";
    siteName.style.padding = "10px";
    resultDiv.appendChild(resultWraper);
    await fetch("/search")
      .then((response) => response.json())
      .then((data) => {
        fetch("/api/save", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        siteName.textContent = data.domainName;
        siteAvailability.textContent = data.domainAvailability;
        siteName.classList.add("siteName");
        siteAvailability.classList.add("siteAvailability");
        document.getElementById("result-info").style.display = "flex";
        const animateClass = document.querySelector("#result-info > div");
        animateClass.classList.remove("loading-animation");
        if (siteAvailability.textContent == "available") {
          siteAvailability.style.background = "#6CA468";
        } else {
          siteAvailability.style.background = "	#cc3300";
        }
      })
      .catch((error) => {
        document.getElementById("result-info").style.display = "flex";
        const animateClass = document.querySelector("#result-info > div");
        animateClass.classList.remove("loading-animation");
        siteAvailability.textContent = "something is wrong";
        siteName.textContent = "error";
        siteAvailability.style.background = "	#cc3300";
      });
  } else {
    document.getElementById("result-info").style.display = "flex";
    animateClass.classList.remove("loading-animation");
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    const siteName = document.createElement("p");
    const siteAvailability = document.createElement("p");
    siteAvailability.style.padding = "10px";
    siteName.style.padding = "10px";
    resultDiv.appendChild(siteName);
    resultDiv.appendChild(siteAvailability);
    siteAvailability.textContent = "error";
    siteName.textContent = "missing dot";
    siteAvailability.style.background = "	#cc3300";
  }
}
function getMoreDomainData(data) {
  const resultDiv = document.getElementById("result");
  const siteName = document.createElement("p");
  const siteAvailability = document.createElement("p");
  siteAvailability.style.padding = "10px";
  siteName.style.padding = "10px";
  const resultWraper = document.createElement("div");
  resultWraper.classList.add("result-wraper");
  resultWraper.appendChild(siteName);
  resultWraper.appendChild(siteAvailability);
  resultDiv.appendChild(resultWraper);
  siteName.textContent = data.domainName;
  siteAvailability.textContent = data.domainAvailability;
  siteName.classList.add("siteName");
  siteAvailability.classList.add("siteAvailability");
  document.getElementById("result-info").style.display = "flex";
  const animateClass = document.querySelector("#result-info > div");
  animateClass.classList.remove("loading-animation");
  if (siteAvailability.textContent == "available") {
    siteAvailability.style.background = "#6CA468";
  } else {
    siteAvailability.style.background = "	#cc3300";
  }
}

// About detail funtion
const detailBtn = document.querySelectorAll(".about-detail > ul > li > button");
const aboutdetail = {
  detailOne:
    "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
  detailTwo:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',",
  detailThree:
    "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you",
};
if (detailBtn !== null) {
  detailBtn.forEach((item) => {
    item.addEventListener("click", () => {
      detailBtn.forEach((btn) => {
        btn.classList.remove("about-active");
      });
      if (item.id != Object.keys(aboutdetail)) {
        let x = (document.querySelector(".about-p1").innerHTML = `${
          aboutdetail[`${item.id}`]
        }`);
        item.classList.add("about-active");
      }
    });
  });
}
