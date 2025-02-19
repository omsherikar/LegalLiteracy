// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the slideshow
    initSlideshow();
    
    // Initialize the chat toggle functionality
    document.getElementById('chat-toggle').addEventListener('click', toggleChat);
    
    // Initialize gallery tabs
    initGalleryTabs();
});

// Slideshow Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow img');
const dots = document.querySelectorAll('.dot');

function initSlideshow() {
    // Show first slide
    showSlide(slideIndex);
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto advance slides every 5 seconds
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 5000);
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.style.opacity = '0';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and set active dot
    slides[index].style.opacity = '1';
    dots[index].classList.add('active');
    slideIndex = index;
}

// Chat Functionality
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.classList.toggle('hidden');
    
    // If opening the chat for the first time, show welcome message
    if (!chatbox.classList.contains('hidden') && document.getElementById('chat-content').children.length === 0) {
        addBotMessage("Hello! I'm your legal assistant. How can I help you today?");
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input field
        userInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            // Simple responses based on keywords
            const response = getBotResponse(message);
            addBotMessage(response);
        }, 1000);
    }
}

function addUserMessage(message) {
    const chatContent = document.getElementById('chat-content');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `<p>${message}</p>`;
    
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function addBotMessage(message) {
    const chatContent = document.getElementById('chat-content');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('bot-message');
    messageElement.innerHTML = `<p>${message}</p>`;
    
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function getBotResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
        return "Hello! How can I assist you with legal information today?";
    } else if (message.includes('legal aid') || message.includes('lawyer')) {
        return "You can access free legal aid services by visiting the 'Legal Aid' section. Would you like me to guide you there?";
    } else if (message.includes('document') || message.includes('translation')) {
        return "We offer document translation services in multiple languages. You can submit your documents through the 'Document Translation' service on our homepage.";
    } else if (message.includes('rights') || message.includes('constitution')) {
        return "You can learn about your constitutional rights in our 'Legal Resources' section. We offer information in multiple languages for better understanding.";
    } else if (message.includes('quiz') || message.includes('test')) {
        return "We have multiple quizzes on legal topics. Would you like to try our 'Basic Legal Rights' quiz in the sidebar?";
    } else {
        return "I'm not sure I understand. Could you please rephrase your question or explore our various sections for specific information?";
    }
}

// Language Selector
function changeLanguage() {
    const selectedLanguage = document.getElementById('language').value;
    
    // In a real implementation, this would use language files or API
    // This is a simplified simulation
    alert(`Language changed to: ${selectedLanguage}`);
    
    // Here you would typically:
    // 1. Load language-specific content
    // 2. Update text elements throughout the page
    // 3. Perhaps change right-to-left settings for certain languages
}

// Quiz Functionality
function startQuiz() {
    // Sample quiz questions
    const quizQuestions = [
        {
            question: "Which Article of Indian Constitution guarantees Right to Equality?",
            options: ["Article 14", "Article 19", "Article 21", "Article 32"],
            correctAnswer: 0
        },
        {
            question: "What is the legal age for voting in India?",
            options: ["16 years", "18 years", "21 years", "25 years"],
            correctAnswer: 1
        },
        {
            question: "Which of these is a fundamental right in India?",
            options: ["Right to Property", "Right to Education", "Right to Work", "Right to Privacy"],
            correctAnswer: 1
        }
    ];
    
    // Create quiz modal
    const quizModal = document.createElement('div');
    quizModal.classList.add('quiz-modal');
    
    let currentQuestion = 0;
    let score = 0;
    
    function renderQuestion() {
        const question = quizQuestions[currentQuestion];
        
        quizModal.innerHTML = `
            <div class="quiz-container">
                <h3>Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>
                <p class="question">${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
                <div class="quiz-footer">
                    <span>Score: ${score}/${quizQuestions.length}</span>
                    <button class="quiz-close-btn">Exit Quiz</button>
                </div>
            </div>
        `;
        
        // Add event listeners for options
        quizModal.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                checkAnswer(selectedIndex);
            });
        });
        
        // Add event listener for close button
        quizModal.querySelector('.quiz-close-btn').addEventListener('click', () => {
            document.body.removeChild(quizModal);
        });
    }
    
    function checkAnswer(selectedIndex) {
        const question = quizQuestions[currentQuestion];
        
        if (selectedIndex === question.correctAnswer) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    }
    
    function showResult() {
        quizModal.innerHTML = `
            <div class="quiz-container">
                <h3>Quiz Completed!</h3>
                <p>Your score: ${score} out of ${quizQuestions.length}</p>
                <p>${getScoreMessage(score, quizQuestions.length)}</p>
                <div class="quiz-footer">
                    <button class="quiz-close-btn">Close</button>
                    <button class="quiz-retry-btn">Try Again</button>
                </div>
            </div>
        `;
        
        quizModal.querySelector('.quiz-close-btn').addEventListener('click', () => {
            document.body.removeChild(quizModal);
        });
        
        quizModal.querySelector('.quiz-retry-btn').addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            renderQuestion();
        });
    }
    
    function getScoreMessage(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage >= 80) {
            return "Excellent! You have a strong understanding of basic legal rights.";
        } else if (percentage >= 60) {
            return "Good job! You know the fundamentals, but there's room for improvement.";
        } else {
            return "You might want to explore our Legal Resources section to learn more about basic rights.";
        }
    }
    
    // Add modal to body and start quiz
    document.body.appendChild(quizModal);
    renderQuestion();
}

// Gallery Tab Functionality
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Handle tab content visibility
            // In a real implementation, you'd load different content based on the tab
            const tabId = tab.dataset.tab;
            alert(`Switching to ${tabId} gallery tab`);
        });
    });
}

// Event handling for form submissions
document.addEventListener('submit', function(event) {
    // Prevent actual form submission in this demo
    event.preventDefault();
    
    // Get the form that was submitted
    const form = event.target;
    
    if (form.id === 'contact-form') {
        alert('Thank you for your message. We will get back to you shortly.');
        form.reset();
    } else if (form.id === 'newsletter-form') {
        alert('Thank you for subscribing to our newsletter!');
        form.reset();
    }
});

// Add event listener for user input to handle Enter key
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


// Add some CSS styles dynamically for elements that are created by JavaScript
document.head.insertAdjacentHTML('beforeend', `

`);