import { BrowserRouter, Route, Routes,useRoutes } from 'react-router-dom';
import { routers } from './routers';
import React from 'react';
import './App.scss'

const App: React.FC = () => {
  return useRoutes(routers)
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<AntLayout />}>
    //       <Route path='/registry' element={<RegistryForm />} />
    //       <Route path='/addform' element={<AntAddForm />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
};

export default App;