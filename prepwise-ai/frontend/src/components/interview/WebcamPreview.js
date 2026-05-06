import Webcam from "react-webcam";

function WebcamPreview() {

  return (

    <div className="webcam-box">

      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
      />

    </div>
  );
}

export default WebcamPreview;