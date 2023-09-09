import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { AuthContextProvider } from "./components/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

export default App;

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Header />
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
