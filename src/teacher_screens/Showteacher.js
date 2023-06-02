import React , {useState , useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button  , Box} from '@mui/material';
import { Get ,Delete } from '../Config/apibasemethod';
import Loader from '../Component/Loader';
import Pagination from '../Config/Pagination';

function Showteacher() {
    const [data, setdata] = useState([]);
    const [currentpage , setcurrentpage] = useState(1)
    const [postperpge , setpostperpge] = useState(2)
    const [loading, setloading] = useState(true);
    const navigate = useNavigate("")
    let getdata = () => {
      Get("/teacher")
        .then((res) => {
          setdata(res.data.data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        setloading(false);

        });
    };
    useEffect(() => {
      getdata();
    }, []);
    const handleDeleteUser = (e) => {
      Delete("teacher",e)
        .then((res) => {
          console.log("User deleted:", res.data);
          const updatedData = data.filter((user) => user._id !== e);
        setdata(updatedData);
          // Remove the deleted user from the state
        })
        .catch((err) => {
          console.log(err);
        });
    };
  const edit = (e) => {
      navigate("/addteacher",{
        state:e,
      })}  
      const indexoflastpost = currentpage * postperpge;
      const indexofFirstpost = indexoflastpost - postperpge;
      const currentpost = data.slice(indexofFirstpost,indexoflastpost);
      const paginate =(pageNumber)=>setcurrentpage(pageNumber);
        

      return (
        <div>
          <Button className="bg-dark text-light mt-5" onClick={()=>navigate("/addteacher")} >Add Teacher   </Button>
          <br/>
         {loading ? (
            <Box
              sx={{
                marginLeft: "50vh",
                marginTop: "30vh",
              }}
            >
              <Loader/>
            </Box>
          ) : currentpost.map((x, i) => (
            <div key={i} className="rounded shadow dark mb-5 ms-5  p-4 txt ">
              <h1 key={i}>
                <span className="text-danger"> Teacher name: </span>
                {x.name}
              </h1>
              <h1 key={i}>
                <span className="text-danger"> Course Teacher: </span>
                {x.cource}
              </h1>
              <h1 key={i}>
                <span className="text-danger"> Teacher Contact: </span>
                 {x.contact}
              </h1>
              
              <Button className="text-light bg-success mt-5" onClick={() => edit(x, i)}>
                Edit
              </Button>
              <Button
                className=" mt-5 text-light ms-5 bg-danger"
                onClick={() => handleDeleteUser(x._id)}
              >
                Delete
              </Button>
            </div>
          ))}
          
          <Pagination perpge={postperpge} total={data.length} paginate={paginate}/>
        </div>
      )
 }

export default Showteacher