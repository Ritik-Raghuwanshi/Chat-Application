const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');
var audio= new Audio('notification_sound.mp3')


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//If New User Joined
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});
 // Listen for messages from the server
// If Server send MEssage and Recive it 

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}` ,'left');
})

//When USer left the Chat
socket.on('left',data=>{
    append(`${data.name}: left the Chat` ,'right');
})

//When form get Submitted server send the message

// Listen for form submission to send a message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value='';
});





