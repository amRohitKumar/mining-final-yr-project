import { forwardRef } from "react";
import Webcam from "react-webcam";

const Camera = forwardRef((_, ref) => {
  return (
    <Webcam
      ref={ref}
      screenshotFormat="image/jpeg"
      width={600}
      height={400}
      // style={{ border: "1px solid black" }}
    />
  );
});

Camera.displayName = "Camera";

export default Camera;
