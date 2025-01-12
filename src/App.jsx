import './App.css'
import Navbar from './components/Navbar'
import Todo from './components/Todo'
import { useState } from 'react';
import {themeContext} from './context/context'

function App() {
  const [theme, setTheme] = useState("light");
      const thememode =()=>{
          if(theme==='light'){
              setTheme('dark');
              document.body.style.backgroundColor = "#161616";
              document.body.style.color = "white";
          }else{
            setTheme('light');
            document.body.style.backgroundColor = "white";
            document.body.style.color = "#161616";
          }
      }
  return (
    <>
    <themeContext.Provider value={theme}>
<Navbar title="Todo List" thememode={thememode} theme={theme}/>
<Todo theme={theme} id="date1"/>
</themeContext.Provider>
    </>
  )
}

export default App
