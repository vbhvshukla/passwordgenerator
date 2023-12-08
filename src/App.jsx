import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length ,setLength] = useState(8)
  const [numAllowed ,setnumAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)
  const [generatedPassword , setgeneratedPassword] = useState("")

  //useRef hook to take that password from input field
  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,9); // for range only 9 char select
    window.navigator.clipboard.writeText(generatedPassword)
  },[generatedPassword])

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*()_-~`"
    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char)
    }
    setgeneratedPassword(pass)
  },[length,numAllowed,charAllowed,setgeneratedPassword])

  useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed,setgeneratedPassword])

  return (
    <>
     
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800'>
     <h1 className="text-white font-serif text-center my-3">Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value = {generatedPassword} className='outline-none w-full py-2 px-3' placeholder='Password' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <label>Length:{length}</label>
          <input type="range" min={6} max={50} value={length} className='cursor-pointer' onChange={(e)=> setLength(e.target.value)} />
        </div>
      </div>
      
      
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() => {
              setnumAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      
      
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setcharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
     
     
     </div>
    </>
  )
}

export default App
