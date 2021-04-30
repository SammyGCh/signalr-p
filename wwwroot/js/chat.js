"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var connectionId = $("#senderUId").text();
    console.log(connectionId);
    var nombreGrupo = document.getElementById("nombreGrupo").value;
    connection.invoke("SendMessageToGroup", nombreGrupo, user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


document.getElementById("joinGroup").addEventListener("click", function (event) {
    var nombreGrupo = document.getElementById("nombreGrupo").value;
    var user = document.getElementById("userInput").value;
    connection.invoke("JoinGroup", nombreGrupo, user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});