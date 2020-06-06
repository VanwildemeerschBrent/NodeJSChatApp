const socket = io("http://localhost:3000");
// Message form elements
const messageForm = document.querySelector(".send_container");
const messageInput = document.querySelector(".message_input");
const messageContainer = document.querySelector(".message_container");

const userName = socket.on("chat-message", (message) => {
  console.log("Message : ", message);
  appendMessage(message);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  appendOwnMessage(message);
  messageInput.value = "";
});

const appendMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.classList = "w-screen h-auto inline-block";
  messageElement.innerHTML = `<p class="bg-gray-600 w-auto max-w-md  h-auto text-white relative float-left p-2 rounded my-1 ml-3">${message}</p>`;
  messageContainer.append(messageElement);
};

const appendOwnMessage = (message) => {
  const htmlElement = document.createElement("div");
  htmlElement.classList = "w-screen h-auto inline-block";
  htmlElement.innerHTML = `<p class="bg-blue-500 w-auto max-w-md h-auto text-white relative float-right p-2 rounded my-1 mr-3">${message}</p>`;
  messageContainer.appendChild(htmlElement);
};
