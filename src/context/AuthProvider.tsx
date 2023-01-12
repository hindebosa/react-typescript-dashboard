import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BackendUrl = process.env.REACT_APP_BACKEND_URL;

interface UserContextProps {
  login: ({ email, password }: { email: string; password: string }) => void;
  isAuthenticated: boolean;
}
const UserContext = createContext<UserContextProps>({
  login: ({ email, password }: { email: string; password: string }) => null,
  isAuthenticated: false,
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const [isAuthenticated, setIsauthenticated] = useState(false);
  console.log(BackendUrl);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    axios
      .post(`${BackendUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setCookies("token", res.data.token); // your token
        setCookies("name", res.data.user); // optional data

        setIsauthenticated(true);
        navigate("/Home");
        toast.error("Sucessfully Login");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Invalid Username and Password");
      });
  };

  const logout = () => {
    ["token", "name"].forEach((obj) => removeCookie(obj)); // remove data save in cookies
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      isAuthenticated,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
