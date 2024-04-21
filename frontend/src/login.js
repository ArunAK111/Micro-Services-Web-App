import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    useEffect(() => {
        if(localStorage.user)
            nav('/')
    }, []);
    const [user,setuser]=useState(
        {
            email:"",
            password:""
        }
    )
    const changeval=(event)=>{
        var tempname=event.target.name
        var tempvalue=event.target.value
        setuser({
            ...user,
            [tempname]:tempvalue
        })
    }
    const handlesubmit =async (event)=>{
        event.preventDefault()
        var email=user.email
        var password=user.password
        const res = await fetch('http://localhost:5001/login',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({email,password})
            })
            const json=await res.json();
            console.log(json)
            if(res.ok)
            {   
                localStorage.setItem('user',JSON.stringify(json))
                alert("successfuly Logged in")
                setuser({
                    email:"",
                    password:"",
                })
                nav(-1)
            }
            else{
                alert(json.error)
            }
    }
    return (<div>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" onChange={changeval} value={user.email} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" onChange={changeval} value={user.password}  placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">

                            </div>
                            <button type="submit" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Sign in</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/signup" class="font-medium text-red-600 hover:underline dark:text-red-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}

export default Login;