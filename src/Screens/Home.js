import React from 'react'
import {motion} from "framer-motion"

function Home() {
  return (
    <div className='mt-5 ms-5 text'>
        <div className='mt-5 ms-5'>
        <motion.h1  className='ps-4 pt-2'
        initial={{x: "-100vw" , fontSize: "50px"}}
        animate={{x:0 ,fontSize: "70px"}}>
               Welcome to <motion.div 
               initial={{x: "-120vw" , opacity:0 , color: "black"}}
        animate={{x:50 , opacity:1100 ,color: "red"}} className='ms-5'>My Api :)</motion.div>  
            </motion.h1>
        </div>

    </div>
  )
}

export default Home