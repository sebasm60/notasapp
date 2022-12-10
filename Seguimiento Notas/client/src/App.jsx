import { Provider } from "react-redux"
import { AppRouter } from "./router"
import { BrowserRouter } from 'react-router-dom'
import { store } from "./store"

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}

export default App