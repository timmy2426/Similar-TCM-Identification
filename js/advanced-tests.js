document.addEventListener("DOMContentLoaded", function () {
  let newMapping = [];
  let quiz = [];
  let answer = [];

  function getData(id) {
    return testBank.find((item) => item.id === id);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function questionGenerator(category) {
    const sourcesArr = newMapping[category];
    const targetItem = Math.floor(Math.random() * sourcesArr.length);
    const targetPairArr = sourcesArr[targetItem];
    const solutionId =
      targetPairArr[Math.floor(Math.random() * targetPairArr.length)];
    const test = {
      id: 0,
      question: "",
      answer: [],
      solution: "",
    };
    let ans = [];

    ans.push(...targetPairArr);
    sourcesArr.splice(targetItem, 1);
    let ansPairArr = sourcesArr[Math.floor(Math.random() * sourcesArr.length)];
    while (ans.length < 4) {
      const ansId = ansPairArr[Math.floor(Math.random() * ansPairArr.length)];
      if (!ans.includes(ansId)) {
        ans.push(ansId);
      }
    }
    ans = shuffleArray(ans);

    let solution = getData(solutionId);
    test.id = solution.id;
    test.question = solution.img;
    test.solution = solution.name;
    ans.forEach((id) => {
      let obj = getData(id);
      test.answer.push({ id: obj.id, name: obj.name });
    });

    return test;
  }

  document.querySelector("#newQuiz").addEventListener("click", (e) => {
    let display = document.querySelector(".quiz");
    let i = 0;
    newMapping = structuredClone(mapping);
    document.querySelector(".control").classList.remove("show");
    newTestBank = JSON.parse(JSON.stringify(testBank));
    quiz = [];
    answer = [];
    display.innerHTML = "";

    for (let i = 0; i < 13; i++) {
      let test = questionGenerator("rhizomes");
      quiz.push(test);
    }
    for (let i = 0; i < 3; i++) {
      let test = questionGenerator("wholeHerbs");
      quiz.push(test);
    }
    for (let i = 0; i < 4; i++) {
      let test = questionGenerator("fruitsAndSeeds");
      quiz.push(test);
    }
    for (let i = 0; i < 5; i++) {
      let test = questionGenerator("others");
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
