import { UserContext } from "./UserContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserProvider = (props) => {
  const [user, setUser] = useLocalStorage("user", {
    address: "",
    accessToken: "",
  });
  const userState = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>
  );
};
