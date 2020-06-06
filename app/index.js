const socket = io("http://localhost:3000");
// Message form elements
const messageForm = document.querySelector(".send_container");
const messageContainer = document.querySelector(".message_container");
const joinForm = document.querySelector(".join_chat");

let userName = null;

socket.on("chat-message", (message) => {
  appendReceivedMessage(message);
});

socket.on("new-user", (userName) => appendNewUserJoined(userName));

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = document.querySelector(".input_userName").value;
  socket.emit("new-user", userName);
  appendJoinedChat(userName);
  document.querySelector(".popup_userName").classList += " hidden";
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.querySelector(".message_input").value;
  appendSendMessage(message);
  socket.emit("send-chat-message", `${userName} : ${message}`);
  document.querySelector(".message_input").value = "";
});

const appendReceivedMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.classList = "w-screen h-auto inline-block";
  messageElement.innerHTML = `<p class="bg-gray-600 w-auto max-w-md  h-auto text-white relative float-left p-2 rounded my-1 ml-3">${message}</p>`;
  messageContainer.append(messageElement);
  messageElement.scrollIntoView();
};

const appendSendMessage = (message) => {
  const htmlElement = document.createElement("div");
  htmlElement.classList = "w-screen h-auto inline-block";
  htmlElement.innerHTML = `<p class="bg-blue-500 w-auto max-w-md h-auto text-white relative float-right p-2 rounded my-1 mr-6">${message}</p>`;
  messageContainer.appendChild(htmlElement);
  htmlElement.scrollIntoView();
};

const appendJoinedChat = () => {
  const htmlElement = document.createElement("div");
  htmlElement.classList = "w-screen h-auto inline-block";
  htmlElement.innerHTML = `<p class="bg-green-500 w-auto max-w-md h-auto text-white relative float-right p-2 rounded my-1 mr-6">You have joined the chat</p>`;
  messageContainer.appendChild(htmlElement);
  htmlElement.scrollIntoView();
};

const appendNewUserJoined = (userName) => {
  const htmlElement = document.createElement("div");
  htmlElement.classList = "w-screen h-auto inline-block";
  htmlElement.innerHTML = `<p class="bg-green-500 w-auto max-w-md h-auto text-white relative float-left p-2 rounded my-1 ml-3">${userName} has joined the chat</p>`;
  messageContainer.appendChild(htmlElement);
  htmlElement.scrollIntoView();
};
