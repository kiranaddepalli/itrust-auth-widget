import { useEffect, useState, useRef } from "react";
import {
  FACE_PROGRESS_MOBILE_THRESHOLD,
  FACE_PROGRESS_DESKTOP_THRESHOLD,
  FACE_PROGRESS_MAX_PROGRESS,
} from "../constant";

const FaceScanProgress = ({
  enrollOneFaProgress,
  completedScan
}) => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef(0);
  const isMobile = window.innerWidth < 767;
  const calculateNewProgress = (initialProgress) => initialProgress + 8;
  const progressThreshold = isMobile
    ? FACE_PROGRESS_MOBILE_THRESHOLD
    : FACE_PROGRESS_DESKTOP_THRESHOLD;
  const shouldIncreaseProgress = (
    progress,
    enrollmentProgress
  ) =>
    (progress >= progressThreshold && enrollmentProgress >= 20) ||
    enrollmentProgress === 100;

  const shouldResetProgress = (enrollmentProgress) =>
    enrollmentProgress <= 20;

  const animate = () => {
    if (progress <= progressThreshold) {
      setProgress(calculateNewProgress);
      if (shouldIncreaseProgress(progress, enrollOneFaProgress)) {
        setProgress(FACE_PROGRESS_MAX_PROGRESS);
        completedScan(true);
      }
    } else {
      if (shouldResetProgress(enrollOneFaProgress)) {
        setProgress(0);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [progress, enrollOneFaProgress, animate]);

  const progressBarStyle = {
    strokeDasharray: `${progress}, 1100`,
    transition: "stroke-dasharray",
  };

  const viewBox = isMobile ? "0 0 340.9 342" : "0 0 342 339";
  const r = isMobile ? "148" : "147";
  return (
    <svg
      width={isMobile ? "342" : "345"}
      height={isMobile ? "344" : "345"}
      viewBox={viewBox}
      style={{ transform: "rotate(-90deg)" }}
    >
      {/* Progress bar */}
      <circle
        cx="175"
        cy="175"
        r={r}
        fill="none"
        stroke={enrollOneFaProgress > 0 ? "#4CAF50" : "#ffffff"}
        strokeWidth="4"
        strokeDasharray="0, 100"
        style={progressBarStyle}
      />
    </svg>
  );
};

export default FaceScanProgress;
