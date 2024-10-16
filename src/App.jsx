import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

import {CitiesProvider } from "./contexts/CitiesContext";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
//import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
// import { Navigate } from "react"
import City from "./components/City";
import  Form  from "./components/Form";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";



function App() {  
  return <div>
    <AuthProvider>
    <CitiesProvider>
  <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<PageNav /> } /> */}

      <Route path="pricing" element={<Pricing /> } />
      <Route path="product" element={<Product />} />
            <Route path="app" element={
             <ProtectedRoute>  
              <AppLayout />
             </ProtectedRoute>
            } >
          <Route index element={ <Navigate to="cities"/>} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList  />} />
          <Route path="form" element={ <Form/>} />
      </Route>
      <Route path="https://anil-itagi.github.io/Worldwise_react_app/a" element={<Homepage />} />
      <Route path="*" element={<Homepage/>} />
      <Route path="login" element={<Login/>} />
    </Routes>
  </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
  </div>
}
export default App;
