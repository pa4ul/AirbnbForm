import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "antd";
import "../styles/SignaturePad.css";

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef(null);

  const clear = () => sigCanvas.current.clear();
  const save = () => {
    if (sigCanvas.current) {
      onSave(sigCanvas.current.toDataURL());
    }
  };

  return (
    <div className="signature-pad-container">
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: "signature-canvas" }}
      />
      <div className="signature-pad-buttons">
        <Button onClick={clear} style={{ marginRight: "10px" }}>
          Clear
        </Button>
        <Button onClick={save} type="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
