import { useEffect, useState } from "react"


function App() {
  const [loadedData, setLoadedData] = useState([])

  async function fetchData () {
    const response = await fetch("https://localhost:7147/api/Clubs");
    const data = await response.json();
    console.log(data);
  }

  useEffect(()=>{
    fetchData();
  }, [])


  return (
    <>
      <div>Aperta web app</div>
    </>
  )
}

export default App
