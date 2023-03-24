const socket = io();

const form = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = {
    author: {
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      lastname: document.getElementById("lastname").value,
      age: document.getElementById("age").value,
      nickname: document.getElementById("nickname").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("text").value,
  };

  document.getElementById("text").value = "";

  socket.emit("new-message", message);
});

socket.on("messages", (data) => {
  if (data) {
    let html = "";

    data.messages.forEach((message) => {
      html += `
      <div class="d-flex flex-row">
        <p>
          <b style="color: blue">${message.author.email}</b>
          <span style="color: brown">[ ${message.date} ]</span>
          :
          <i style="color: green">${message.text}</i>
        </p>
        <img src=${message.author.avatar} alt=${message.author.name} width="50" height="50" class="ms-3">
      </div>
    `;
    });

    document.getElementById("messages").innerHTML = html;
  }
});

socket.on("message-added", (message) => {
  let html = document.getElementById("messages").innerHTML;
  html += `
  <div class="d-flex flex-row">
    <p>
      <b style="color: blue">${message.author.email}</b>
      <span style="color: brown">[ ${message.date} ]</span>
      :
      <i style="color: green">${message.text}</i>
    </p>
    <img src=${message.author.avatar} alt=${message.author.name} width="50" height="50" class="ms-3"/>
  </div>
  `;

  document.getElementById("messages").innerHTML = html;
});
