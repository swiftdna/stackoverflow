import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import Main from './components/Main';

const store = configureStore();

function App() {
  return (
    //Use BrowserRouter to route to different pages
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}


export default App;
