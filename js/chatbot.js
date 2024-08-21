const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const letUsChatBtn = document.getElementById("letUsChatBtn");

letUsChatBtn.addEventListener('click', () => {
    if (chatBox.style.display = "none") {
        chatBox.style.display = "block";
    }
    if (chatBox.style.display = "block") {
        closeChat.addEventListener('click', () => {
            chatBox.style.display = "none";
        })
    }
})

document.getElementById('send-btn').addEventListener('click', function (event) {
    event.preventDefault();
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        appendMessage('user', userInput);
        generateBotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
});

let lastMessageTime = null;

function getCurrentDateTime() {
    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Date().toLocaleString('en-US', options);
}

// Function to append messages to the chat log
function appendMessage(sender, message) {
    const messagesContainer = document.querySelector('.messages-container');

    if (shouldDisplayTime()) {
        const timeStamp = document.createElement('div');
        timeStamp.classList.add('time');
        const timeSpan = document.createElement('span');
        timeSpan.textContent = getCurrentDateTime();
        timeStamp.appendChild(timeSpan);
        messagesContainer.appendChild(timeStamp);
    }

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-box', sender === 'user' ? 'right' : 'left', sender);

    const newMessage = document.createElement('p');
    newMessage.textContent = message;

    messageContainer.appendChild(newMessage);
    messagesContainer.appendChild(messageContainer);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

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

// Function to generate bot response and append the contact form if needed
function generateBotResponse(userInput) {
    let botResponse;

    if (userInput.toLowerCase().includes('your name')) {
        botResponse = "I'm your friendly chatbot by Indica Piezo Optics!";
    } else if (userInput.toLowerCase().includes('help')) {
        botResponse = "Sure! What you need help with?";
    } else if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi') || userInput
        .toLowerCase().includes('hiii')) {
        botResponse =
            "Hey there, please leave your details so we can contact you even if you are no longer on the site.";
        appendMessage('bot', botResponse); // Display the bot's message
        appendContactForm();
        return;
    } else if (userInput.toLowerCase().includes('bye', 'byee', 'see you', 'tata')) {
        botResponse = "Glad to help you. Any help you need again, chat with me. See You!";
    } else {
        botResponse = "I don't understand. What do you want to say?";
    }
    setTimeout(function () {
        appendMessage('bot', botResponse);
    }, 500);
}

// Function to append the contact form to the chat log
function appendContactForm() {
    const messagesContainer = document.querySelector('.messages-container');

    const formContainer = document.createElement('div');
    formContainer.classList.add('message-box', 'left', 'bot');

    const contactForm = document.createElement('form');
    contactForm.id = 'contact-form';

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
    messagesContainer.appendChild(formContainer);

    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message

    // Event listener for the contact form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        appendMessage('user', 'Contact form submitted');
        appendMessage('bot', 'Thank you for reaching out! We will get back to you soon.');
    });
}
