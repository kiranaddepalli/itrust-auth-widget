const styles = {
  cameraWrap: {
    border: "1px solid #d6d6d6",
    padding: "2rem 2.5rem",
    width: "530px",
    height: "580px",
    borderRadius: "30px",
    marginBottom: 20,
  },
  camera: {
    height: "355px",
    padding: "20px",
    backgroundColor: "#0b101b",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  videoElement: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  statusMessage: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "700",
  },
  uuidMessage: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "400",
    color: "#333",
  },
  progressText: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700",
    color: "#333",
  },
};

export default styles;
