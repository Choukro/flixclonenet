import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingFullScreen() {
  return (
    <div
      style={{
        //backgroundImage: `url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundColor: "#000",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: "auto",
      }}
    >
      <div
        role="alert"
        style={{
          height: "100%",
          textAlign: "center",
          padding: "100px 300px",
          color: "#fff",
        }}
      >
        <Backdrop open={true}>
          <CircularProgress style={{ color: "#E50914" }} size={60} />
        </Backdrop>
      </div>
    </div>
  );
}

export default LoadingFullScreen;
