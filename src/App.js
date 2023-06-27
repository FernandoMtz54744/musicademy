import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Index from './pages/Index';
import LoginContainer from './containers/LoginContainer';
import RegistroContainer from './containers/RegistroContainer';
import Modulos from './pages/Modulos'
import Teoria from './pages/Teoria'
import PerfilContainer from './containers/PerfilContainer';
import Practicas from './pages/Practicas'
import Evaluaciones from './pages/Evaluaciones'
import Minijuegos from './pages/Minijuegos'
import Ritmo from './pages/Practicas/Ritmo';
import Armonia from './pages/Practicas/Armonia';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/Login' element={<LoginContainer/>}/>
        <Route path='/Registro' element={<RegistroContainer/>}/>
        <Route path='/Perfil' element={<PerfilContainer/>}/>
        <Route path='/Modulos' element={<Modulos/>}/>
        <Route path='/Teoria' element={<Teoria/>}/>
        <Route path='/Practicas' element={<Practicas/>}/>
        <Route path='/Evaluaciones' element={<Evaluaciones/>}/>
        <Route path='/Minijuegos' element={<Minijuegos/>}/>
        {/* Practicas */}
        <Route path='/Practicas/Ritmo' element={<Ritmo/>} />
        <Route path='/Practicas/Armonia' element={<Armonia/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
