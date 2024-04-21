import { useState,useEffect } from "react";
import Item from "./cartitem";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items,setitems]=useState([])
  const [ctotal,setctotal]=useState(null)
  const [refr,setref]=useState(true)
  const nav = useNavigate()

  useEffect(() => {
    const getitems=async()=>{
      const res= await fetch("http://localhost:5003/getcart/"+localStorage.user)
      const json=await res.json()
      setitems([...json])
      let temp=0
      for(const i of json){
        const res=await fetch("http://localhost:5002/getproduct/"+i.product)
        const jsonp=await res.json()
        temp=temp+(jsonp.price*i.quantity)
       }
       setctotal(temp)
      }
     
  getitems()  
      
  }, [refr]);
  // useEffect(() => {
  //   const calctotal= ()=>{
  //     let temp=0
  //     console.log(items.length)
  //     items.forEach((n)=>console.log(n))
      
  //     setTimeout(() => {
  //       calctotal()
  //     }, 5000);
  // }, []);
  // useEffect( () => {
  //   const calctotal=async ()=>{
  //     var temp=0
  //      items.forEach(async function(n){
  //       const res=await fetch("http://localhost:5002/getproduct/"+n.product)
  //         const json=await res.json()
  //         let tprice = await json.price*n.quantity
  //         temp+=tprice
  //         console.log("temp "+temp)
  //      })
  //      for(let i of items){
  //       const res=await fetch("http://localhost:5002/getproduct/"+i.product)
  //       const json=await res.json()
  //       temp=temp+(json.price*i.quantity)
  //      }
  //      setctotal(temp)
  //     }
    
  //   console.log('once')
  //   calctotal()
  // }, [items]);
  const checkout = async()=>{
    const user=localStorage.user
    const res = await fetch("http://localhost:5003/buy",{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({user,ctotal})
    })
    if(res.ok)
      {alert("succesfully placed order")
       nav('/order/'+localStorage.user)
      }
  }
    return (<div>

<section class="text-gray-600 body-font w-full">
  <div class="container px-5 py-2 mx-auto w-full">
    <div class="flex flex-col text-center w-full mb-5">
      <h1 class="text-2xl font-medium title-font text-gray-900 tracking-widest">YOUR CART</h1>
    </div>
    <div class="grid grid-flow-row gap-4  items-center ">
      {items.map((n)=>(

          <Item key={n.product} id={n.product} quan={n.quantity} setr={setref} r={refr}/>
      ))}
    </div>
    <div className="flex flex-wrap items-center justify-around mt-4 bg-slate-200 p-4 rounded-lg">
      <h1 className="text-black font-semibold text-2xl">Cart total - Rs {ctotal}</h1>
      <button className="bg-blue-500 p-2 text-xl rounded-lg text-white" onClick={checkout}>Checkout</button>
    </div>
  </div>
</section>
    </div>  );
}

export default Cart;