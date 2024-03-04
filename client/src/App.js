import { BrowserRouter as Router} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { Toaster } from 'react-hot-toast';




function App() {


  const [isOpen, setIsOpen] = useState(false) 

  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers());

     // Check system time to set dark or light mode
     const currentHour = new Date().getHours();
     setIsDarkMode(currentHour < 7 || currentHour >= 18); 
  }, [dispatch])

  return (
    
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
       
      <Router>
        <Toaster />
        <Navbar setIsOpen={setIsOpen}/>
       
        <AllRoutes />
        
      </Router>
    </div>
    
  );
}

export default App;
