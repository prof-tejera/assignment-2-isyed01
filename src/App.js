import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from './context/app'
import Navigation from './components/Navigation'
import Routine from "./views/Routine";
import AddActivity from "./views/AddActivity";
import DocumentationView from "./views/DocumentationView";
import NoRouteMatch from "./views/NoRouteMatch";

const App = () =>
  <AppProvider>
      <Router>
        <Navigation />
        <div className='view'>
          <Routes>
            <Route path="/" element={<Routine />} />
            <Route path="/add" element={<AddActivity />} />
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="*" element={<NoRouteMatch />} />
          </Routes>
        </div>
      </Router>
  </AppProvider>

export default App;
