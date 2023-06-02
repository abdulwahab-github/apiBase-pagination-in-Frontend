import React, { useState } from "react";
import { Post, Put } from "../Config/apibasemethod";
import { useLocation, useNavigate } from "react-router-dom";

function Addcourse() {
    const [model, setmodel] = useState({});
  const navigate = useNavigate("");
  const location = useLocation("");
  // console.log(location.state);
  const data = location.state;
  const add = (e) => {
    console.log(model);
    console.log("data?._id", data?._id);
    if(data?._id){

   
    try {
      Put("course", data?._id, model).then((res) => {
        console.log("resolve", res);
        navigate("/showcourse");

      });
    } catch (e) {
      console.log(e);
    }
    
}else{ Post("course", model)
        .then((res) => {
          console.log(res);
          navigate("/showcourse");
        })
        .catch((err) => {
          console.log(err);
        });}
    }
  return (
    <div>
      <div className="container sign">
        <div className=" row ">
          <div className="col-lg-12 md-12 col-sm-12 mt-4">
            <div className="side mx-auto ">
              <div className="mb-3">
                <h4>Course Name :</h4>
                <input
                  type="text"
                  // devalue={location.state?.firstName || ""}
                  defaultValue={location.state?.name || ""}
                  onChange={(e) =>
                    setmodel({ ...model, name: e.target.value })
                  }
                  placeholder="Course Name "
                  className=" form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <h4>Duration :</h4>
                <input
                defaultValue={location.state?.duration || ""}
                  type="text"
                  onChange={(e) =>
                    setmodel({ ...model, duration: e.target.value })
                  }
                  className="form-control"
                  placeholder="Duration"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <h4>Fees :</h4>
                <input
                  defaultValue={location.state?.fees || ""}

                  type="text"
                  onChange={(e) =>
                    setmodel({ ...model, fees: e.target.value })
                  }
                  placeholder="Fees "
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <h4>Short Name :</h4>
                <input
                  defaultValue={location.state?.shortname || ""}

                  type="text"
                  onChange={(e) =>
                    setmodel({ ...model, shortname: e.target.value })
                  }
                  placeholder="Password  "
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              

              <button
              
                onClick={add}
                type="submit"
                className="btn btn1 px-5 mt-5  btn-primary">
                {data?._id ? "Edit" :"Save" }
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addcourse