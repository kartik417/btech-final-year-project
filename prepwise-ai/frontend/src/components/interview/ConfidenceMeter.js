function ConfidenceMeter({ confidence }) {

  return (

    <div className="confidence-box">

      <p>Confidence</p>

      <div className="confidence-bar">

        <div
          className="confidence-fill"
          style={{
            width: `${confidence}%`
          }}
        />

      </div>

      <span>{confidence}%</span>

    </div>
  );
}

export default ConfidenceMeter;