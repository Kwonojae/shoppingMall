import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      //콜백함수로 전달받는 유저를 세팅
      console.log(user);
      setUser(user);
    });
    //로그인 사용자 세션이 남아있거나 로그인했거나 정상적인 유효한 객체가 전달되고 상태를 업데이트 해줌
    //로그아웃 하면 null 전달될거임
    //마운트시 onUserStateChange 함수가 setUser의 firebase.js로 로그인상태를 전달하고
    //firebase.js onUserStateChange에서 인자로받고 콜백함수가 실행되고 사용자의 상태가 변경될때마다 옵저빙해서 사용자의 상태를콜백해준다
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
