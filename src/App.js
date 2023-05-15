import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IndexContainer from './containers/IndexContainer';
import LoginContainer from './containers/LoginContainer';
import RegistroContainer from './containers/RegistroContainer';
import ModulosContainer from './containers/ModulosContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexContainer/>}/>
        <Route path='/Login' element={<LoginContainer/>}/>
        <Route path='/Registro' element={<RegistroContainer/>}/>
        <Route path='/Modulos' element={<ModulosContainer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
