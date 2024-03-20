import { useCallback, useEffect, useRef, useState } from "react"


function App() {
const [length,setLenght]=useState(6);
const [password,setPassword]=useState("");
const [NumberAllowed,setNumberallowed]=useState(false);
const [CharAllowed,setCharallowed]=useState(false);

const generatedpassword=useCallback(()=>{
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(NumberAllowed) str+="0123456789";
  if(CharAllowed) str+="~`@#$%^&*(){}[]";
  let password="";
  for(let i=1;i<=length;i++){
    let index=Math.floor(Math.random()*(str.length)+1);
    password+=str[index];
  }
  return password;
},[length,NumberAllowed,CharAllowed,setPassword]);

useEffect(()=>{
setPassword(generatedpassword)
},[length,NumberAllowed,CharAllowed])

const PasswordRef=useRef(null);
const CopyPassword=useCallback(()=>{
PasswordRef.current?.select()
password.current?.setSelectionRange(0,length);
window.navigator.clipboard.writeText(password);

},[password])

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-yellow-500">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          className="p-2 w-full" 
          type="text" 
          placeholder="Password"
          value={password} 
          readOnly
          ref={PasswordRef}
            />

          <button 
          className="bg-blue-500 p-2 cursor-pointer shrink-0 text-white"
          onClick={CopyPassword}
          >
            Copy</button>
        </div>

        {/* length, number, Charature */}
        <div className="flex flex-wrap text-lg text-yellow-500 flex-row justify-center w-full">
          <input type="range" min={6} max={20} value={length} className="flex flex-wrap range me-2 accent-yellow-500 "  onChange={(e)=>setLenght(e.target.value)} />
          <label >Lenght : {length}</label>

           {/* Number Allowed or not  */}
          <input type="checkbox" className="flex flex-wrap ms-6 mx-2" defaultChecked={NumberAllowed} value={NumberAllowed} onChange={()=>{
            setNumberallowed((prev)=>!prev)
          }}/>
          <label >Number</label>

          {/* Charature Allowed or not */}
          <input type="checkbox" className="flex flex-wrap ms-6 mx-2" defaultChecked={CharAllowed} value={CharAllowed} onChange={()=>{
            setCharallowed((prev)=>!prev)
          }} />
          <label >Characture</label>
        </div>
      </div>
    </>
  )
}

export default App
