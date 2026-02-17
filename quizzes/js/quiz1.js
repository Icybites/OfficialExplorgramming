// ===== QUIZ CONFIGURATION =====

// PASSWORD FOR THIS CHECKPOINT (change for each checkpoint)
const CHECKPOINT_PASSWORD = "ucop";

// QUIZ QUESTIONS (easily customizable)
const quizData = [
    // Question 1: Multiple Choice
    {
        type: "multiple-choice",
        question: "Bilakah Explorgramming mula dibina?",
        options: [
            "Tahun 1990",
            "Tahun 2025",
            "Semalam",
            "Tahun 2026"
        ],
        correctAnswer: 1
    },
    
    // Question 2: Fill in the Blank (Single)
    {
        type: "fill-blank",
        question: "Nama bagi pengasas Explorgramming ialah _______.",
        correctAnswer: "Yusuf",
        keywords: ["Yusuf", "yusuf"]
    },
    
    // Question 3: Multiple Fill in the Blank
    {
        type: "multiple-fill-blank",
        question: "Kucing biasanya tidur antara _____ hingga _____ jam sehari.",
        blanks: [
            {
                correctAnswer: "12",
                keywords: ["12", "dua belas", "twelve"]
            },
            {
                correctAnswer: "16",
                keywords: ["16", "enam belas", "sixteen"]
            }
        ]
    },
    
    // Question 4: Multi-Attempt Question (5 marks max)
    {
        type: "multi-attempt",
        question: "Kucing menggunakan _______ untuk keseimbangan dan _______ untuk menangkap bunyi",
        maxAttempts: 5,
        maxMarks: 5,
        fields: [
            {
                label: "Anggota Badan 1",
                placeholder: "Answer 1",
                keywords: ["ekor"] // All must be present
            },
            {
                label: "Anggota Badan 2",
                placeholder: "Answer 2",
                keywords: ["telinga"] // All must be present
            }
        ]
    },
    
    // Question 5: Short Answer
    {
        type: "short-answer",
        question: "Senaraikan DUA fungsi misai pada kucing.",
        keywords: ["ruang", "pergerakan", "getaran", "memburu", "mengukur"],
        minKeywords: 2
    },
    
    // Question 6: Multiple Choice
    {
        type: "multiple-choice",
        question: "Kucing mempunyai _______ kaki, _______ ekor, dan _______ pasang telinga.",
        options: [
            "2, 4, 1",
            "4, 2, 1",
            "4, 1, 2",
            "2, 1, 4"
        ],
        correctAnswer: 2
    },
    
    // Question 7: Another Multi-Attempt Example
    {
        type: "multi-attempt",
        question: "Anak kucing yang baru lahir biasanya _______ dan belum boleh _______ dengan kakinya",
        maxAttempts: 5,
        maxMarks: 5,
        fields: [
            {
                label: "Pancaindra",
                placeholder: "Answer 1",
                keywords: ["buta"]
            },
            {
                label: "Perbuatan",
                placeholder: "Answer 2",
                keywords: ["berjalan"]
            }
        ]
    },

    // Question 8: Multiple Choice
    {
        type: "multiple-choice",
        question: "Apakah deria yang paling kuat pada kucing?",
        options: [
            "Penglihatan",
            "Pendengaran",
            "Sentuhan",
            "Rasa"
        ],
        correctAnswer: 1
    },

    // Question 9: Fill in the Blank (Single)
    {
        type: "fill-blank",
        question: "Kucing tergolong dalam kumpulan haiwan _______.",
        correctAnswer: "Mamalia",
        keywords: ["mamalia", "Mamalia"]
    },

    // Question 10: Multiple Choice
    {
        type: "multiple-choice",
        question: "Apakah baka kucing kesukaan pengasas Explorgramming?",
        options: [
            "Ragdoll",
            "Maine Coon",
            "Bengal",
            "Siamese"
        ],
        correctAnswer: 3
    },
];

// ===== STATE MANAGEMENT =====
const state = {
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: null,
    timerInterval: null,
    score: 0,
    questionAttempts: {}, // Track attempts for multi-attempt questions
    questionMarks: {} // Track marks for each question
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initPasswordScreen();
});

// ===== PASSWORD SCREEN =====
function initPasswordScreen() {
    const unlockBtn = document.getElementById('unlockBtn');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    unlockBtn.addEventListener('click', checkPassword);

    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === CHECKPOINT_PASSWORD) {
            document.getElementById('passwordScreen').classList.add('hidden');
            document.getElementById('quizScreen').classList.add('active');
            initQuiz();
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';
            passwordInput.focus();
            
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
        }
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===== QUIZ INITIALIZATION =====
function initQuiz() {
    state.userAnswers = new Array(quizData.length).fill(null);
    
    // Initialize attempts and marks for multi-attempt questions
    quizData.forEach((q, index) => {
        if (q.type === 'multi-attempt') {
            state.questionAttempts[index] = 0;
            state.questionMarks[index] = q.maxMarks;
        } else {
            state.questionMarks[index] = 1; // Standard questions worth 1 mark
        }
    });
    
    document.getElementById('totalQuestions').textContent = quizData.length;
    renderQuestions();
    showQuestion(0);
    startTimer();
    initNavigation();
}

// ===== RENDER QUESTIONS =====
function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';
    
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;
        
        let marksText = q.type === 'multi-attempt' ? `(${q.maxMarks} marks)` : '(1 mark)';
        let questionHTML = `<div class="question-text">${index + 1}. ${q.question} ${marksText}</div>`;
        
        if (q.image) {
            questionHTML += `
                <div class="question-image">
                    <img src="${q.image}" alt="Question image">
                </div>
            `;
        }
        
        // Render based on question type
        if (q.type === 'multiple-choice') {
            questionHTML += '<div class="options">';
            q.options.forEach((option, optIndex) => {
                questionHTML += `
                    <div class="option" data-question="${index}" data-option="${optIndex}">
                        <div class="option-label">${String.fromCharCode(65 + optIndex)}</div>
                        <div class="option-text">${option}</div>
                    </div>
                `;
            });
            questionHTML += '</div>';
            
        } else if (q.type === 'fill-blank') {
            questionHTML += `
                <input 
                    type="text" 
                    class="text-input" 
                    data-question="${index}"
                    placeholder="Type your answer here..."
                    autocomplete="off"
                >
            `;
            
        } else if (q.type === 'multiple-fill-blank') {
            questionHTML += '<div class="multiple-blanks">';
            q.blanks.forEach((blank, blankIndex) => {
                questionHTML += `
                    <div class="blank-item">
                        <label class="blank-label">Blank ${blankIndex + 1}:</label>
                        <input 
                            type="text" 
                            class="text-input blank-input" 
                            data-question="${index}"
                            data-blank="${blankIndex}"
                            placeholder="Fill in blank ${blankIndex + 1}..."
                            autocomplete="off"
                        >
                    </div>
                `;
            });
            questionHTML += '</div>';
            
        } else if (q.type === 'multi-attempt') {
            questionHTML += `
                <div class="multi-attempt-container">
                    <div class="attempt-info">
                        <span class="attempts-remaining">
                            <i class="fas fa-redo"></i>
                            Attempts: <strong><span id="attempts-${index}">0</span>/${q.maxAttempts}</strong>
                        </span>
                        <span class="current-marks">
                            <i class="fas fa-star"></i>
                            Current Marks: <strong><span id="marks-${index}">${q.maxMarks}</span>/${q.maxMarks}</strong>
                        </span>
                    </div>
                    <div class="multi-attempt-fields">
            `;
            
            q.fields.forEach((field, fieldIndex) => {
                questionHTML += `
                    <div class="attempt-field">
                        <label class="field-label">${field.label}:</label>
                        <input 
                            type="text" 
                            class="text-input attempt-input" 
                            data-question="${index}"
                            data-field="${fieldIndex}"
                            placeholder="${field.placeholder || 'Type your answer...'}"
                            autocomplete="off"
                        >
                    </div>
                `;
            });
            
            questionHTML += `
                    </div>
                    <button class="btn btn-check" data-question="${index}">
                        <i class="fas fa-check"></i>
                        Check Answer
                    </button>
                    <div class="attempt-feedback" id="feedback-${index}"></div>
                </div>
            `;
            
        } else if (q.type === 'short-answer') {
            questionHTML += `
                <textarea 
                    class="short-answer" 
                    data-question="${index}"
                    placeholder="Type your answer here..."
                    rows="5"
                ></textarea>
            `;
        }
        
        questionDiv.innerHTML = questionHTML;
        container.appendChild(questionDiv);
    });
    
    addAnswerListeners();
}

// ===== ADD ANSWER LISTENERS =====
function addAnswerListeners() {
    // Multiple choice
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const questionIndex = parseInt(this.dataset.question);
            const optionIndex = parseInt(this.dataset.option);
            
            document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            this.classList.add('selected');
            state.userAnswers[questionIndex] = optionIndex;
        });
    });
    
    // Single text inputs
    document.querySelectorAll('.text-input:not(.blank-input):not(.attempt-input)').forEach(input => {
        input.addEventListener('input', function() {
            const questionIndex = parseInt(this.dataset.question);
            state.userAnswers[questionIndex] = this.value.trim();
        });
    });
    
    // Multiple fill-blank inputs
    document.querySelectorAll('.blank-input').forEach(input => {
        input.addEventListener('input', function() {
            const questionIndex = parseInt(this.dataset.question);
            const blankIndex = parseInt(this.dataset.blank);
            
            if (!state.userAnswers[questionIndex]) {
                state.userAnswers[questionIndex] = [];
            }
            state.userAnswers[questionIndex][blankIndex] = this.value.trim();
        });
    });
    
    // Multi-attempt check buttons
    document.querySelectorAll('.btn-check').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionIndex = parseInt(this.dataset.question);
            checkMultiAttemptAnswer(questionIndex);
        });
    });
    
    // Short answer
    document.querySelectorAll('.short-answer').forEach(input => {
        input.addEventListener('input', function() {
            const questionIndex = parseInt(this.dataset.question);
            state.userAnswers[questionIndex] = this.value.trim();
        });
    });
}

// ===== CHECK MULTI-ATTEMPT ANSWER =====
function checkMultiAttemptAnswer(questionIndex) {
    const question = quizData[questionIndex];
    const inputs = document.querySelectorAll(`.attempt-input[data-question="${questionIndex}"]`);
    const feedback = document.getElementById(`feedback-${questionIndex}`);
    const attemptsDisplay = document.getElementById(`attempts-${questionIndex}`);
    const marksDisplay = document.getElementById(`marks-${questionIndex}`);
    
    // Increment attempts
    state.questionAttempts[questionIndex]++;
    attemptsDisplay.textContent = state.questionAttempts[questionIndex];
    
    // Collect answers
    const userAnswers = [];
    inputs.forEach(input => {
        userAnswers.push(input.value.trim());
    });
    
    // Check if all fields are answered
    let allCorrect = true;
    const results = [];
    
    question.fields.forEach((field, fieldIndex) => {
        const userAnswer = userAnswers[fieldIndex].toLowerCase();
        const isCorrect = field.keywords.every(keyword => 
            userAnswer.includes(keyword.toLowerCase())
        );
        
        results.push(isCorrect);
        if (!isCorrect) allCorrect = false;
    });
    
    // Update marks (deduct 1 for each wrong attempt)
    if (!allCorrect) {
        state.questionMarks[questionIndex] = Math.max(0, question.maxMarks - state.questionAttempts[questionIndex]);
        marksDisplay.textContent = state.questionMarks[questionIndex];
    }
    
    // Show feedback
    if (allCorrect) {
        feedback.innerHTML = `
            <div class="feedback-success">
                <i class="fas fa-check-circle"></i>
                Correct! You earned ${state.questionMarks[questionIndex]} mark(s).
            </div>
        `;
        feedback.style.display = 'block';
        
        // Save answer
        state.userAnswers[questionIndex] = {
            answers: userAnswers,
            correct: true,
            attempts: state.questionAttempts[questionIndex],
            marks: state.questionMarks[questionIndex]
        };
        
        // Disable inputs and button
        inputs.forEach(input => input.disabled = true);
        document.querySelector(`.btn-check[data-question="${questionIndex}"]`).disabled = true;
        
    } else if (state.questionAttempts[questionIndex] >= question.maxAttempts) {
        // Out of attempts - show correct answers
        const correctAnswersHTML = question.fields.map((field, idx) => 
            `<div><strong>${field.label}:</strong> ${field.keywords[0]}</div>`
        ).join('');
        
        feedback.innerHTML = `
            <div class="feedback-error">
                <i class="fas fa-times-circle"></i>
                <div>
                    <div style="margin-bottom: 0.5rem;">Out of attempts. You earned 0 marks.</div>
                    <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(153, 27, 27, 0.2);">
                        <strong>Correct Answers:</strong>
                        <div style="margin-top: 0.5rem; font-size: 0.9375rem;">
                            ${correctAnswersHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        feedback.style.display = 'block';
        state.questionMarks[questionIndex] = 0;
        marksDisplay.textContent = 0;
        
        // Save answer
        state.userAnswers[questionIndex] = {
            answers: userAnswers,
            correct: false,
            attempts: state.questionAttempts[questionIndex],
            marks: 0
        };
        
        // Disable inputs and button
        inputs.forEach(input => input.disabled = true);
        document.querySelector(`.btn-check[data-question="${questionIndex}"]`).disabled = true;
        
    } else {
        // Incorrect but has attempts left
        const remainingAttempts = question.maxAttempts - state.questionAttempts[questionIndex];
        feedback.innerHTML = `
            <div class="feedback-warning">
                <i class="fas fa-exclamation-circle"></i>
                Incorrect. ${remainingAttempts} attempt(s) remaining. Current marks: ${state.questionMarks[questionIndex]}
            </div>
        `;
        feedback.style.display = 'block';
        
        // Clear wrong answers
        inputs.forEach((input, idx) => {
            if (!results[idx]) {
                input.value = '';
                input.style.borderColor = '#ef4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 1000);
            }
        });
    }
}

// ===== SHOW QUESTION =====
function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');
    
    state.currentQuestionIndex = index;
    document.getElementById('currentQuestion').textContent = index + 1;
    
    const progress = ((index + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    updateNavigationButtons();
    restoreSavedAnswer(index);
}

// ===== RESTORE SAVED ANSWER =====
function restoreSavedAnswer(index) {
    const savedAnswer = state.userAnswers[index];
    const question = quizData[index];
    
    if (savedAnswer !== null && savedAnswer !== undefined) {
        if (question.type === 'multiple-choice') {
            const option = document.querySelector(`.option[data-question="${index}"][data-option="${savedAnswer}"]`);
            if (option) option.classList.add('selected');
            
        } else if (question.type === 'fill-blank') {
            const input = document.querySelector(`.text-input[data-question="${index}"]`);
            if (input) input.value = savedAnswer;
            
        } else if (question.type === 'multiple-fill-blank') {
            if (Array.isArray(savedAnswer)) {
                savedAnswer.forEach((answer, blankIndex) => {
                    const input = document.querySelector(`.blank-input[data-question="${index}"][data-blank="${blankIndex}"]`);
                    if (input && answer) input.value = answer;
                });
            }
            
        } else if (question.type === 'short-answer') {
            const input = document.querySelector(`.short-answer[data-question="${index}"]`);
            if (input) input.value = savedAnswer;
        }
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.addEventListener('click', () => {
        if (state.currentQuestionIndex > 0) {
            showQuestion(state.currentQuestionIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (state.currentQuestionIndex < quizData.length - 1) {
            showQuestion(state.currentQuestionIndex + 1);
        }
    });
    
    submitBtn.addEventListener('click', submitQuiz);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = state.currentQuestionIndex === 0;
    
    if (state.currentQuestionIndex === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// ===== TIMER =====
function startTimer() {
    state.startTime = Date.now();
    
    state.timerInterval = setInterval(() => {
        const elapsed = Date.now() - state.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        document.getElementById('timerDisplay').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
    }
}

// ===== SUBMIT QUIZ =====
function submitQuiz() {
    stopTimer();
    calculateScore();
    
    const elapsed = Date.now() - state.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('quizScreen').classList.remove('active');
    
    const resultsScreen = document.getElementById('resultsScreen');
    resultsScreen.classList.add('active');
    
    // Calculate total possible marks
    const totalMarks = Object.values(state.questionMarks).reduce((a, b) => a + b, 0);
    
    document.getElementById('scoreNumber').textContent = state.score;
    document.getElementById('scoreTotalDisplay').textContent = totalMarks;
    document.getElementById('timeTaken').textContent = timeString;
    
    const percentage = totalMarks > 0 ? Math.round((state.score / totalMarks) * 100) : 0;
    document.getElementById('percentageScore').textContent = `${percentage}%`;
}

// ===== CALCULATE SCORE =====
function calculateScore() {
    state.score = 0;
    
    quizData.forEach((question, index) => {
        const userAnswer = state.userAnswers[index];
        
        if (question.type === 'multiple-choice') {
            if (userAnswer === question.correctAnswer) {
                state.score += 1;
            }
            
        } else if (question.type === 'fill-blank') {
            if (userAnswer) {
                const normalizedAnswer = userAnswer.toLowerCase().trim();
                const keywords = question.keywords || [question.correctAnswer];
                
                if (keywords.some(keyword => normalizedAnswer === keyword.toLowerCase())) {
                    state.score += 1;
                }
            }
            
        } else if (question.type === 'multiple-fill-blank') {
            if (Array.isArray(userAnswer)) {
                let allCorrect = true;
                
                question.blanks.forEach((blank, blankIndex) => {
                    const answer = userAnswer[blankIndex];
                    if (!answer) {
                        allCorrect = false;
                        return;
                    }
                    
                    const normalizedAnswer = answer.toLowerCase().trim();
                    const keywords = blank.keywords || [blank.correctAnswer];
                    
                    if (!keywords.some(keyword => normalizedAnswer === keyword.toLowerCase())) {
                        allCorrect = false;
                    }
                });
                
                if (allCorrect) {
                    state.score += 1;
                }
            }
            
        } else if (question.type === 'multi-attempt') {
            if (userAnswer && userAnswer.correct) {
                state.score += userAnswer.marks;
            }
            
        } else if (question.type === 'short-answer') {
            if (userAnswer) {
                const normalizedAnswer = userAnswer.toLowerCase();
                const foundKeywords = question.keywords.filter(keyword => 
                    normalizedAnswer.includes(keyword.toLowerCase())
                );
                
                if (foundKeywords.length >= question.minKeywords) {
                    state.score += 1;
                }
            }
        }
    });
}