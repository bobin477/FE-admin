import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"

const LayOut = () => {
    return <div>
      <Header />
        <Outlet />
      <div>footer</div>
    </div>
  }

  export default LayOut