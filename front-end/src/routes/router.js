import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isLogged } from "../helpers/AuthHandler";
import AdPage from "../pages/AdPage";

import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SingInPage from "../pages/SingInPage";
import SingUpPage from "../pages/SingUpPage";
import CreatedAdPage from "../pages/CreatedAdPage";
import AllAdsPage from "../pages/AllAdsPage";
import Footer from "../components/partials/Footer";
import MyAccountPage from "../pages/MyAccountPage";
import EditAdPage from "../pages/EditAdPage";

const Router = () => {
    const PrivateRoute = ({children}) => {
        let logged = isLogged()
        
        return (
            logged ? children : <Navigate to="/singin"/>
        )
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<HomePage/>}/>
                <Route path="/singin" element= {<SingInPage/>} />
                <Route path="/register" element= {<SingUpPage/>} />
                <Route path="/ads/:id" element={<AdPage/>}/>
                <Route path="/post-ad" element={<PrivateRoute> <CreatedAdPage/> </PrivateRoute>}/>
                <Route path="/ads" element={<AllAdsPage/>} />
                <Route path="/my-account" element={<PrivateRoute> <MyAccountPage/> </PrivateRoute>}/>
                <Route path="/my-account/edit/:id" element={ <PrivateRoute> <EditAdPage/> </PrivateRoute> }/> 
                
                <Route path="*" element= {<NotFoundPage/>}/> 
            </Routes>

            <Footer/>
        </BrowserRouter>
    )
}

export default Router;