// ===== CHAPTER 1: INTRODUCTION TO C — EXERCISES =====
// To customize: replace the exerciseData array below with your own questions.
// Supported types: "multiple-choice", "fill-blank", "short-answer"

const exerciseData = [

    // Q1 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is a programming language?",
        options: [
            "A tool used to design computer hardware",
            "A language used to express a process by which a computer can solve a problem",
            "A system used to connect computers to the internet",
            "A language used only by operating systems"
        ],
        correctAnswer: 1,
        explanation: "A programming language is a language used by a person to express a process by which a computer can solve a problem. It provides rules and syntax for communicating instructions to a computer."
    },

    // Q2 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which type of programming language uses binary (0s and 1s) and is directly understood by the CPU?",
        options: [
            "High-level language",
            "Assembly language",
            "Machine language",
            "Scripting language"
        ],
        correctAnswer: 2,
        explanation: "Machine language uses binary code (0s and 1s) and is the only language directly understood by the CPU. It is the lowest-level programming language."
    },

    // Q3 — Fill in the Blank
    {
        type: "fill-blank",
        question: "A _______ translates the entire source code into machine code at once before execution.",
        correctAnswer: "compiler",
        keywords: ["compiler"],
        explanation: "A compiler translates the entire source code into machine code before the program runs. This makes execution faster since translation happens beforehand. C uses a compiler."
    },

    // Q4 — Multiple Choice
    {
        type: "multiple-choice",
        question: "Which translator is used specifically for assembly language programs?",
        options: [
            "Compiler",
            "Interpreter",
            "Linker",
            "Assembler"
        ],
        correctAnswer: 3,
        explanation: "An assembler translates assembly language code into machine code. It is specifically designed for programs written in assembly language."
    },

    // Q5 — Multiple Choice
    {
        type: "multiple-choice",
        question: "What is the correct order of the C program development environment?",
        options: [
            "Editor → Compiler → Preprocessor → Linker → Loader → CPU",
            "Editor → Preprocessor → Compiler → Linker → Loader → CPU",
            "Preprocessor → Editor → Linker → Compiler → Loader → CPU",
            "Editor → Linker → Compiler → Preprocessor → Loader → CPU"
        ],
        correctAnswer: 1,
        explanation: "The correct order is: Editor → Preprocessor → Compiler → Linker → Loader → CPU. The preprocessor handles directives first, then the compiler translates to object code, the linker combines everything, the loader puts it in memory, and finally the CPU executes it."
    },

    // Q6 — Fill in the Blank
    {
        type: "fill-blank",
        question: "A _______ error causes the program to terminate immediately during execution.",
        correctAnswer: "fatal",
        keywords: ["fatal"],
        explanation: "A fatal error causes the program to crash and stop immediately. Examples include division by zero or accessing invalid memory. In contrast, nonfatal errors allow the program to continue but produce wrong results."
    },

    // Q7 — Multiple Choice
    {
        type: "multiple-choice",
        question: "In a C program, what is the purpose of #include <stdio.h>?",
        options: [
            "It marks the start of the main function",
            "It declares variables for input and output",
            "It includes the Standard Input/Output library needed for printf() and scanf()",
            "It tells the compiler to skip this line"
        ],
        correctAnswer: 2,
        explanation: "#include <stdio.h> includes the Standard Input/Output library. This is required to use functions like printf() (for output) and scanf() (for input) in your C program."
    },

    // Q8 — Short Answer
    {
        type: "short-answer",
        question: "List three stages of the Program Development Life Cycle (PDLC).",
        keywords: ["analysis", "design", "implementation", "coding", "testing", "debugging", "maintenance"],
        minKeywords: 3,
        explanation: "The 5 stages of the PDLC are: (1) Analysis — understand the problem, (2) Design — plan the solution, (3) Implementation/Coding — write the program, (4) Testing/Debugging — find and fix errors, (5) Maintenance — update and improve over time."
    },

    // Q9 — Multiple Choice
    {
        type: "multiple-choice",
        question: "A program compiles successfully and runs without crashing, but produces the wrong output. What type of error is this?",
        options: [
            "Syntax error",
            "Runtime error",
            "Logical error",
            "Fatal error"
        ],
        correctAnswer: 2,
        explanation: "A logical error produces wrong results without crashing. The program compiles and runs fine, but the logic is incorrect. For example, writing 'a + b / 2' instead of '(a + b) / 2' would give a wrong average."
    },

    // Q10 — Fill in the Blank
    {
        type: "fill-blank",
        question: "Every C program must have a _______ function — this is where execution always begins.",
        correctAnswer: "main",
        keywords: ["main", "main()", "int main"],
        explanation: "Every C program must have a main() function. The operating system calls main() to start the program, and execution always begins at the first line inside main()."
    }

];

// =================================================
// ===== STATE — do not modify below this line =====
// =================================================

const state = {
    currentQuestionIndex: 0,
    userAnswers: [],
    questionChecked: [],
    score: 0
};

document.addEventListener('DOMContentLoaded', () => {
    initNotesScreen();
});

function initNotesScreen() {
    const startBtn = document.getElementById('startExerciseBtn');
    startBtn.addEventListener('click', () => {
        document.getElementById('notesScreen').classList.add('hidden');
        document.getElementById('exerciseScreen').classList.add('active');
        initExercise();
    });
}

function initExercise() {
    state.userAnswers = new Array(exerciseData.length).fill(null);
    state.questionChecked = new Array(exerciseData.length).fill(false);
    state.score = 0;

    document.getElementById('totalQuestions').textContent = exerciseData.length;
    renderQuestions();
    showQuestion(0);
    initNavigation();
}

function renderQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    exerciseData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question-${index}`;

        let questionHTML = `<div class="question-text">${index + 1}. ${q.question}</div>`;

        if (q.image) {
            questionHTML += `
                <div class="question-image">
                    <img src="${q.image}" alt="Question image">
                </div>`;
        }

        if (q.type === 'multiple-choice') {
            questionHTML += '<div class="options">';
            q.options.forEach((option, optIndex) => {
                questionHTML += `
                    <div class="option" data-question="${index}" data-option="${optIndex}">
                        <div class="option-label">${String.fromCharCode(65 + optIndex)}</div>
                        <div class="option-text">${option}</div>
                    </div>`;
            });
            questionHTML += '</div>';
            questionHTML += `
                <button class="check-answer-btn" data-question="${index}">
                    <i class="fas fa-check"></i> Check Answer
                </button>`;

        } else if (q.type === 'fill-blank') {
            questionHTML += `
                <input type="text" class="text-input" data-question="${index}"
                    placeholder="Type your answer here..." autocomplete="off">
                <button class="check-answer-btn" data-question="${index}">
                    <i class="fas fa-check"></i> Check Answer
                </button>`;

        } else if (q.type === 'short-answer') {
            questionHTML += `
                <textarea class="short-answer" data-question="${index}"
                    placeholder="Type your answer here..." rows="5"></textarea>
                <button class="check-answer-btn" data-question="${index}">
                    <i class="fas fa-check"></i> Check Answer
                </button>`;
        }

        questionHTML += `<div class="feedback-box" id="feedback-${index}"></div>`;
        questionDiv.innerHTML = questionHTML;
        container.appendChild(questionDiv);
    });

    addAnswerListeners();
}

function addAnswerListeners() {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const questionIndex = parseInt(this.dataset.question);
            if (state.questionChecked[questionIndex]) return;

            document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            state.userAnswers[questionIndex] = parseInt(this.dataset.option);
        });
    });

    document.querySelectorAll('.text-input').forEach(input => {
        input.addEventListener('input', function () {
            state.userAnswers[parseInt(this.dataset.question)] = this.value.trim();
        });
    });

    document.querySelectorAll('.short-answer').forEach(input => {
        input.addEventListener('input', function () {
            state.userAnswers[parseInt(this.dataset.question)] = this.value.trim();
        });
    });

    document.querySelectorAll('.check-answer-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            checkAnswer(parseInt(this.dataset.question));
        });
    });
}

function checkAnswer(questionIndex) {
    const question = exerciseData[questionIndex];
    const userAnswer = state.userAnswers[questionIndex];
    const feedback = document.getElementById(`feedback-${questionIndex}`);
    const checkBtn = document.querySelector(`.check-answer-btn[data-question="${questionIndex}"]`);

    if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
        feedback.className = 'feedback-box incorrect show';
        feedback.innerHTML = `
            <div class="feedback-header">
                <i class="fas fa-exclamation-circle"></i>
                Please provide an answer first.
            </div>`;
        return;
    }

    let isCorrect = false;
    let feedbackHTML = '';

    if (question.type === 'multiple-choice') {
        isCorrect = userAnswer === question.correctAnswer;

        document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach((opt, idx) => {
            opt.classList.add('disabled');
            if (idx === question.correctAnswer) opt.classList.add('correct');
            if (idx === userAnswer && !isCorrect) opt.classList.add('incorrect');
        });

        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-check-circle"></i> Correct!</div>
                <div class="feedback-explanation">${question.explanation}</div>`;
            feedback.className = 'feedback-box correct show';
        } else {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-times-circle"></i> Incorrect</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Correct Answer:</strong> ${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}
                </div>`;
            feedback.className = 'feedback-box incorrect show';
        }

    } else if (question.type === 'fill-blank') {
        const normalizedAnswer = userAnswer.toLowerCase().trim();
        const keywords = question.keywords || [question.correctAnswer];
        isCorrect = keywords.some(kw => normalizedAnswer === kw.toLowerCase().trim());

        const input = document.querySelector(`.text-input[data-question="${questionIndex}"]`);
        input.disabled = true;
        input.style.borderColor = isCorrect ? '#10b981' : '#ef4444';

        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-check-circle"></i> Correct!</div>
                <div class="feedback-explanation">${question.explanation}</div>`;
            feedback.className = 'feedback-box correct show';
        } else {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-times-circle"></i> Incorrect</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Correct Answer:</strong> ${question.correctAnswer}
                </div>`;
            feedback.className = 'feedback-box incorrect show';
        }

    } else if (question.type === 'short-answer') {
        const normalizedAnswer = userAnswer.toLowerCase();
        const foundKeywords = question.keywords.filter(kw =>
            normalizedAnswer.includes(kw.toLowerCase())
        );
        isCorrect = foundKeywords.length >= question.minKeywords;

        const textarea = document.querySelector(`.short-answer[data-question="${questionIndex}"]`);
        textarea.disabled = true;
        textarea.style.borderColor = isCorrect ? '#10b981' : '#ef4444';

        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-check-circle"></i> Correct!</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Keywords Found:</strong> ${foundKeywords.join(', ')}
                </div>`;
            feedback.className = 'feedback-box correct show';
        } else {
            feedbackHTML = `
                <div class="feedback-header"><i class="fas fa-times-circle"></i> Incorrect or Incomplete</div>
                <div class="feedback-explanation">${question.explanation}</div>
                <div class="feedback-correct-answer">
                    <strong>Expected:</strong> Any ${question.minKeywords} of: ${question.keywords.join(', ')}
                </div>`;
            feedback.className = 'feedback-box incorrect show';
        }
    }

    feedback.innerHTML = feedbackHTML;
    state.questionChecked[questionIndex] = true;
    checkBtn.disabled = true;
    if (isCorrect) state.score++;
}

function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');

    state.currentQuestionIndex = index;
    document.getElementById('currentQuestion').textContent = index + 1;

    const progress = ((index + 1) / exerciseData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    updateNavigationButtons();
}

function initNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex > 0) showQuestion(state.currentQuestionIndex - 1);
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (state.currentQuestionIndex < exerciseData.length - 1) showQuestion(state.currentQuestionIndex + 1);
    });
    document.getElementById('submitBtn').addEventListener('click', submitExercise);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.disabled = state.currentQuestionIndex === 0;

    if (state.currentQuestionIndex === exerciseData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function submitExercise() {
    document.getElementById('exerciseScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');

    document.getElementById('scoreNumber').textContent = state.score;
    document.getElementById('scoreTotalDisplay').textContent = exerciseData.length;

    const percentage = Math.round((state.score / exerciseData.length) * 100);
    document.getElementById('percentageScore').textContent = `${percentage}%`;

    const statusText = document.getElementById('statusText');
    if (percentage === 100) {
        statusText.textContent = 'Perfect!';
        statusText.style.color = '#10b981';
    } else if (percentage >= 70) {
        statusText.textContent = 'Great Job!';
        statusText.style.color = '#10b981';
    } else if (percentage >= 50) {
        statusText.textContent = 'Keep Practicing!';
        statusText.style.color = '#f59e0b';
    } else {
        statusText.textContent = 'Review Notes';
        statusText.style.color = '#ef4444';
    }
}