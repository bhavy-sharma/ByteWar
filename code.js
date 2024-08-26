require.config({ 
    paths: { 
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Timer Logic
    let timeLeft = 60 * 60; // 60 minutes in seconds
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
            submitButton.disabled = true; // Disable the submit button
            submitButton.textContent = "Time's up! Submission disabled";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    require(['vs/editor/editor.main'], function() {
        const editor = monaco.editor.create(document.getElementById('editor'), {
            value: "// Start coding here...\n",
            language: "c", // Set the default language
            theme: "vs-dark", // Dark theme
            automaticLayout: true
        });

        // Disable Copy-Paste Functionality within the Monaco Editor
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C, () => {});
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V, () => {});

        // Disable context menu (right-click) through Monaco API
        editor.updateOptions({ contextmenu: false });
    });

    // Disable Copy-Paste Functionality across the entire webpage
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v')) {
            event.preventDefault();
        }
    });

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // Handle form submission
    document.querySelector('.submit-button').addEventListener('click', function() {
        // Logic for submitting the code
        confirm("Are You Sure To Submit your Code")
        alert('Code submitted successfully!');
        location.href = "thanku.html";

    });

    // Resizing logic
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
