import { createContext, useState } from "react";

export const myContext = createContext(null);

export const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <myContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </myContext.Provider>
  );
};
