import { useRef, useState } from "react";
import axios from "axios";

function VoiceRecorder() {

  const [text, setText] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!recognitionRef.current) {

    recognitionRef.current =
      new SpeechRecognition();

    recognitionRef.current.continuous = true;

    recognitionRef.current.interimResults = true;

    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {

      let transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0].transcript + " ";
      }

      setText(transcript);
    };
  }

  const startListening = () => {

    setText("");

    recognitionRef.current.start();
  };

  const stopListening = async () => {

    recognitionRef.current.stop();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/interview/analyze",
        {
          answer: text
        }
      );

      setAnalysis(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="voice-box">

      <textarea
        value={text}
        readOnly
        rows="10"
      />

      <div className="voice-actions">

        <button onClick={startListening}>
          🎤 Start
        </button>

        <button onClick={stopListening}>
          ⏹ Stop & Analyze
        </button>

      </div>

      {loading && (
        <p>Analyzing answer...</p>
      )}

      {analysis && (

        <div className="analysis-box">

          <div className="analysis-card">
            <h4>Confidence</h4>
            <p>{analysis.confidence}%</p>
          </div>

          <div className="analysis-card">
            <h4>Grammar</h4>
            <p>{analysis.grammar}</p>
          </div>

          <div className="analysis-card">
            <h4>Speaking Speed</h4>
            <p>{analysis.speakingSpeed}</p>
          </div>

          <div className="analysis-card">
            <h4>Filler Words</h4>
            <p>{analysis.fillerWords}</p>
          </div>

          <div className="analysis-card">
            <h4>Keywords</h4>
            <p>
              {analysis.keywords.join(", ")}
            </p>
          </div>

        </div>

      )}

    </div>
  );
}

export default VoiceRecorder;