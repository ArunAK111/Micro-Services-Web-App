import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Details() {
  const param = useParams()
  const nav = useNavigate()
  const [quan,setquan]=useState(1)
    const loc = useLocation()
    const changeval=(event)=>{
      setquan(event.target.value)
    }
    const addcart=async ()=>{
      if(localStorage.user)
       { var user = localStorage.user
        var id=param.id
        const res = await fetch("http://localhost:5003/addcart",{
          method:"POST",
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({user,id,quan})
        })
        const json = await res.json()
        if(res.ok)
         alert("added to cart")
        else
          alert(json.error)
        }
      else {
        alert("sign in")
        nav('/login')
      }
    }
    return ( <div>
    <section class="text-gray-600 body-font overflow-hidden ">
  <div class="container px-5 py-24 mx-auto ">
    <div class="lg:w-4/5 mx-auto flex flex-wrap bg-gray-100 rounded-lg p-10 ">
      <img  class="lg:w-1/2 w-full object-contain aspect-[3/2] object-center rounded" src={loc.state.details.imgsrc}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">{loc.state.details.name}</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{loc.state.details.name}</h1>
        <div class="flex mb-4">
        </div>
        <p class="leading-relaxed">{loc.state.details.desc}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div class="flex">
          </div>
          <div class="flex items-center">
          <span class="mr-3">Quantity</span>
            <div class="relative">
            <input type="number" onChange={changeval} value={quan} class="rounded w-20 border appearance-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base p-2"/>

              </div>
          </div>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">Rs. {loc.state.details.price}</span>
          <button onClick={addcart} class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</section>
    </div> );
}

export default Details;