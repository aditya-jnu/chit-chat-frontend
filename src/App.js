import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import GetData from './components/GetData';
import InfoUp from './components/InfoUp.jsx';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<GetData/>}/>
          <Route path='/fileUpload' element={<InfoUp/>}></Route>
        </Route>
      </Routes> 
    </div>
  );
}
export default App;
