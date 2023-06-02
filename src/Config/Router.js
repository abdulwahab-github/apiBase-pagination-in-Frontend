import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Show from "../students_screens/Show";
import Add from "../students_screens/Add";
import Teacher from "../teacher_screens/Addteacher";
import Navbar from "../Component/Navbar";
import Showcourse from "../course_screens/Showcourse";
import Addcourse from "../course_screens/Addcourse";
import Addinstitute from "../institute_screens/Addinstitute";
import Showinstitute from "../institute_screens/Showinstitute";
import Showteacher from "../teacher_screens/Showteacher";
import Home from "../Screens/Home";

function AppRouter() {
  return (
    <>
  
      <BrowserRouter>
          <Navbar/>
      
        <Routes>
        <Route path="/" element={<Home/>} />         
          <Route path="showstudent" element={<Show/>} />         
          <Route path="add" element={<Add/>} />         
          <Route path="addteacher" element={<Teacher/>} />         
          <Route path="showteacher" element={<Showteacher/>} />         
          <Route path="addinstitute" element={<Addinstitute/>} />   
          <Route path="showinstitute" element={<Showinstitute/>} /> 
           <Route path="showcourse" element={<Showcourse/>} />         
          <Route path="addcourse" element={<Addcourse/>} />         
         </Routes>
  </BrowserRouter>


    </>
  )
}

export default AppRouter;
