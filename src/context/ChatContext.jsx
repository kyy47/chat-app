import React, { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";
const INITIAL_STATE = {
  user: "",
  chatId: null,
};
export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const reducerChat = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER": {
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.id
              ? currentUser.uid + action.payload.id
              : action.payload.id + currentUser.uid,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispath] = useReducer(reducerChat, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispath }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
