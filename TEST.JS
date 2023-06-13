// fetch("./data/skillTextData.json")
// .then((response) => response.json())
// .then((data) => {
//   listData = data;
//   // JSON 데이터를 사용하는 로직 작성
//   listData.forEach((item, i) => {
//     const skillItems = item.skills
//       .map((skill) => `<li>${skill}</li>`)
//       .join("");
//     const HTML = `
//     <div class="skillTextCon">
//     <h3>${item.title}</h3>
//     <ul class="skillText">
//       ${skillItems}
//     </ul>
//   </div>
//     `;

//     if (item.title === "Graphics") {
//       const graphicsSkills = item.skills
//         .map(
//           (skill) =>
//             `<li><img src="./image/SKILL/${skill}.svg" alt="${skill}"></li>`
//         )
//         .join("");
//       console.log(graphicsSkills);
//       const graphicsHTML = `
//         <div class="skillTextCon">
//           <h3>${item.title}</h3>
//           <ul class="skillText">
//             ${graphicsSkills}
//           </ul>

//         </div>
//       `;
//       HTML = graphicsHTML;
//     }
//     console.log(item, "아이템", "html", HTML, "확인");
//     $tapBox.innerHTML += HTML;
//   });
// })








<!-- <div class="skillTextCon">
<h3>HTML / CSS</h3>
<ul class="skillText">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
</div> -->
<!-- <div class="skillTextCon">
<h3>Graphics</h3>
<ul class="skillText skillImgCon">
  <li>
    <img src="./image/SKILL/Photoshop.svg" alt="Photoshop" />
  </li>
  <li>
    <img
      src="./image/SKILL/illustration.svg"
      alt="illustration"
    />
  </li>
</ul>
<h3>Cooperation</h3>
<ul class="skillText skillImgCon">
  <li>
    <img src="./image/SKILL/figma.svg" alt="figma" />
  </li>
  <li>
    <img src="./image/SKILL/slack.svg" alt="slack" />
  </li>
  <li>
    <img src="./image/SKILL/notion.svg" alt="notion" />
  </li>
</ul>
</div> -->




  $skillIcon.forEach((icon, i) => {
    icon.addEventListener("click", () => {
      $skillIcon.forEach((item) => {
        item.classList.remove("on");
      });
      item.classList.add("on");
      $skillText.forEach((text) => {
        text.classList.remove("on");
      });
      $skillText[i].classList.add("on");
    });
  });





  .aboutTop .skillTextCon h3 {
    margin: 0.5rem 0;
    padding-left: 0.75rem;
    position: relative;
  }
  .aboutTop .skillTextCon h3::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 100%;
    background-color: #fff;
    top: 0;
    left: 0;
  }