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
        trialStart = performance.now();
        isWaitingForSpacebar = true;
      },
      Math.random() * 2000 + 1000,
    ); // Random delay between 1-3 seconds
  } else {
    finishSimpleTest();
  }
}

function runComplexTrial() {
  if (currentTrial < trialsPerTest) {
    setTimeout(
      () => {
        showComplexTarget();
        trialStart = performance.now();
        isWaitingForSpacebar = true;
      },
      Math.random() * 2000 + 1000,
    ); // Random delay between 1-3 seconds
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
  showTarget();
  target.style.borderBottom = "30px solid red";
  target.style.borderLeft = "15px solid transparent";
  target.style.borderRight = "15px solid transparent";
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
  const trialTime = performance.now() - trialStart;
  trialTimes.push(trialTime);
  target.style.display = "none";
  currentTrial++;
  if (isSimpleTest) {
    runSimpleTrial();
  } else {
    runComplexTrial();
  }
}

function calculateAverageTime() {
  const averageMs = trialTimes.reduce((a, b) => a + b, 0) / trialTimes.length;
  console.log(`Average time (ms): ${averageMs.toFixed(2)}`);
  return averageMs;
}

function calculateScore(averageMs) {
  return Math.log(averageMs);
}

function finishSimpleTest() {
  isSimpleTest = false;
  const averageTime = calculateAverageTime();
  const simpleScore = calculateScore(averageTime);
  console.log(`Simple VST Score: ${simpleScore.toFixed(2)}`);
  resultDiv.innerHTML = `<p>Simple VST Score: ${simpleScore.toFixed(2)}</p>`;
  startBtn.textContent = "Start Complex Test";
  startBtn.style.display = "block";
  target.style.borderBottom = "50px solid #000";
  target.style.borderLeft = "25px solid transparent";
  target.style.borderRight = "25px solid transparent";
}

function finishComplexTest() {
  const averageTime = calculateAverageTime();
  const complexScore = calculateScore(averageTime);
  console.log(`Complex VST Score: ${complexScore.toFixed(2)}`);
  resultDiv.innerHTML += `<p>Complex VST Score: ${complexScore.toFixed(2)}</p>`;
  const simpleScore = parseFloat(
    resultDiv.children[0].textContent.split(": ")[1],
  );
  showRecommendation(simpleScore, complexScore);
  startBtn.style.display = "none";
}

function showRecommendation(simpleScore, complexScore) {
  let recommendation = "<h2>Recommendation:</h2>";

  // Mean and SD from the study
  const simpleVSTMean = 6.48;
  const simpleVSTSD = 0.27;
  const complexVSTMean = 7.72;
  const complexVSTSD = 0.46;

  // Calculate z-scores
  const simpleZScore = (simpleScore - simpleVSTMean) / simpleVSTSD;
  const complexZScore = (complexScore - complexVSTMean) / complexVSTSD;

  // Define threshold for increased risk (e.g., 1 SD above mean)
  const riskThreshold = 1;

  if (simpleZScore > riskThreshold || complexZScore > riskThreshold) {
    recommendation += `
      <p>Your VST scores suggest slower visual processing speed compared to the study average, which may indicate an increased risk of cognitive decline. We recommend:</p>
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
      <p>Your VST scores are within the normal range based on the study average. However, it's always beneficial to maintain a healthy lifestyle and engage in regular cognitive activities.</p>
    `;
  }
  recommendationDiv.innerHTML = recommendation;
}
