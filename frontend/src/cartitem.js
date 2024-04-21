import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Item(props) {
  const [prod,setprod]=useState({})
  const loc = useLocation()
  useEffect(() => {
    const getprod=async ()=>{
      const res=await fetch("http://localhost:5002/getproduct/"+props.id)
      const json = await res.json()
      setprod(json)
    }
    getprod()
  }, []);
  const removeitem=async()=>{
    const user = localStorage.user
    const id=props.id
      const res = await fetch("http://localhost:5003/delcart",{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({user,id})
      })
      if(res.ok)
      {
         alert("item removed")
         props.setr(!props.r)
      }
  }
    return ( 
        <div className="flex items-center justify-center ">
        <div class="p-4 w-[75%] rounded-lg shadow-xl hover:scale-[1.1] bg-white">
        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left w-full">
          <img alt="team" class="flex-shrink-0 rounded-lg h-24 aspect-[1] object-cover object-center sm:mb-0 mb-4" src={prod.imgsrc}/>
          <div class="w-full sm:pl-8">
            <h2 class="title-font font-medium text-lg text-gray-900">{prod.name}</h2>
            <h3 class="text-black font-medium text-md mb-3">Rs {prod.price}  &nbsp;   x{props.quan}</h3>
            {/* <p class="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporwareDIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporwareDIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporwareDIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p> */}
           <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-900 ">Item price : Rs {prod.price*props.quan}</span>
           {loc.pathname.startsWith('/order')?null: <button onClick={removeitem} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>}
        </div>
          </div>
        </div>
      </div>
      </div>
     );
}

export default Item;