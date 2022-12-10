import App from "./App"
import React from "react"
import ReactDOM from "react-dom/client"

import './index.css'
import { ThemeProvider } from "@material-tailwind/react"


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
)