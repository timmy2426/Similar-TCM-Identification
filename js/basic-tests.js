document.addEventListener("DOMContentLoaded", function () {
  let newTestBank = JSON.parse(JSON.stringify(testBank));
  let quiz = [];
  let answer = [];

  function questionGenerator() {
    let arrTemp = JSON.parse(JSON.stringify(newTestBank));
    let ans = [];
    let test = {
      id: 0,
      question: "",
      answer: [],
      solution: "",
    };

    for (let i = 0; i < 4; i++) {
      let obj = arrTemp[Math.floor(Math.random() * arrTemp.length)];
      arrTemp.splice(
        arrTemp.findIndex((ele) => ele.id === obj.id),
        1
      );
      ans.push(obj);
    }

    let que = ans[Math.floor(Math.random() * ans.length)];
    test.id = que.id;
    test.question = que.img;
    test.solution = que.name;
    ans.forEach((ele) => {
      test.answer.push({ id: ele.id, name: ele.name });
    });

    newTestBank.splice(
      newTestBank.findIndex((ele) => ele.id === que.id),
      1
    );

    return test;
  }

  document.querySelector("#newQuiz").addEventListener("click", (e) => {
    let display = document.querySelector(".quiz");
    let i = 0;
    document.querySelector(".control").classList.remove("show");
    newTestBank = JSON.parse(JSON.stringify(testBank));
    quiz = [];
    answer = [];
    display.innerHTML = "";

    for (let i = 0; i < 25; i++) {
      let test = questionGenerator();
      quiz.push(test);
    }

    quiz.forEach(function (e) {
      let newTest = document.createElement("div");
      newTest.setAttribute("class", "test");
      newTest.innerHTML =
        `<h2>第` +
        (i + 1) +
        `題</h2>
<div class="col">
<div class="question">
<img src="` +
        e.question +
        `">
</div>
<div class="answer">
<div class="options">
<input type="radio" name="test` +
        i +
        `" id="` +
        i +
        `-0" value="` +
        e.answer[0].id +
        `">
<label for="` +
        i +
        `-0">` +
        e.answer[0].name +
        `</label>
</div>
<div class="options">
<input type="radio" name="test` +
        i +
        `" id="` +
        i +
        `-1" value="` +
        e.answer[1].id +
        `">
<label for="` +
        i +
        `-1">` +
        e.answer[1].name +
        `</label>
</div>
<div class="options">
<input type="radio" name="test` +
        i +
        `" id="` +
        i +
        `-2" value="` +
        e.answer[2].id +
        `">
<label for="` +
        i +
        `-2">` +
        e.answer[2].name +
        `</label>
</div>
<div class="options">
<input type="radio" name="test` +
        i +
        `" id="` +
        i +
        `-3" value="` +
        e.answer[3].id +
        `">
<label for="` +
        i +
        `-3">` +
        e.answer[3].name +
        `</label>
</div>
<p>正確答案： <span class="solution"></span></p>
</div>
</div>`;
      i++;
      display.appendChild(newTest);
    });
  });

  document.querySelector("#send").addEventListener("click", (e) => {
    let obj = document.querySelectorAll(".test");
    let grade = 0;
    document.querySelector(".control").classList.add("show");

    obj.forEach((e) => {
      let ans = 0;
      let input = e.querySelectorAll("input");
      e.querySelector("p").setAttribute("class", "show");
      for (let i = 0; i < 4; i++) {
        ans++;
        if (input[i].checked) {
          answer.push(parseInt(input[i].value, 10));
          break;
        }
        if (ans === 4) {
          answer.push(9999);
        }
      }
    });

    for (let i = 0; i < 25; i++) {
      obj[i].querySelector(".solution").setAttribute("class", "solution");
      obj[i].querySelector(".solution").innerHTML = quiz[i].solution;
      if (answer[i] === quiz[i].id) {
        grade = grade + 4;
      } else {
        obj[i].querySelector(".solution").classList.add("wrong");
      }
    }

    document.querySelector(".num").innerHTML = grade;
    window.scrollTo(0, 0);
  });

  document.querySelector("#newQuiz").click();
});
