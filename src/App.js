
import './App.css';
import MainArea from './MainArea';

function App() {
  if(localStorage.getItem("notelist")==undefined){
    localStorage.setItem("notelist","[]");
  }
  
  return (
    <div className="container mt-5">
      <MainArea/>
    </div>
  );
}

export default App;
