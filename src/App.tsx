import { RouterProvider } from "react-router-dom";
import router from "./utils/Routes";

function App() {

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  )
}

export default App
