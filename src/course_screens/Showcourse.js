import React , {useState , useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button  , Box} from '@mui/material';
import { GetThePage ,Delete } from '../Config/apibasemethod';
import Loader from '../Component/Loader';
import Pagination from '../Config/Pagination';

function Showcourse() {
  const [data, setdata] = useState([]);
  const [nodata, setnodata] = useState("");
  const [loading, setloading] = useState(true);
  const [currentpage , setcurrentpage] = useState(1)
  const [countpage , setcountpage] = useState(1)
  const navigate = useNavigate("")
  let getdata = (e) => {
    setcountpage(e?Number(e):1)
    GetThePage("course/courses" , e?e:1 )
      .then((res) => {
        setdata(res.data);
         
        setloading(false);
        // console.l/og(e);
        if(!data){
          alert("dbdbh")
        }
    

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
    Delete("course",e)
    .then((res) => {
      
      const updatedData = data.filter((user) => user._id !== e);
      setdata(updatedData);
      // Remove the deleted user from the state
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  const edit = (e) => {
    navigate("/addcourse",{
      state:e,
    })}
    const goanotherPAge = (e)=>{
      
      getdata(e)
  setcountpage(Number(e))
  } 


    
  return (
    <div>
      <Button className="bg-dark text-light mt-5" onClick={()=>navigate("/addcourse")} >Add Courses   </Button>
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
          ) : 
      data.map((x, i) => (
        <div key={i} className="rounded shadow dark mb-5 ms-5  p-4 txt ">
          <h1 key={i}>
            <span className="text-danger"> Course name:</span>
            {x.name}
          </h1>
          <h1 key={i}>
            <span className="text-danger">Course Duration:</span>
            {x.duration}
          </h1>
          <h1 key={i}>
            <span className="text-danger"> fees:</span>
            {x.fees}
          </h1>
          <h1 className="text-success" key={i}>
            <span className="text-danger">shortname: </span>
            {x.shortname}
          </h1>
          <Button key={i} className="text-light bg-success mt-5" onClick={() => edit(x, i)}>
            Edit
          </Button>
          <Button key={i}
            className=" mt-5 text-light ms-5 bg-danger"
            onClick={() => handleDeleteUser(x._id)}
          >
            Delete
          </Button>
          
        </div>
      ))}
      <br/>
      <Button className='ms-5' 
      value="1"
      onClick={(e)=>goanotherPAge(e.target.value)} variant='contained'>1</Button>
      <Button className='ms-2' value="2" 
      onClick={(e)=>goanotherPAge(e.target.value)} variant='contained'>2</Button>
      <Button className='ms-2' value="3" 
      onClick={(e)=>goanotherPAge(e.target.value)} variant='contained'>3</Button>
      <Button className='ms-2' value="4" 
      onClick={(e)=>goanotherPAge(e.target.value)} variant='contained'>4</Button>
       <Button className='ms-2' value="4" 
      onClick={(e)=>getdata(Number(countpage)+Number(1))} variant='contained'>Next</Button>
    </div>
  );
}

export default Showcourse


