import { createContext, useState } from "react";
export const UserInfoContext = createContext();
export default function UserInfoContextProvider({ children }) {
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    userNumberPhone: "",
    userEmail: "",
    userPassword: "",
    role: "",
  });
  return (
    <UserInfoContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserInfoContext.Provider>
  );
}
