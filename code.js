document.addEventListener('DOMContentLoaded', function() {
    gapi.load('client:auth2', initClient);
});


require.config({ 
    paths: { 
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' 
    }
});

document.addEventListener('DOMContentLoaded', function() {



     // Array of questions
     const questions = [
        {
            title: "Sum of Two Numbers",
            description: "Write a program to calculate the sum of two numbers.",
            output: "The output should be the sum of the two numbers."
        },
        {
            title: "Reverse a String",
            description: "Write a program to reverse a string.",
            output: "The output should be the reversed string."
        },
        {
            title: "Find Maximum in Array",
            description: "Write a program to find the maximum value in an array.",
            output: "The output should be the maximum value."
        },
        {
            title: "Check Prime Number",
            description: "Write a program to check if a number is prime.",
            output: "The output should be 'true' if the number is prime, 'false' otherwise."
        },
        {
            title: "Factorial of a Number",
            description: "Write a program to calculate the factorial of a number.",
            output: "The output should be the factorial of the number."
        },
        {
            title: "Palindrome Check",
            description: "Write a program to check if a string is a palindrome.",
            output: "The output should be 'true' if the string is a palindrome, 'false' otherwise."
        },
        {
            title: "Fibonacci Sequence",
            description: "Write a program to generate the Fibonacci sequence up to a given number.",
            output: "The output should be the Fibonacci sequence."
        },
        {
            title: "Bubble Sort",
            description: "Write a program to sort an array using bubble sort.",
            output: "The output should be the sorted array."
        }
    ];

    const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 8);
    let currentQuestionIndex = 0;

    function updateQuestionPanel() {
        document.getElementById('question-title').textContent = randomQuestions[currentQuestionIndex].title;
        document.getElementById('question-description').textContent = randomQuestions[currentQuestionIndex].description;
        document.getElementById('question-output').textContent = randomQuestions[currentQuestionIndex].output;

        document.getElementById('next-question').disabled = currentQuestionIndex === randomQuestions.length - 1;
    }

    const nextButton = document.getElementById('next-question');
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (confirm("Are You Sure You Completed this Question?\nThe Question you can't see again")) {
                if (currentQuestionIndex < randomQuestions.length - 1) {
                    currentQuestionIndex++;
                    updateQuestionPanel();
                }
            }
        });
    }

    updateQuestionPanel();

    let timeLeft = 60 * 60;
    const timerDisplay = document.getElementById('timer');
    const submitButton = document.querySelector('.submit-button');

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            submitButton.disabled = true;
            submitButton.textContent = "Time's up! Submission disabled";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    require(['vs/editor/editor.main'], function() {
        const editor = monaco.editor.create(document.getElementById('editor'), {
            value: "// Start coding here...\n",
            language: "c",
            theme: "vs-dark",
            automaticLayout: true
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C, () => {});
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V, () => {});
        editor.updateOptions({ contextmenu: false });

        document.addEventListener('keydown', function(event) {
            if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v')) {
                event.preventDefault();
            }
        });

        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        document.querySelector('.submit-button').addEventListener('click', function() {
            if (confirm("Are you sure to submit your code?")) {
                const codeContent = editor.getValue();
                const username = localStorage.getItem('username') || 'Unknown User';
                const message = `Code Submission by ${username}:\n\n${codeContent}`;

                sendTextToTelegram(message).then(() => {
                    alert('Code submitted successfully!');
                    location.href = "thanku.html";
                }).catch(error => {
                    console.error('Error during submission:', error);
                });
            }
        });
    });

    const resizer = document.querySelector('.resizer');
    const questionPanel = document.querySelector('.question-panel');
    const codeEditor = document.querySelector('.code-editor');

    let isResizing = false;

    resizer.addEventListener('mousedown', function(event) {
        isResizing = true;
        document.body.style.cursor = 'ew-resize';
    });

    document.addEventListener('mousemove', function(event) {
        if (!isResizing) return;

        const containerWidth = document.querySelector('.container').clientWidth;
        const newQuestionPanelWidth = ((event.clientX / containerWidth) * 100);
        const newCodeEditorWidth = 100 - newQuestionPanelWidth;

        questionPanel.style.width = `${newQuestionPanelWidth}%`;
        codeEditor.style.width = `${newCodeEditorWidth}%`;
        resizer.style.left = `${newQuestionPanelWidth}%`;
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
        document.body.style.cursor = 'default';
    });
});

function sendTextToTelegram(message) {
    return fetch(`https://api.telegram.org/bot6991209062:AAHizmFI5XfGTE4oi-mR8yw7b5syhYKR_RI/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: 5938612536,
            text: message
        })
    }).then(response => response.json());
}