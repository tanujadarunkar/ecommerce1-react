import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Project Ecomm/Components/Home'
import Cart from './Project Ecomm/Components/Cart'
import Navbar from './Project Ecomm/Components/Navbar'
import About from './Project Ecomm/Components/About'
import Data from './Project Ecomm/Data'
import { useState } from 'react'

const App = () => {
    const[search,setSearch]=useState("")
    const[cart,setCart]=useState([])
    const[data,setData]=useState(Data)

    function handleClick(item){
      setCart([...cart,item])
    }
  return (
    <div className='nav'>
        <BrowserRouter>
        <Navbar setSearch={setSearch} data={data} setData={setData} size={cart.length}/>
        <Routes>
            <Route path='/' element={<Home search={search} data={data} handleClick={handleClick}/>}/>
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>}/>
            <Route path='/about/:aboutId' data={data} element={<About Data={Data}/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App