import {BrowserRouter, Routes, Route} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";

function App(){

return(
 
<BrowserRouter>

    <Routes>

        <Route
        path="/register"
        element={<Register/>}
        />

         <Route
        path="/login"
        element={<Login/>}
        />

         <Route
        path="/users"
        element={<Users/>}
        />


    </Routes>
    
    
    </BrowserRouter>

)

}

export default App;