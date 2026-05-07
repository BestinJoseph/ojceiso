import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import _ from "lodash"

import "./index.css";
import Routers from "./Routers";
import { store } from "./store";
import { setUser } from "./features/auth/authSlice";

import swDev from './serviceWorker'

const App = () => {
    // const dispatch = useDispatch()

    // useEffect( async ()=>{
    //     const persist = localStorage.getItem('persist') || false
    //     if(persist) {
    //         const user = JSON.parse(localStorage.getItem('user'))
    //         console.log(user)
    //         dispatch(setUser(user))
    //     }
    //     console.log(persist)
    // }, [])
    swDev()
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Routers />
            </Provider>
        </React.StrictMode>
    );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)