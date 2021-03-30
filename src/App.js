import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Calendar from "./components/Calendar";

function App() {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
}

export default App;
