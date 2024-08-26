import { BurgerSpin } 
  from "react-burger-icons";

import { useState } from "react";

export const App = () => {
  const [isClosed, setIsClosed] = 
    useState<boolean>(false);

  return (
    <button
      onClick={() => setIsClosed(!isClosed)}
      style={{
        width: "50px",
        height: "50px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <BurgerSpin isClosed={isClosed} />
    </button>
  );
}