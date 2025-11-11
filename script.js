// State Management
const state = {
    userName: localStorage.getItem('userName') || '',
    completedTopics: JSON.parse(localStorage.getItem('completedTopics') || '[]'),
    practiceStats: JSON.parse(localStorage.getItem('practiceStats') || '{"answered": 0, "correct": 0, "bySubject": {"math": {"answered": 0, "correct": 0}, "reading": {"answered": 0, "correct": 0}, "writing": {"answered": 0, "correct": 0}}}'),
    currentQuiz: null,
    schedule: JSON.parse(localStorage.getItem('schedule') || 'null')
};

// Fun Facts
const funFacts = [
    "The SAT was originally called the Scholastic Aptitude Test, but now it's just SAT (it doesn't stand for anything anymore!).",
    "The average SAT score is around 1050 out of 1600. You've got this!",
    "Over 2 million students take the SAT each year. You're not alone in this journey!",
    "The SAT has no penalty for wrong answers, so always guess if you don't know!",
    "Studies show that students who get 8+ hours of sleep before the test perform significantly better.",
    "The longest SAT testing time is about 3 hours (without the essay). Marathon training, anyone?",
    "Fun fact: Wearing comfortable clothes can actually improve your test performance by reducing stress!",
    "The SAT was first administered in 1926 with only 8,040 test takers. Now millions take it annually!",
    "Research shows that chewing gum while studying and during the test can improve memory recall.",
    "Students who use practice tests and review their mistakes improve their scores by an average of 150 points!"
];

// Practice Questions Database
const questionBank = {
    math: [
        {
            question: "If 3x + 5 = 20, what is the value of x?",
            options: ["3", "5", "7", "15"],
            correct: 1,
            explanation: "Subtract 5 from both sides: 3x = 15, then divide by 3: x = 5. Remember to isolate the variable!"
        },
        {
            question: "A rectangle has a length of 12 inches and a width of 8 inches. What is its area?",
            options: ["20 square inches", "40 square inches", "96 square inches", "192 square inches"],
            correct: 2,
            explanation: "Area of rectangle = length × width = 12 × 8 = 96 square inches. Don't forget the units!"
        },
        {
            question: "If a shirt costs $40 and is on sale for 25% off, what is the sale price?",
            options: ["$10", "$20", "$25", "$30"],
            correct: 3,
            explanation: "25% of $40 = $10 discount. Sale price = $40 - $10 = $30. Quick tip: 25% is the same as 1/4!"
        },
        {
            question: "What is the value of 2³ + 3²?",
            options: ["13", "17", "35", "64"],
            correct: 1,
            explanation: "2³ = 8 and 3² = 9, so 8 + 9 = 17. Remember to evaluate exponents before adding!"
        },
        {
            question: "If the average of three numbers is 15, what is their sum?",
            options: ["5", "15", "30", "45"],
            correct: 3,
            explanation: "Average × count = sum. So 15 × 3 = 45. This is a key relationship to remember!"
        }
    ],
    reading: [
        {
            question: "When an author uses words like 'however,' 'but,' or 'although,' they are most likely:",
            options: [
                "Showing agreement",
                "Introducing a contrast or opposing idea",
                "Summarizing their main point",
                "Defining a term"
            ],
            correct: 1,
            explanation: "Transition words like 'however' signal contrast. These are crucial for understanding argument structure!"
        },
        {
            question: "The main idea of a passage is best described as:",
            options: [
                "A minor detail mentioned once",
                "The author's opinion on a controversial topic",
                "The central point the author wants to convey",
                "The most interesting fact in the passage"
            ],
            correct: 2,
            explanation: "The main idea is the central, overarching point. Details support it, but aren't the main idea themselves!"
        },
        {
            question: "When asked to find evidence for an answer, you should:",
            options: [
                "Trust your memory of the passage",
                "Choose the longest quote",
                "Find specific lines that directly support your answer",
                "Guess based on what sounds right"
            ],
            correct: 2,
            explanation: "Always find direct textual evidence. The SAT rewards careful reading, not assumptions!"
        },
        {
            question: "If a passage says 'The experiment yielded unexpected results,' the word 'yielded' most nearly means:",
            options: ["Surrendered", "Produced", "Planted", "Allowed"],
            correct: 1,
            explanation: "Context is key! In this scientific context, 'yielded' means 'produced' or 'gave.' Context clues save lives!"
        },
        {
            question: "An author who uses phrases like 'I believe' and 'in my opinion' is likely:",
            options: [
                "Presenting objective facts",
                "Expressing a subjective viewpoint",
                "Quoting someone else",
                "Describing a scientific process"
            ],
            correct: 1,
            explanation: "These phrases signal subjective opinion, not objective fact. Recognizing this helps you analyze tone!"
        }
    ],
    writing: [
        {
            question: "Which sentence is grammatically correct?",
            options: [
                "The students who studies hard succeeds.",
                "The student who study hard succeed.",
                "The students who study hard succeed.",
                "The student who studies hard succeed."
            ],
            correct: 2,
            explanation: "Subject-verb agreement! 'Students' (plural) need 'study' and 'succeed' (plural verbs). Match your subjects and verbs!"
        },
        {
            question: "Choose the best transition: 'I studied all night. _____, I felt confident about the test.'",
            options: ["However", "Therefore", "Although", "Unless"],
            correct: 1,
            explanation: "'Therefore' shows cause and effect. Studying caused confidence. Pick transitions that show the right relationship!"
        },
        {
            question: "Which sentence uses commas correctly?",
            options: [
                "My brother who lives in Texas is visiting.",
                "My brother, who lives in Texas is visiting.",
                "My brother who lives in Texas, is visiting.",
                "My brother, who lives in Texas, is visiting."
            ],
            correct: 3,
            explanation: "Non-essential clauses need commas on both sides. 'Who lives in Texas' is extra info, so it gets commas!"
        },
        {
            question: "Which is the most concise version?",
            options: [
                "Due to the fact that it was raining",
                "Because of the rain that was falling",
                "Because it was raining",
                "For the reason that rain was occurring"
            ],
            correct: 2,
            explanation: "'Because it was raining' is clear and concise. When in doubt, choose the shortest clear option!"
        },
        {
            question: "Which sentence uses the semicolon correctly?",
            options: [
                "I love reading; books are amazing.",
                "I love reading; and books are amazing.",
                "I love; reading books are amazing.",
                "I love reading books; are amazing."
            ],
            correct: 0,
            explanation: "Semicolons join two complete sentences that are closely related. Both sides must be able to stand alone!"
        }
    ]
};

// Motivational messages
const motivationalMessages = [
    "You're making incredible progress! Every question you answer makes you stronger! 💪",
    "Consistency is key, and you're showing up! That's what champions do! 🏆",
    "Remember: the SAT is learnable. You're not born knowing this stuff - you're learning it right now! 🧠",
    "Every expert was once a beginner. You're on the path to mastery! 🌟",
    "Your effort today is building your success tomorrow. Keep going! 🚀",
    "Progress, not perfection! You're doing great! 🎯",
    "The fact that you're here studying shows you're already winning! 🏅",
    "Small steps every day lead to big results. You've got this! ⭐",
    "Your future self is thanking you for the work you're putting in now! 🙌",
    "Believe in yourself - we believe in you! 💫"
];

// Achievements
const achievements = [
    { id: 'first-question', icon: '🎯', name: 'First Steps', condition: () => state.practiceStats.answered >= 1 },
    { id: 'ten-questions', icon: '🔥', name: 'On Fire', condition: () => state.practiceStats.answered >= 10 },
    { id: 'fifty-questions', icon: '💯', name: 'Century Club', condition: () => state.practiceStats.answered >= 50 },
    { id: 'high-accuracy', icon: '🎓', name: 'Sharp Shooter', condition: () => state.practiceStats.answered >= 10 && (state.practiceStats.correct / state.practiceStats.answered) >= 0.8 },
    { id: 'all-subjects', icon: '🌟', name: 'Well Rounded', condition: () => {
        const { math, reading, writing } = state.practiceStats.bySubject;
        return math.answered >= 5 && reading.answered >= 5 && writing.answered >= 5;
    }},
    { id: 'topic-master', icon: '📚', name: 'Topic Master', condition: () => state.completedTopics.length >= 6 },
    { id: 'schedule-planner', icon: '📅', name: 'Planner Pro', condition: () => state.schedule !== null },
    { id: 'perfect-score', icon: '⭐', name: 'Perfect Round', condition: () => {
        // Check if they ever got all 5 questions right in a practice session
        return state.practiceStats.correct >= 5;
    }}
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    displayDailyFact();
    loadUserProgress();
});

function initializeApp() {
    // Show user name if exists
    if (state.userName) {
        document.getElementById('userName').value = state.userName;
        updateUserGreeting();
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
        });
    });

    // Save user name
    document.getElementById('saveNameBtn').addEventListener('click', saveUserName);
    document.getElementById('userName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveUserName();
    });

    // Topic checkboxes
    document.querySelectorAll('.topic-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleTopicCheck);
        // Restore checked state
        if (state.completedTopics.includes(checkbox.id)) {
            checkbox.checked = true;
        }
    });

    // Practice buttons
    document.querySelectorAll('.practice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const subject = btn.dataset.subject;
            startPracticeQuiz(subject);
        });
    });

    // Quiz controls
    document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);

    // Schedule
    document.getElementById('generateSchedule').addEventListener('click', generateStudySchedule);

    // Progress reset
    document.getElementById('resetProgress').addEventListener('click', resetProgress);
}

function navigateToPage(page) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    // Show active page
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(page).classList.add('active');

    // Update content based on page
    if (page === 'progress') {
        updateProgressDisplay();
    }
}

function saveUserName() {
    const nameInput = document.getElementById('userName');
    const name = nameInput.value.trim();
    if (name) {
        state.userName = name;
        localStorage.setItem('userName', name);
        updateUserGreeting();
        showNotification(`Welcome, ${name}! Let's crush this SAT! 🚀`);
    }
}

function updateUserGreeting() {
    const displays = document.querySelectorAll('#userNameDisplay');
    displays.forEach(display => {
        display.textContent = state.userName || 'Champion';
    });
}

function displayDailyFact() {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const factElement = document.getElementById('dailyFact');
    if (factElement) {
        factElement.textContent = fact;
    }
}

function handleTopicCheck(e) {
    const topicId = e.target.id;
    if (e.target.checked) {
        if (!state.completedTopics.includes(topicId)) {
            state.completedTopics.push(topicId);
            showNotification(`Great job completing "${e.target.nextElementSibling.textContent}"! 🎉`);
        }
    } else {
        state.completedTopics = state.completedTopics.filter(id => id !== topicId);
    }
    localStorage.setItem('completedTopics', JSON.stringify(state.completedTopics));
    updateSubjectProgress();
}

function updateSubjectProgress() {
    const subjects = {
        math: ['algebra', 'problem-solving', 'passport', 'geometry'],
        reading: ['main-ideas', 'evidence', 'vocabulary', 'analysis'],
        writing: ['grammar', 'expression', 'sentences', 'punctuation']
    };

    Object.keys(subjects).forEach(subject => {
        const topics = subjects[subject];
        const completed = topics.filter(topic => state.completedTopics.includes(topic)).length;
        const percentage = Math.round((completed / topics.length) * 100);
        
        const progressElement = document.getElementById(`${subject}Progress`);
        if (progressElement) {
            progressElement.textContent = percentage;
        }
    });
}

// Practice Quiz Functions
function startPracticeQuiz(subject) {
    const questions = questionBank[subject];
    state.currentQuiz = {
        subject: subject,
        questions: [...questions],
        currentIndex: 0,
        score: 0,
        answers: []
    };

    document.getElementById('quizTitle').textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} Practice`;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('currentQuestion').textContent = '1';
    document.getElementById('quizScore').textContent = '0';
    document.getElementById('practiceQuiz').classList.remove('hidden');
    document.getElementById('feedback').classList.add('hidden');
    
    loadQuestion();
    
    // Scroll to quiz
    document.getElementById('practiceQuiz').scrollIntoView({ behavior: 'smooth' });
}

function loadQuestion() {
    const quiz = state.currentQuiz;
    const question = quiz.questions[quiz.currentIndex];
    
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = quiz.currentIndex + 1;
    
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        optionDiv.textContent = option;
        optionDiv.dataset.index = index;
        optionDiv.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('submitAnswer').classList.remove('hidden');
    document.getElementById('nextQuestion').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
}

function selectAnswer(e) {
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    e.target.classList.add('selected');
}

function submitAnswer() {
    const selected = document.querySelector('.answer-option.selected');
    if (!selected) {
        showNotification('Please select an answer!');
        return;
    }
    
    const quiz = state.currentQuiz;
    const question = quiz.questions[quiz.currentIndex];
    const selectedIndex = parseInt(selected.dataset.index);
    const isCorrect = selectedIndex === question.correct;
    
    // Update stats
    state.practiceStats.answered++;
    state.practiceStats.bySubject[quiz.subject].answered++;
    
    if (isCorrect) {
        quiz.score++;
        state.practiceStats.correct++;
        state.practiceStats.bySubject[quiz.subject].correct++;
    }
    
    // Save stats
    localStorage.setItem('practiceStats', JSON.stringify(state.practiceStats));
    
    // Show feedback
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
        feedback.innerHTML = `<strong>✅ Correct!</strong><br>${question.explanation}`;
        selected.classList.add('correct');
    } else {
        const correctOption = document.querySelectorAll('.answer-option')[question.correct];
        correctOption.classList.add('correct');
        selected.classList.add('incorrect');
        feedback.innerHTML = `<strong>❌ Not quite!</strong><br>The correct answer is: ${question.options[question.correct]}<br><br>${question.explanation}`;
    }
    
    // Update display
    document.getElementById('quizScore').textContent = quiz.score;
    document.getElementById('submitAnswer').classList.add('hidden');
    
    // Show next button or finish
    if (quiz.currentIndex < quiz.questions.length - 1) {
        document.getElementById('nextQuestion').classList.remove('hidden');
    } else {
        setTimeout(() => finishQuiz(), 2000);
    }
    
    // Update practice stats display
    updatePracticeStats();
}

function nextQuestion() {
    state.currentQuiz.currentIndex++;
    loadQuestion();
}

function finishQuiz() {
    const quiz = state.currentQuiz;
    const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = `🎉 Outstanding! You got ${quiz.score}/${quiz.questions.length} correct (${percentage}%)! You're crushing it!`;
    } else if (percentage >= 60) {
        message = `👏 Good job! You got ${quiz.score}/${quiz.questions.length} correct (${percentage}%). Keep practicing!`;
    } else {
        message = `💪 You got ${quiz.score}/${quiz.questions.length} correct (${percentage}%). Don't worry - practice makes perfect! Review the explanations and try again!`;
    }
    
    showNotification(message);
    document.getElementById('practiceQuiz').classList.add('hidden');
    updatePracticeStats();
}

function updatePracticeStats() {
    const stats = state.practiceStats;
    document.getElementById('totalAnswered').textContent = stats.answered;
    document.getElementById('totalCorrect').textContent = stats.correct;
    
    const accuracy = stats.answered > 0 
        ? Math.round((stats.correct / stats.answered) * 100)
        : 0;
    document.getElementById('accuracyRate').textContent = accuracy + '%';
}

// Schedule Functions
function generateStudySchedule() {
    const testDateInput = document.getElementById('testDate');
    const studyHoursInput = document.getElementById('studyHours');
    
    if (!testDateInput.value) {
        showNotification('Please select your test date!');
        return;
    }
    
    const testDate = new Date(testDateInput.value);
    const today = new Date();
    const daysUntilTest = Math.ceil((testDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilTest < 0) {
        showNotification('Please select a future date!');
        return;
    }
    
    const weeksUntilTest = Math.ceil(daysUntilTest / 7);
    const hoursPerWeek = parseInt(studyHoursInput.value);
    
    state.schedule = {
        testDate: testDateInput.value,
        hoursPerWeek: hoursPerWeek,
        weeksUntilTest: weeksUntilTest
    };
    localStorage.setItem('schedule', JSON.stringify(state.schedule));
    
    displaySchedule(weeksUntilTest, hoursPerWeek, daysUntilTest);
}

function displaySchedule(weeks, hoursPerWeek, totalDays) {
    const scheduleContent = document.getElementById('scheduleContent');
    
    let html = `
        <div class="schedule-summary" style="background: #dbeafe; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; text-align: center;">
            <h3 style="color: #1e40af; margin-bottom: 0.5rem;">Your Study Timeline</h3>
            <p style="font-size: 1.2rem;"><strong>${totalDays} days</strong> (${weeks} weeks) until test day!</p>
            <p>Total study time: <strong>${weeks * hoursPerWeek} hours</strong></p>
        </div>
    `;
    
    const weekPlans = [
        {
            title: 'Foundation Building',
            focus: 'Learn core concepts and identify weak areas',
            schedule: [
                'Monday: Math fundamentals (2 hrs) - Heart of Algebra',
                'Tuesday: Reading comprehension strategies (2 hrs)',
                'Wednesday: Writing & grammar rules (2 hrs)',
                'Thursday: Math practice (2 hrs) - Problem Solving & Data',
                'Friday: Reading practice passages (2 hrs)',
                'Weekend: Review week & take practice test sections'
            ]
        },
        {
            title: 'Skill Building',
            focus: 'Practice specific question types and strategies',
            schedule: [
                'Monday: Advanced Math (2 hrs) - Quadratics & functions',
                'Tuesday: Evidence-based reading (2 hrs)',
                'Wednesday: Sentence structure & punctuation (2 hrs)',
                'Thursday: Word problems & data analysis (2 hrs)',
                'Friday: Reading analysis & inference (2 hrs)',
                'Weekend: Timed practice sections'
            ]
        },
        {
            title: 'Practice & Refinement',
            focus: 'Full-length practice tests and review',
            schedule: [
                'Monday: Review practice test mistakes (2 hrs)',
                'Tuesday: Targeted Math practice (2 hrs)',
                'Wednesday: Targeted Reading practice (2 hrs)',
                'Thursday: Targeted Writing practice (2 hrs)',
                'Friday: Speed drills & time management (2 hrs)',
                'Weekend: Full-length practice test under timed conditions'
            ]
        },
        {
            title: 'Final Preparation',
            focus: 'Review, confidence building, and test strategies',
            schedule: [
                'Monday: Review all formulas & key concepts (2 hrs)',
                'Tuesday: Practice difficult question types (2 hrs)',
                'Wednesday: Light review & confidence building (1.5 hrs)',
                'Thursday: Quick review of strategies (1 hr)',
                'Friday: Light review, relax, prepare materials (1 hr)',
                'Weekend: Rest, relax, get ready for test day!'
            ]
        }
    ];
    
    const weeksToShow = Math.min(weeks, 4);
    for (let i = 0; i < weeksToShow; i++) {
        const plan = weekPlans[i % weekPlans.length];
        html += `
            <div class="week-schedule">
                <div class="week-header">Week ${i + 1}: ${plan.title}</div>
                <p style="margin-bottom: 1rem; font-style: italic; color: var(--text-light);">${plan.focus}</p>
                ${plan.schedule.map(day => `<div class="day-item">${day}</div>`).join('')}
            </div>
        `;
    }
    
    if (weeks > 4) {
        html += `
            <div style="background: #fef3c7; padding: 1.5rem; border-radius: 0.5rem; margin-top: 1.5rem;">
                <strong>📚 Long-term Strategy:</strong> With ${weeks} weeks, you have plenty of time! 
                Cycle through these weekly patterns, focusing more on your weak areas. 
                Take full practice tests every 2-3 weeks to track progress.
            </div>
        `;
    } else if (weeks < 4) {
        html += `
            <div style="background: #fee2e2; padding: 1.5rem; border-radius: 0.5rem; margin-top: 1.5rem;">
                <strong>⏰ Crunch Time!</strong> Focus on your weakest areas and practice tests. 
                Quality over quantity - review your mistakes thoroughly!
            </div>
        `;
    }
    
    scheduleContent.innerHTML = html;
    document.getElementById('scheduleDisplay').classList.remove('hidden');
    document.getElementById('scheduleDisplay').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Your personalized study schedule is ready! 📅');
}

// Progress Functions
function updateProgressDisplay() {
    updateUserGreeting();
    
    // Topics completed
    const totalTopics = 12;
    const completed = state.completedTopics.length;
    document.getElementById('topicsCompleted').textContent = `${completed}/${totalTopics}`;
    
    // Questions answered
    const questionsCount = state.practiceStats.answered;
    document.getElementById('questionsCount').textContent = questionsCount;
    const maxQuestions = 100;
    const questionsPercent = Math.min((questionsCount / maxQuestions) * 100, 100);
    document.getElementById('questionsProgressBar').style.width = questionsPercent + '%';
    
    // Overall accuracy
    const accuracy = state.practiceStats.answered > 0 
        ? Math.round((state.practiceStats.correct / state.practiceStats.answered) * 100)
        : 0;
    document.getElementById('overallAccuracy').textContent = accuracy + '%';
    
    // Subject progress
    updateSubjectProgressBars();
    
    // Achievements
    displayAchievements();
    
    // Motivational message
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    document.getElementById('motivationalMessage').textContent = message;
}

function updateSubjectProgressBars() {
    const subjects = {
        math: { topics: ['algebra', 'problem-solving', 'passport', 'geometry'], element: 'mathBar', percentElement: 'mathPercent' },
        reading: { topics: ['main-ideas', 'evidence', 'vocabulary', 'analysis'], element: 'readingBar', percentElement: 'readingPercent' },
        writing: { topics: ['grammar', 'expression', 'sentences', 'punctuation'], element: 'writingBar', percentElement: 'writingPercent' }
    };
    
    Object.keys(subjects).forEach(subject => {
        const { topics, element, percentElement } = subjects[subject];
        const completed = topics.filter(topic => state.completedTopics.includes(topic)).length;
        const practiceStats = state.practiceStats.bySubject[subject];
        
        // Combine topic completion and practice accuracy
        const topicPercent = (completed / topics.length) * 50; // 50% weight
        const practicePercent = practiceStats.answered > 0 
            ? ((practiceStats.correct / practiceStats.answered) * 50) // 50% weight
            : 0;
        
        const totalPercent = Math.round(topicPercent + practicePercent);
        
        document.getElementById(element).style.width = totalPercent + '%';
        document.getElementById(percentElement).textContent = totalPercent + '%';
    });
}

function displayAchievements() {
    const container = document.getElementById('achievementsList');
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const unlocked = achievement.condition();
        const div = document.createElement('div');
        div.className = `achievement-item ${unlocked ? '' : 'achievement-locked'}`;
        div.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
        `;
        if (unlocked) {
            div.title = `Achievement Unlocked: ${achievement.name}`;
        } else {
            div.title = 'Keep going to unlock!';
        }
        container.appendChild(div);
    });
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone!')) {
        localStorage.clear();
        location.reload();
    }
}

function loadUserProgress() {
    updateSubjectProgress();
    updatePracticeStats();
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Initialize on load
updateUserGreeting();
updatePracticeStats();
