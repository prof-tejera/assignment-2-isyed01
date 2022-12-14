import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from './context/app'
import Navigation from './components/Navigation'
import Routine from "./views/Routine";
import Activity from "./views/Activity";
import AddActivity from "./views/AddActivity";
import DocumentationView from "./views/DocumentationView";

const App = () =>
  <AppProvider>
    <Router>
      <Navigation />
      <div className='view'>
        <Routes>
          <Route path="/" element={<Routine />} />
          <Route path="/activity/:activityId" element={<Activity />} />
          <Route path="/add" element={<AddActivity />} />
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="*" element={<Routine />} />
        </Routes>
      </div>
    </Router>
  </AppProvider>

export default App;
