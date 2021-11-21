/* JS comes here */
function runSpeechRecognition () {
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
    const frequency = document.getElementById('frequency').value
    const callSign = document.getElementById('callSign').value
    const shortenedCallSign = document.getElementById('shortenedCallSign').value
    const aircraftManufacturer = document.getElementById('aircraftManufacturer').value
    const aircraftType = document.getElementById('aircraftType').value

    const fetchConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confidence,
        transcript,
        callSign,
        frequency,
        aircraftType,
        shortenedCallSign,
        aircraftManufacturer
      }),
      method: 'POST'
    }

    fetch('http://localhost:8080/test', fetchConfig)
      .then((response) => response.json())
      .then((data) => {
        speak(data.message)
        appendToConversation({ transcript: data.message, confidence: data.confidence, by: data.name })
      })

    appendToConversation({ transcript, confidence: confidence * 100, by: 'Aircraft' })
  }

  // start recognition
  recognition.start()
}

function speak (text) {
  const utterance = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(utterance)
}

function appendToConversation (data) {
  const output = document.getElementById('output')
  const box = `<b>${data.by}:</b> ${data.transcript} <br/> <b>Confidence:</b> ${data.confidence}% <br/><br/>`
  output.innerHTML = output.innerHTML + box
  output.classList.remove('hide')
}
