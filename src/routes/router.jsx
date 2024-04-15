import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main"
import Home from "../pages/Home"
import Logs2 from "../pages/Logs2"
import LogsLayout from "../layout/LogsLayout"
import Logs from "../pages/Logs"
import Setting from "../pages/Setting"

const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/alllogs',
                element:<Logs/>
            },
            {
                path:'/setting',
                element:<Setting/>
            }
        ]
    },
    {
        path:'/',
        element:<LogsLayout/>,
        children:[
            {
                path:"/logs",
                element:<Logs2/>
            }
        ]
    },

])

export default router