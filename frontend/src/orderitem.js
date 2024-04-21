import { formatDistanceToNow, formatRelative } from 'date-fns'
import Item from './cartitem';
import { useState } from 'react';
function Singleorder(props) {
    const [item,setitems]=useState(false)
    const test=()=>{
        setitems(!item)
    }
    return ( 
        <div className="flex justify-center items-center mb-4 ">
        <div class="w-[65%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex flex-wrap justify-between'>
        <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{formatRelative(new Date(props.data.createdAt), new Date(), { addSuffix: true })}</h5>
        <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Order Total : Rs {props.data.total}</h5>
        </div>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(props.data.createdAt), { addSuffix: true })}</p>
        {item ?<div class="grid grid-flow-row gap-4  items-center  " onClick={test}>{props.data.products.map((t) => (
                    <Item key={t.product} id={t.product} quan={t.quantity}></Item> 
                ))}</div>:<button onClick={test} class="text-white bg-red-700 hover:bg-red-800  focus:ring-red-300 font-medium rounded-lg p-2 text-center dark:bg-red-600 dark:hover:bg-red-700">Show items</button>}
        
        </div>
        </div>
     );
}

export default Singleorder;