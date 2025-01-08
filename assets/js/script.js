'use strict';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.querySelectorAll('.category-header').forEach(header => {
  header.addEventListener('click', () => {
    const dropdown = header.parentElement;
    dropdown.classList.toggle('active');
  });
});

document.querySelectorAll('.main-category-header').forEach(header => {
  header.addEventListener('click', () => {
    const dropdown = header.parentElement;
    dropdown.classList.toggle('active');
  });
});

// Chat functionality
const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');
const sendButton = document.getElementById('send-btn');

// Handle sending messages
sendButton.addEventListener('click', sendMessage);
inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const userMessage = inputBox.value.trim();
  if (!userMessage) return;

  // Add user message to chat
  appendMessage('You', userMessage);
  inputBox.value = '';

  try {
    // Add console.log to debug the request
    console.log('Sending request to OpenAI...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`, 
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', 
        messages: [
          {
            role: 'system',
            content: 'You are an AI Design Companion, a UX/UI Design assistant specializing in interface development.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7
      }),
    });

    // Add response status check
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Response received:', data); // Debug response

    if (data.choices && data.choices[0]) {
      appendMessage('UI Companion', data.choices[0].message.content);
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Detailed error:', error); // More detailed error logging
    appendMessage('Error', `Could not get a response: ${error.message}`);
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${sender.toLowerCase() === 'you' ? 'user-message' : 'bot-message'}`;
  messageElement.innerHTML = `
    <div class="message-content">
      <span>${message}</span>
    </div>
  `;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
