const questions = [
    {
        question: "ကမ္ဘာ‌ပေါ်ရှိအကြီးဆုံးနိုင်ငံမှာ",
        answers: [
            {text: "တရုတ်", correct: false},
            {text: "အမေရိကန်", correct: false},
            {text: "ရုရှား", correct: true},
            {text: "ဗာတီကန်စီးတီး", correct: false},
        ]
    },
    {
        question: "ပထမကမ္ဘာ‌စစ်ကြီးပြီးဆုံးသည့်ခုနှစ်မှာ",
        answers: [
            {text: "၁၉၃၅", correct: false},
            {text: "၁၉၄၅", correct: false},
            {text: "၁၉၄၆", correct: false},
            {text: "၁၉၁၈", correct: true},
        ]
    },
    {
        question: "လပေါ်သို့ပထမဆုံးဆင်းသက်နိုင်ခဲ့သည့် အာကာသယာဥ်၏အမည်မှာ",
        answers: [
            {text: "Apollo 11", correct: true},
            {text: "Hercules 11", correct: false},
            {text: "Artemis 10", correct: false},
            {text: "Space X", correct: false},
        ]
    },
    {
        question: "Star-Warsရုပ်ရှင်တွင် မင်သားကြီး Harrison Ford သည်",
        answers: [
            {text: "Indiana Jonesအဖြစ်သရုပ်ဆောင်ခဲ့သည်", correct: false},
            {text: "Luke Skywalkerအဖြစ်သရုပ်ဆောင်ခဲ့သည်", correct: false},
            {text: "James Bondအဖြစ်သရုပ်ဆောင်ခဲ့သည်", correct: false},
            {text: "Han Soloအဖြစ်သရုပ်ဆောင်ခဲ့သည်", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "နောက်ထပ်";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `မေးခွန်း${questions.length}တွင် ${score}ခု မှန်ပါသည်!`;
    nextButton.innerHTML = `ထပ်မံကစားမည်`;
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();