/* JS comes here */
function runSpeechRecognition () {
  // get output div reference
  const output = document.getElementById('output')
  // get action element reference
  const action = document.getElementById('action')
  // new speech recognition object
  const SpeechRecognition = webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    action.innerHTML = '<small>listening, please speak...</small>'
  }

  recognition.onspeechend = function () {
    action.innerHTML = '<small>stopped listening, hope you are done...</small>'
    recognition.stop()
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript
    const confidence = event.results[0][0].confidence

    const fetchConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confidence,
        transcript
      }),
      method: 'POST'
    }

    fetch('http://localhost:8080/test', fetchConfig)
      .then((response) => response.json())
      .then((data) => speak(data.data))

    output.innerHTML = '<b>Text:</b> ' + transcript + '<br/> <b>Confidence:</b> ' + confidence * 100 + '%'
    output.classList.remove('hide')
  }

  // start recognition
  recognition.start()
}

function speak (text) {
  const utterance = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(utterance)
}
