const input = document.getElementById('input');
const speakBtn = document.getElementById('speak');
const voiceSelect = document.getElementById('voice');
const volumeSlider = document.getElementById('volume');

const synth = window.speechSynthesis;
let volume = 1;

function loadVoices() {
  let voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    let option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
  });
}

function speakText() {
  const text = input.value.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = synth.getVoices().find(v => v.name === voiceSelect.value) || synth.getVoices()[0];
  utterance.voice = voice;
  utterance.volume = volume;
  synth.speak(utterance);
}

speakBtn.addEventListener('click', speakText);
volumeSlider.addEventListener('input', () => volume = volumeSlider.value);

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = loadVoices;
}

loadVoices();
