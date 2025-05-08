const quizData = [
    {
      question: "What is the square of 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "How many types of CSS are there?",
      options: ["5", "8", "3", "9"],
      correct: 2
    },
    {
      question: "Who is the CEO of Google?",
      options: ["Mukesh Ambani", "Sundar Pichai", "Thierry Delaporte", "N. Chandrasekaran"],
      correct: 1
    },
    {
      question: "Who invented the telephone?",
      options: ["Alexander Graham Bell", "Charles Babbage", "Newton", "J.J. Thompson"],
      correct: 0
    },
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Kolkata", "Delhi", "Chennai"],
      correct: 2
    },
    {
      question: "Which organ is responsible for pumping blood?",
      options: ["Brain", "Heart", "Lungs", "Liver"],
      correct: 1
    },
    
    {
      question:"Which of the following is the largest coen on Earth?",
      options:[" Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"],
       correct:4
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  const landing = document.getElementById('landing');
  const quizSection = document.getElementById('quizSection');
  const resultSection = document.getElementById('resultSection');
  const startBtn = document.getElementById('startBtn');
  const submitBtn = document.getElementById('submitBtn');
  const retryBtn = document.getElementById('retryBtn');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('options');
  const timerDisplay = document.getElementById('timer');
  const currentQuestionDisplay = document.getElementById('currentQuestion');
  const totalQuestionsDisplay = document.getElementById('totalQuestions');
  const progressBar = document.getElementById('progressBar');
  const scoreDisplay = document.getElementById('score');
  
  totalQuestionsDisplay.textContent = quizData.length;
  
  startBtn.addEventListener('click', () => {
    landing.classList.add('d-none');
    quizSection.classList.remove('d-none');
    loadQuestion();
    startTimer();
  });
  
  submitBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      const answer = parseInt(selectedOption.value);
      if (answer === quizData[currentQuestionIndex].correct) {
        score++;
      }
      nextQuestion();
    } else {
      alert("Please select an answer.");
    }
  });
  
  retryBtn.addEventListener('click', () => {
    location.reload();
  });
  
  function loadQuestion() {
    const currentData = quizData[currentQuestionIndex];
    questionText.textContent = currentData.question;
    optionsContainer.innerHTML = "";
    currentData.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('form-check');
      optionElement.innerHTML = `
        <input class="form-check-input" type="radio" name="option" id="option${index}" value="${index}">
        <label class="form-check-label option-label" for="option${index}">${option}</label>
      `;
      optionsContainer.appendChild(optionElement);
    });
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;
  }
  
  function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
      startTimer();
    } else {
      showResult();
    }
  }
  
  function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }
  
  function showResult() {
    quizSection.classList.add('d-none');
    resultSection.classList.remove('d-none');
    scoreDisplay.textContent = `${score} / ${quizData.length}`;
  }
  
