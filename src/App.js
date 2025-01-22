// import logo from './logo.svg';
// import './App.css';
// import AppRouter  from './Config/Router';
// import { useState } from 'react';
// // import MessageComponent from './Component/Chat';
// // import ChatList from './Component/ChatList';
// import LiveStreamViewer from './Component/LiveStreamViewer';
// function App() {
//   const [val ,setval] = useState('')
//   const [no ,setno] = useState(0)
//   const reciverId = localStorage.getItem('user')
//   const sendId = localStorage.getItem('user')
//   return (
//     <div className="App">
//       <button onClick={()=>{
//         setval("67502a5c09d84e81f800adab")
//         setno(1)
//         }}>Stream 1</button>
//       <button onClick={()=>{setval("674eb97ef994b7083bb4527d")
//         setno(2)}}>Stream 2</button>
    
//       {/* <Practice/> */}
//       <LiveStreamViewer streamId={val}no={no}/>


//     </div>
    
//   );
// }

// export default App;



// import React, { useState } from "react";
// import UserList from "./Component/UserList";
// import Chat from "./Component/Chat";

// const App = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const userId = localStorage.getItem("user"); // Assuming this holds the logged-in user's ID

//   return (
//     // <div style={{ display: "flex", height: "100vh" }}>
//     //   <UserList onSelectUser={setSelectedUser} />
//     //   {selectedUser && <Chat selectedUser={selectedUser} userId={userId} />}
//     // </div>
//     <UserList onSelectUser={setSelectedUser} userId={userId}/>
//   );
// };

// export default App;













// import React, { useState } from "react";
// import LiveStreamReactions from "./Component/reaction";
// import StreamComponent from "./Component/reaction";

// const App = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const userId = localStorage.getItem("user"); // Assuming this holds the logged-in user's ID

//   return (
//     // <div style={{ display: "flex", height: "100vh" }}>
//     //   <UserList onSelectUser={setSelectedUser} />
//     //   {selectedUser && <Chat selectedUser={selectedUser} userId={userId} />}
//     // </div>
//     // <LocationComponent   userId={'66fd39c96525a30d547d9fcd'}/>
//     <StreamComponent />
//   );
// };

// export default App;








// import React, { useState } from 'react';
// import SalesChart from './Component/Sales';

// const App = () => {
//     const [chartType, setChartType] = useState('monthly'); // Default chart type

//     const handleChange = (event) => {
//         setChartType(event.target.value);
//     };

//     return (
//         <div>
//             <h1>Sales Data Chart</h1>
//             <select onChange={handleChange} value={chartType}>
//                 <option value="monthly">Monthly</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="yearly">Yearly</option>
//             </select>
//             <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
//                 <SalesChart type={chartType} />
//             </div>
//         </div>
//     );
// };

// export default App;



























// import React, { useState } from 'react';
// import Page1 from './Screens/Page1';
// import Page2 from './Screens/Page2';
// import Page3 from './Screens/Page3';
// import SubmitPage from './Screens/submitPage';

// const App = () => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const nextPage = () => setCurrentPage((prev) => prev + 1);
//     const prevPage = () => setCurrentPage((prev) => prev - 1);

//     return (
//         <div>
//             {currentPage === 1 && <Page1 />}
//             {currentPage === 2 && <Page2 />}
//             {currentPage === 3 && <Page3 />}
//             {currentPage === 4 && <SubmitPage />}

//             <div>
//                 {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
//                 {currentPage < 4 && <button onClick={nextPage}>Next</button>}
//             </div>
//         </div>
//     );
// };

// export default App;





// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PaymentStatus from './Screens/testing';
// const App = () => {
    
//     const { id, amount } = useParams();
//     console.log(id, amount,"id, amount");
    
//     return (
//         <div>
//            <PaymentStatus userId="6607f19049f03b096b252516"/>
//         </div>
//     );
// };

// export default App;


// import React, { useState } from 'react';
// import Demo from './Component/Demo';
// const App = () => {
    
//     return (
//         <div>
//            <Demo userId="6607f19049f03b096b252516"/>
//         </div>
//     );
// };

// export default App;



import React, { useState } from 'react';
import RideRequest from './Component/requestRide';
import OrderRequest from './Component/OrderRequest';
const App = () => {
    
    return (
        <div>
           {/* <RideRequest  /> */}
           <OrderRequest/>
        </div>
    );
};

export default App;


