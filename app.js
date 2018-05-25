const QUEST = {
    questions: [{
        question: "The Adventures of Tin Tin is a comic series created by a cartoonist from which country?",
        answers: ["France", "Germany", "Belgium", "Switzerland"],
        correctIndex: 2,
    }, {
        question: "Which of these cities is the captial of Canada?",
        answers: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        correctIndex: 3,
    }, {
        question: "Which country has the largest democracy?",
        answers: ["USA", "United Kingdom", "India", "China"],
        correctIndex: 2,
    }, {
        question: "What image is located on the Japanese flag?",
        answers: ["A red disc", "Sun and stars", "A sword with stars", "Red and yellow stripes"],
        correctIndex: 0,
    }, {
        question: "Capoeira is a martial art developed in which country?",
        answers: ["Malaysia", "Brazil", "Bhutan", "Peru"],
        correctIndex: 1,
    }, {
        question: "What is the (English) name of this ancient Chinese game?",
        answers: ["Chess", "Suicide", "Go", "Armor"],
        correctIndex: 2,
    }, {
        question: "The worldwide month of fasting for the Islamic religion is called:",
        answers: ["Deen", "Ramadan", "Hajj", "Hanukkah"],
        correctIndex: 1,
    }, {
        question: "The kangaroo and the emu are animals on the Australian Coat of Arms. What do these animals symbolize?",
        answers: ["Uniqueness of Australia", "Anti-war", "Preserving an endangered species", "Forward progress"],
        correctIndex: 3,
    }, {
        question: "Africa is a continent made of of how many countries?",
        answers: [54, 7, 12, 108],
        correctIndex: 0,
    }, {
        question: "The 45th President of the United States called this group, very fine people:",
        answers: ["Poets", "NFL players", "Veterans", "Nazis"],
        correctIndex: 3,
    }],
    visibleQuest: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
};

function renderQuest() {
    const currentQuest = QUEST.questions[QUEST.visibleQuest];
    const answers = currentQuest.answers.map(function(item, index) {
        return `<p><input type="radio" name="answer" value="${index}"/><label>${item}</label></p>`;
    }).join('');
    $("#questions").html(`<h3>${currentQuest.question}</h3>${answers}`);
}

function hideError() {
    setTimeout(function() {
        $('#message').empty();
    }, 2000);
}

$('#submitanswer').click(function() {
    const userInput = $('input[name=answer]:checked');
    if (!userInput.length) {
        $('#message').html('<h4>Select something!</h4>');
        hideError();
    } else {
        const correctIndex = QUEST.questions[QUEST.visibleQuest].correctIndex;
        if (Number(userInput.val()) === correctIndex) {
            QUEST.correctAnswers++;
            $('#message').html('<span class="correct">Awesome! Your answer is correct!</span>')
        } else {
            QUEST.incorrectAnswers++;
            const correctAnswer = QUEST.questions[QUEST.visibleQuest].answers[correctIndex];
            $('#message').html(`<span class="incorrect">Your answer is not correct! Correct answer is: ${correctAnswer}</span>`);
        }

        setTimeout(function() {
            $('#message').empty();
            const QuestMove = QUEST.questions.length - 1;
            if (QUEST.visibleQuest < QuestMove) {
                QUEST.visibleQuest++;
                renderQuest();
            } else {
                $('#questions').html(`<p>Your Score:</p><p><strong>Corect answers: </strong>${QUEST.correctAnswers}</p><p><strong>Incorrect answers: </strong>${QUEST.incorrectAnswers}</p>`);
                $('#submitanswer').slideUp();
                $('#retake').slideDown();
            }
        }, 2000);
    }
});
$('#beginthis').click(function() {
    renderQuest();
    $('#submitanswer').slideDown();
});
$('#retake').click(function() {
    QUEST.visibleQuest = 0;
    QUEST.correctAnswers = 0;
    QUEST.incorrectAnswers = 0;
    $('#retake').slideUp();
    renderQuest();
    $('#submitanswer').slideDown();
});
