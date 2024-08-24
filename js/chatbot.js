const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const letUsChatBtn = document.getElementById("letUsChatBtn");
let lastMessageTime = null;

letUsChatBtn.addEventListener('click', () => {
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "block";
        loadChatHistory();
    } else {
        chatBox.style.display = "none";
    }
});

closeChat.addEventListener('click', () => {
    chatBox.style.display = "none";
});

document.getElementById('send-btn').addEventListener('click', function (event) {
    event.preventDefault();
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        appendMessage('user', userInput);
        generateBotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
});

function getCurrentDateTime() {
    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Date().toLocaleString('en-US', options);
}

// Function to append messages to the chat log and save to local storage
function appendMessage(sender, message, isForm = false) {
    const messagesContainer = document.querySelector('.messages-container');

    // Retrieve chat history from local storage, or create a new array if it doesn't exist
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    if (shouldDisplayTime()) {
        const timeStamp = document.createElement('div');
        timeStamp.classList.add('time');
        const timeSpan = document.createElement('span');
        timeSpan.textContent = getCurrentDateTime();
        timeStamp.appendChild(timeSpan);
        messagesContainer.appendChild(timeStamp);

        // Add the timestamp to the chat history
        chatHistory.push({
            sender: 'time',
            message: getCurrentDateTime()
        });
    }

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-box', sender === 'user' ? 'right' : 'left', sender);

    if (isForm) {
        const formContainer = createContactForm();
        messageContainer.appendChild(formContainer);
        chatHistory.push({
            sender: sender,
            message: "contact-form",
            isForm: true
        });
    } else {
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        messageContainer.appendChild(newMessage);
        chatHistory.push({
            sender: sender,
            message: message
        });
    }

    messagesContainer.appendChild(messageContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    // Save the updated chat history to local storage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    // Update the last message time
    lastMessageTime = new Date();
}

// Function to determine if we should display the time
function shouldDisplayTime() {
    if (!lastMessageTime) {
        return true; // If it's the first message, display the time
    }

    const now = new Date();
    const timeDiff = now - lastMessageTime;
    const minutesDiff = Math.floor(timeDiff / 60000);

    return minutesDiff > 1; // Display the time if more than 1 minute has passed since the last message
}

// Function to load chat history from local storage
function loadChatHistory() {
    const messagesContainer = document.querySelector('.messages-container');
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Clear the container before loading history to avoid duplication
    messagesContainer.innerHTML = '';

    chatHistory.forEach(chat => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-box', chat.sender === 'user' ? 'right' : 'left', chat.sender);

        if (chat.sender === 'time') {
            const timeStamp = document.createElement('div');
            timeStamp.classList.add('time');
            const timeSpan = document.createElement('span');
            timeSpan.textContent = chat.message;
            timeStamp.appendChild(timeSpan);
            messagesContainer.appendChild(timeStamp);
        } else if (chat.isForm) {
            const formContainer = createContactForm();
            messageContainer.appendChild(formContainer);
            messagesContainer.appendChild(messageContainer);
        } else {
            const newMessage = document.createElement('p');
            newMessage.textContent = chat.message;
            messageContainer.appendChild(newMessage);
            messagesContainer.appendChild(messageContainer);
        }
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to create the contact form
function createContactForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('message-box', 'left', 'bot');

    const contactForm = document.createElement('form');
    contactForm.id = 'contact-form';
    contactForm.setAttribute("action", "https://formspree.io/f/xqazyngl");
    contactForm.setAttribute("method", "POST");
    contactForm.innerHTML = `
        <div class="row">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="row">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="row">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="3" cols="20" required></textarea>
        </div>
        <button type="submit">Submit</button>
    `;

    formContainer.appendChild(contactForm);

    // Event listener for the contact form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        appendMessage('user', 'Contact form submitted');
        appendMessage('bot', 'Thank you for reaching out! We will get back to you soon.');
        contactForm.submit();
    });

    return formContainer;
}

// Function to generate bot response and append the contact form if needed
function generateBotResponse(userInput) {
    let botResponse;

    if (userInput.toLowerCase().includes('your name')) {
        botResponse = "I'm your friendly chatbot by Indica Piezo Optics!";
    } else if (userInput.toLowerCase().includes('help in contacting') || userInput.toLowerCase().includes('contact form') || userInput.toLowerCase().includes('contact')) {
        botResponse = 'You can contact us through our contact form below.';
        appendMessage('bot', botResponse);
        appendMessage('bot', '', true);
        return;
    } else if (userInput.toLowerCase().includes('help')) {
        botResponse = 'Sure, how can I help you?';
    } else if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi') || userInput.toLowerCase().includes('hey') || userInput.toLowerCase().includes('hiii') || userInput.toLowerCase().includes('heyyy')) {
        botResponse =
            "Hey there, please leave your details so we can contact you even if you are no longer on the site.";
        appendMessage('bot', botResponse);
        appendMessage('bot', '', true);
        return;
    } else if (userInput.toLowerCase().includes('bye') || userInput.toLowerCase().includes('byee') || userInput.toLowerCase().includes('see you') || userInput.toLowerCase().includes('tata')) {
        botResponse = "Glad to help you. Any help you need again, chat with me. See You!";
    } else {
        botResponse = "I don't understand. What do you want to say?";
    }
    setTimeout(function () {
        appendMessage('bot', botResponse);
    }, 500);
}

function clearChatHistory() {
    localStorage.removeItem('chatHistory');
    document.querySelector('.messages-container').innerHTML = '';
    lastMessageTime = null;
}

document.getElementById('clear-chat-btn').addEventListener('click', clearChatHistory);
