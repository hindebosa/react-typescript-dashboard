import React, {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { inflateRaw } from "zlib";

interface initialStateProps {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

interface StateContextProps {
  currentColor: string;
  currentMode: string;
  activeMenu: boolean;
  screenSize: number;
  setScreenSize: React.Dispatch<React.SetStateAction<number>>;
  handleClick: (clicked: string) => void;
  isClicked: initialStateProps;
  initialState: initialStateProps;
  setIsClicked: React.Dispatch<React.SetStateAction<initialStateProps>>;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setColor: (color: string) => void;
  themeSettings: boolean;
  setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<StateContextProps>({
  currentColor: "#03C9D7",
  currentMode: "Light",
  activeMenu: true,
  screenSize: 0,
  setScreenSize: () => {},
  handleClick: (clicked: string) => null,
  isClicked: initialState,
  initialState,
  setIsClicked: () => null,
  setActiveMenu: () => null,
  setCurrentColor: () => null,
  setCurrentMode: () => null,
  setMode: (e) => null,
  setColor: (color: string) => null,
  themeSettings: false,
  setThemeSettings: () => null,
});

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [screenSize, setScreenSize] = useState(0);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked: string) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    <AppContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStateContext = () => useContext(AppContext);
