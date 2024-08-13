import { RouterProvider } from "react-router-dom";
import router from "./utils/Routes";

// вынес раутер в отдельный файл, в контексте конкретно этого приложения такой надобности не было, но я считаю это полезной привычкой
function App() {

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  )
}

export default App
