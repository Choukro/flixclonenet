import * as React from "react";
import { LoginRegister } from "../../components/LoginRegister";
import Image from "next/image";

function UnauthApp() {
  const imageUrl = "/assets/posters.jpg";
  return (
    <div
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: "cover",

        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: "auto",
      }}
    >
      <Image
        src="/assets/netflix-logo.png"
        alt="Logo Netflix"
        style={{ margin: "30px" }}
        height={50}
        width={160}
      />

      <div>
        <LoginRegister open={true} />
      </div>
    </div>
  );
}
//export {UnauthApp}
export default UnauthApp;
//React.lazy requiert un export default
