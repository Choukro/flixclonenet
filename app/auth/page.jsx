import * as React from "react";
import { LoginRegister } from "../../components/LoginRegister";
import Image from "next/image";

function UnauthApp() {
  const imageUrl = "/assets/posters.jpg";
  return (
    <>
      <div
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          display: "block",
          position: "absolute",
          // top: 0,
          // left: 0,
          // bottom: 0,
          // right: 0,
          height: "100%",
          minHeight: "100vh",
          width: "100%",
          overflow: "auto",
          zIndex: -1,
          opacity: 0.5,
        }}
      ></div>
      <div className="login-header">
        <Image
          src="/assets/netflix-logo.svg"
          alt="Logo Netflix"
          style={{ margin: "30px" }}
          height={50}
          width={160}
        />
      </div>
      <LoginRegister open={true} />
    </>
  );
}
//export {UnauthApp}
export default UnauthApp;
//React.lazy requiert un export default
