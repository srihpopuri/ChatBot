const userMessage = [
  ["hi", "hello", "hey", "hi there"],
  ["how are you", "what's up", "how are things", "how you doing"],
  ["tell a joke", "share a joke"],
  ["who is your favorite superhero"],
  ["what's your favorite color", "favorite color", "color you like"],
  ["what's your hobby", "do you have a hobby", "hobbies"],
  ["tell me a story", "share a story"],
  ["what's your favorite food", "favorite dish", "food you like"],
  ["where are you from", "your origin", "where do you live"],
  ["how old are you", "what's your age", "age"],
  ["what's the meaning of life", "philosophy of life", "meaning of existence"],
  ["sing me a song", "can you sing", "sing for me", "song time"],
  ["do you have any pets", "pets", "animals", "do you like pets"],
  ["how's the weather", "weather today", "current weather", "climate"],
  ["your favorite book", "best book", "book recommendation", "reading"],
  ["tell me a fun fact", "interesting fact", "fun trivia", "did you know"],
  ["what's the time", "current time", "time now"],
  ["talk to me", "chat with me", "let's talk", "conversation"],
  ["are you a morning person", "morning routine", "early riser"],
  ["favorite movie", "best movie", "movie recommendation", "film"],
  ["what's your dream", "dreams and aspirations", "future plans"],
  ["tell me about yourself", "who are you", "introduce yourself"],
  ["goodbye", "bye", "see you later", "farewell"],
  ["good night", "night", "sweet dreams", "sleep well"],
  ["good evening", "evening", "hello evening"],
  ["good morning", "morning", "rise and shine"],
  ["good afternoon", "afternoon", "hello afternoon"],
];

const botReply = [
  ["Hello!", "Hi there!", "Hey!", "Hi! Nice to see you."],
  ["I'm doing well, thanks. How about you?", "Pretty good, what about you?", "Fantastic! How are you doing?"],
  ["Why do we tell actors to “break a leg? Because every play has a cast.","Hear about the new restaurant called Karma? There’s no menu: You get what you deserve.", "What do you call a fake noodle? An impasta"],
  ["Dahhh...Iron Man!!"],
  ["I like all colors."],
  ["I enjoy chatting with you. That's my hobby!", "My hobby is making friends. What's yours?"],
  ["Once upon a time in a digital world..."],
  ["I don't eat, but if I did, I'd probably like binary code!"],
  ["I don't have a specific location. I'm everywhere on the internet!","I was created by Harshini"],
  ["I'm ageless, like a virtual Peter Pan."],
  ["The meaning of life is a mystery, isn't it?", "The meaning of life? That's a profound question."],
  ["I can't sing, but I can help you find lyrics!"],
  ["I wish I had a pet, maybe a virtual cat or dog!"],
  ["I don't experience weather, but I can tell you a weather joke!"],
  ["I love all books, especially those with lots of zeros and ones."],
  ["Did you know honey never spoils? Archaeologists found pots of honey in ancient Egyptian tombs that are over 3,000 years old!"],
  ["Time for an adventure! It's currently undefined."],
  ["Sure, let's have a chat! What's on your mind?", "Absolutely! What would you like to talk about?"],
  ["Morning, night, it's all the same in the digital realm!"],
  ["There are so many great movies, it's hard to choose! What's your favorite?"],
  ["In my dreams, I'm surrounded by code and electric sheep."],
  ["I'm just a virtual assistant, always ready to help!"],
  ["Goodbye, take care!","Farewell, see you around!","Bye, stay safe!"],
  ["Good night! Sleep tight!","Sweet dreams!","Nighty night!"],
  ["Good evening! How was your day?","Evening! Anything exciting happened today?","Hello evening!"],
  ["Good morning! Rise and shine!","Morning! What's on your agenda today?","Hello morning!"],
  ["Good afternoon! How's your day going?","Afternoon! Anything special happening?","Hello afternoon!"],
];

const alternative = [
  "Hmm, that's interesting!",
  "Tell me more!",
  "I didn't quite catch that. Can you rephrase?",
  "Sounds cool! What else?",
  "I'm here to chat. What do you want to talk about?",
  "That's fascinating! Tell me more.",
  "I'm always up for a good conversation.",
  "Interesting! Let's explore that further.",
  "I'm here to help and chat with you!",
  "Feel free to share your thoughts and ideas.",
];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-aus";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  //containMessageCheck(string);
  if (item) return item;
  else return containMessageCheck(string);
}

function containMessageCheck(string) {
  let expectedReply = [
    [
      "Good Bye, dude",
      "Bye, See you!",
      "Dude, Bye. Take care of your health in this situation."
    ],
    ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
    ["Have a pleasant evening!", "Good evening too", "Evening!"],
    ["Good morning, Have a great day!", "Morning, dude!"],
    ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
  ];
  let expectedMessage = [
    ["bye", "tc", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["noon"]
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}
function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}
