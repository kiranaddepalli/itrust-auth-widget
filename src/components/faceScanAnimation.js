import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  FACE_ANIMATION_COMPLETED_DURATION,
  FACE_ANIMATION_DURATION,
  FACE_ANIMATION_INPROGRESS_DURATION,
} from "../constant";

const FaceAnimation = ({
  children,
  isCircle,
  isScanned,
  handleAnimationComplete,
}) => {
  const [completed, setCompleted] = useState(false);
  const styles = useSpring({
    borderRadius: isScanned ? "50%" : isCircle ? "150px" : "16px",
    border:
      !isScanned && completed ? "3px dashed #fff" : "3px solid transparent",
    maxWidth: isScanned ? "100px" : isCircle ? "284px" : "550px",
    maxHeight: isScanned ? "100px" : isCircle ? "284px" : "350px",
    config: {
      duration: isScanned
        ? FACE_ANIMATION_INPROGRESS_DURATION
        : completed
        ? FACE_ANIMATION_COMPLETED_DURATION
        : FACE_ANIMATION_DURATION,
    },
    padding: isCircle ? "5px" : "0px",
    filter: isScanned ? "blur(5px)" : "blur(0px)",
    onRest: () => {
      if (handleAnimationComplete) {
        requestAnimationFrame(() =>
          handleAnimationComplete(isScanned ? "completed" : "start")
        );
      }
    },
  });

  const borderWith = useSpring({
    width: isCircle ? "155" : "40px",
    height: isCircle ? "155" : "40px",
    borderTopLeftRadius: isCircle ? "150px" : "15px",
    opacity: completed ? "0" : "1",
    margin: completed ? "-5px" : "0px",
    config: { duration: FACE_ANIMATION_DURATION },
    zIndex: "9999999",
    onRest: () => {
      setCompleted(true);
    },
  });
  return (
    <animated.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        borderRadius: "2px",
        ...styles,
      }}
    >
      <animated.div
        style={{
          ...borderWith,
          position: "absolute",
          top: 0,
          left: 0,
          borderTop: "3px solid #fff",
          borderLeft: "3px solid #fff",
        }}
      ></animated.div>
      <animated.div
        style={{
          ...borderWith,
          position: "absolute",
          top: 0,
          right: 0,
          transform: "scaleX(-1)",
          borderLeft: "3px solid #fff",
          borderTop: "3px solid #fff",
        }}
      ></animated.div>
      <animated.div
        style={{
          ...borderWith,
          position: "absolute",
          bottom: 0,
          left: 0,
          transform: "scaleY(-1)",
          borderLeft: "3px solid #fff",
          borderTop: "3px solid #fff",
        }}
      ></animated.div>
      <animated.div
        style={{
          ...borderWith,
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: "rotate(180deg)",
          borderLeft: "3px solid #fff",
          borderTop: "3px solid #fff",
        }}
      ></animated.div>
      {children}
      {/* Your content goes here */}
    </animated.div>
  );
};

export default FaceAnimation;
