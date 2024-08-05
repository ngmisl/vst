const testArea = document.getElementById("testArea");
const target = document.getElementById("target");
const startBtn = document.getElementById("startBtn");
const resultDiv = document.getElementById("result");
const recommendationDiv = document.getElementById("recommendation");

let isSimpleTest = true;
let trialStart,
  trialTimes = [];
let currentTrial = 0;
const trialsPerTest = 10;
let isWaitingForSpacebar = false;

startBtn.addEventListener("click", startTest);

function startTest() {
  startBtn.style.display = "none";
  currentTrial = 0;
  trialTimes = [];
  if (isSimpleTest) {
    runSimpleTrial();
  } else {
    runComplexTrial();
  }
}

function runSimpleTrial() {
  if (currentTrial < trialsPerTest) {
    setTimeout(
      () => {
        showTarget();
        trialStart = Date.now();
        isWaitingForSpacebar = true;
      },
      Math.random() * 2000 + 1000,
    );
  } else {
    finishSimpleTest();
  }
}

function runComplexTrial() {
  if (currentTrial < trialsPerTest) {
    setTimeout(
      () => {
        showComplexTarget();
        trialStart = Date.now();
        isWaitingForSpacebar = true;
      },
      Math.random() * 2000 + 1000,
    );
  } else {
    finishComplexTest();
  }
}

function showTarget() {
  target.style.display = "block";
  target.style.left = `${Math.random() * (testArea.offsetWidth - 50)}px`;
  target.style.top = `${Math.random() * (testArea.offsetHeight - 50)}px`;
}

function showComplexTarget() {
  target.style.display = "block";
  target.style.borderBottom = "30px solid red";
  target.style.borderLeft = "15px solid transparent";
  target.style.borderRight = "15px solid transparent";
  target.style.left = `${Math.random() * (testArea.offsetWidth - 30)}px`;
  target.style.top = `${Math.random() * (testArea.offsetHeight - 30)}px`;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && isWaitingForSpacebar) {
    event.preventDefault();
    endTrial();
  }
});

function endTrial() {
  if (!isWaitingForSpacebar) return;

  isWaitingForSpacebar = false;
  const trialTime = Date.now() - trialStart;
  trialTimes.push(trialTime);
  target.style.display = "none";
  currentTrial++;
  if (isSimpleTest) {
    runSimpleTrial();
  } else {
    runComplexTrial();
  }
}

function finishSimpleTest() {
  isSimpleTest = false;
  const simpleScore = Math.log(calculateAverageTime());
  resultDiv.innerHTML = `<p>Simple VST Score: ${simpleScore.toFixed(2)}</p>`;
  startBtn.textContent = "Start Complex Test";
  startBtn.style.display = "block";
  target.style.borderBottom = "50px solid #000";
  target.style.borderLeft = "25px solid transparent";
  target.style.borderRight = "25px solid transparent";
}

function finishComplexTest() {
  const complexScore = Math.log(calculateAverageTime());
  resultDiv.innerHTML += `<p>Complex VST Score: ${complexScore.toFixed(2)}</p>`;
  showRecommendation(
    parseFloat(resultDiv.children[0].textContent.split(": ")[1]),
    complexScore,
  );
  startBtn.style.display = "none";
}

function calculateAverageTime() {
  return trialTimes.reduce((a, b) => a + b, 0) / trialTimes.length / 1000;
}

function showRecommendation(simpleScore, complexScore) {
  let recommendation = "<h2>Recommendation:</h2>";
  if (simpleScore > 6.48 || complexScore > 7.72) {
    recommendation += `
            <p>Your VST scores indicate a potential increased risk of future dementia. We recommend:</p>
            <ul>
                <li>Consult with a healthcare professional for a comprehensive cognitive assessment.</li>
                <li>Consider lifestyle modifications:
                    <ul>
                        <li>Increase physical activity levels</li>
                        <li>Improve overall health status</li>
                        <li>Manage chronic conditions like diabetes</li>
                        <li>Address any visual problems</li>
                    </ul>
                </li>
                <li>Engage in cognitive stimulation activities.</li>
                <li>Consider combining the VST with other neuropsychological tests for a more comprehensive risk assessment.</li>
                <li>Schedule regular follow-ups and monitoring of cognitive function.</li>
            </ul>
        `;
  } else {
    recommendation += `
            <p>Your VST scores do not indicate an increased risk of future dementia. However, it's always beneficial to maintain a healthy lifestyle and engage in regular cognitive activities.</p>
        `;
  }
  recommendationDiv.innerHTML = recommendation;
}
