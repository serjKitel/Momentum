import playList from './playList.js';

// TIME

function updateTime() {
  let clock = document.getElementById('clock');
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}



function clockStart() {
  let timer;
  timer = setInterval(updateTime, 1000);
  updateTime();
}


updateTime();

clockStart()

// DATE

function formatDate(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${dayOfWeek}, ${month} ${day}`;
}

// GREETING

function getTimeOfDay(hour) {
  if (hour >= 6 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else if (hour >= 18 && hour <= 24) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

function showGreeting() {
  const date = new Date();
  const hour = date.getHours();
  const greeting = getTimeOfDay(hour);
  document.getElementById("date").innerHTML = formatDate(date);
  document.getElementById("greeting").innerHTML = greeting;
}

setInterval(showGreeting, 60000);
showGreeting();

const nameInput = document.getElementById("name");
let userName = localStorage.getItem("userName") || "";

nameInput.value = userName;

nameInput.addEventListener("input", (event) => {
  userName = event.target.value;
  localStorage.setItem("userName", userName);
  updateGreetingName();
});

function updateGreetingName() {
  const name = userName ? userName : "";
  const greetingName = document.getElementById("name");
  greetingName.textContent = `${name}!`;
}

updateGreetingName();


// SLIDER

function changeBackgroundImage() {
  const timesOfDay = ['morning', 'afternoon', 'evening', 'night'];
  const currentHour = new Date().getHours();
  let timeOfDay;
  if (currentHour >= 6 && currentHour < 12) {
    timeOfDay = timesOfDay[0];
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = timesOfDay[1];
  } else if (currentHour >= 18 && currentHour < 24) {
    timeOfDay = timesOfDay[2];
  } else {
    timeOfDay = timesOfDay[3];
  }

  const imageUrls = [];
  for (let i = 1; i <= 20; i++) {
    const imageUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${i.toString().padStart(2, '0')}.jpg`;
    const img = new Image();
    img.src = imageUrl;
    imageUrls.push(img);
  }

  let currentImageNumber = Math.floor(Math.random() * 20);


  function getSlideNext() {
    currentImageNumber++;
    if (currentImageNumber >= imageUrls.length) {
      currentImageNumber = 0;
    }
    document.body.style.backgroundImage = `url(${imageUrls[currentImageNumber].src})`;
  }

  function getSlidePrev() {
    currentImageNumber--;
    if (currentImageNumber < 0) {
      currentImageNumber = imageUrls.length - 1;
    }
    document.body.style.backgroundImage = `url(${imageUrls[currentImageNumber].src})`;
  }

  document.getElementById('arrow-left').addEventListener('click', getSlidePrev);
  document.getElementById('arrow-right').addEventListener('click', getSlideNext);


  document.body.style.backgroundImage = `url(${imageUrls[currentImageNumber].src})`;
}


document.body.style.transition = 'background-image 0.5s ease-in-out';


window.addEventListener('load', changeBackgroundImage);





// WEATHER

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');


async function getWeather() {
  const cityValue = city.textContent.trim();
  if (!cityValue) {
    alert('Please enter a valid city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=5617b51c3d7a0f9375e19d54566ed55f&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
    alert('Please enter a valid city name');
    return;
  }

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp.toFixed(0))}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;

  localStorage.setItem('city', cityValue);
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedCity = localStorage.getItem('city');
  if (savedCity) {
    city.textContent = savedCity;
  }
  getWeather();
});
city.addEventListener('keypress', setCity);



// QUOTES 


const quotes = "./data.json";

const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
const changeBtn = document.querySelector('.change-quote');

async function getQuotes() {
  const res = await fetch('data.json');
  const data = await res.json();
  return data;
}

function getRandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

async function init() {
  const quotes = await getQuotes();
  let currentQuote = getRandomQuote(quotes);
  quoteText.textContent = `"${currentQuote.text}"`;
  authorText.textContent = currentQuote.author;

  changeBtn.addEventListener('click', () => {
    let newQuote = getRandomQuote(quotes);
    while (newQuote === currentQuote) {
      newQuote = getRandomQuote(quotes);
    }
    currentQuote = newQuote;
    quoteText.textContent = `"${currentQuote.text}"`;
    authorText.textContent = currentQuote.author;
  });
}

init();




// PLAYER


const audio = new Audio();
const prevButton = document.querySelector('.play-prev');
const pauseButton = document.querySelector('.play-pause');
const nextButton = document.querySelector('.play-next');

let currentTrackIndex = 0;
let isPlaying = false;

function playTrack() {
  const prevTrack = document.querySelector('.play-list .current');
  if (prevTrack) {
    prevTrack.classList.remove('current');
  }

  audio.src = playList[currentTrackIndex].src;
  audio.play();
  isPlaying = true;
  pauseButton.classList.add('pause');

  const currentTrack = document.querySelectorAll('.play-list li')[currentTrackIndex];
  currentTrack.classList.add('current');
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  pauseButton.classList.remove('pause');
}

function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % playList.length;
  playTrack();
}

function playPrev() {
  currentTrackIndex = (currentTrackIndex - 1 + playList.length) % playList.length;
  playTrack();
}

function toggleTrackPlay(trackIndex, playButton) {
  if (currentTrackIndex === trackIndex) {
    togglePlay();
  } else {
    currentTrackIndex = trackIndex;
    playTrack();
  }

  const playButtons = document.querySelectorAll('.play-track-button');
  for (let i = 0; i < playButtons.length; i++) {
    if (playButtons[i] !== playButton) {
      playButtons[i].classList.remove('pause');
    }
  }
}

pauseButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);

const playListElem = document.querySelector('.play-list');

for (let i = 0; i < playList.length; i++) {
  const trackName = playList[i].title;

  const liElem = document.createElement('li');
  liElem.classList.add('play-item');
  liElem.textContent = trackName;

  const playButton = document.createElement('button');
  playButton.classList.add('play-track-button', 'small-player-icon');
  playButton.addEventListener('click', () => {
    toggleTrackPlay(i, playButton);
  });

  liElem.appendChild(playButton);
  playListElem.appendChild(liElem);
}

audio.addEventListener('ended', () => {
  playNext();
});


function updatePlayButton() {
  const playButtons = document.querySelectorAll('.play-track-button');
  for (let i = 0; i < playButtons.length; i++) {
    if (i === currentTrackIndex) {
      if (isPlaying) {
        playButtons[i].classList.add('small-player-pause');
      } else {
        playButtons[i].classList.remove('small-player-pause');
      }
    } else {
      playButtons[i].classList.remove('small-player-pause');
    }
  }
}

audio.addEventListener('play', () => {
  updatePlayButton();
});

audio.addEventListener('pause', () => {
  updatePlayButton();
});



// VOLUME


const volumeToggle = document.querySelector('.volume-toggle');


function toggleMute() {
  if (audio.muted) {
    audio.muted = false;
    audio.volume = volumeSlider.value / 100;
    volumeToggle.classList.remove('muted');
  } else {
    audio.muted = true;
    volumeToggle.classList.add('muted');
  }
}

volumeToggle.addEventListener('click', toggleMute);

const volumeSlider = document.querySelector('.volume-slider');
volumeSlider.addEventListener('input', adjustVolume);

function adjustVolume() {
  if (audio.muted) {
    audio.muted = false;
    volumeToggle.classList.remove('muted');
  }
  audio.volume = volumeSlider.value / 100;

  const percent = volumeSlider.value / volumeSlider.max * 100;

  volumeSlider.style.backgroundImage = `linear-gradient(to right, #fff ${percent}%, rgba(255, 255, 255, 0.333) ${percent}%)`;

  if (volumeSlider.value == 0) {
    audio.muted = true;
    volumeToggle.classList.add('muted');
  }
}


volumeSlider.addEventListener('input', adjustVolume);

// PROGRESS BAR

const progressBar = document.querySelector('.progress-bar');


function updateProgressBar() {
  const trackNameElem = document.querySelector('.track-name');
  const timeInfoElem = document.querySelector('.time-info');
  trackNameElem.textContent = playList[currentTrackIndex].title;
  timeInfoElem.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percentage + '%';
}


function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return minutes + ':' + formattedSeconds;
}




function updateCurrentTime(event) {
  const progressBar = event.currentTarget;
  const boundingRect = progressBar.getBoundingClientRect();
  const mouseX = event.clientX - boundingRect.left;
  const percentage = (mouseX / boundingRect.width) * 100;
  const duration = audio.duration;
  const currentTime = (duration * percentage) / 100;
  audio.currentTime = currentTime;
}



audio.addEventListener('timeupdate', updateProgressBar);
volumeSlider.addEventListener('input', adjustVolume);
progressBar.parentElement.addEventListener('click', updateCurrentTime);




function selfRating() {
  console.log('1. Часы и календарь +15\n2. Приветствие +10\n3. Смена фонового изображения +20\n4. Виджет погоды +15\n5. Виджет цитата дня +10\n6. Аудиоплеер +15\n7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20  \n\nСумма баллов: 105')
}

selfRating();








