import React, { useState } from "react";
import { Post, Put } from "../Config/apibasemethod";
import { useLocation, useNavigate } from "react-router-dom";

function Add() {
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
      Put("student", data?._id, model).then((res) => {
        console.log("resolve", res);
        navigate("/showstudent");

      });
    } catch (e) {
      console.log(e);
    }
    
}else{ Post("student", model)
        .then((res) => {
          console.log(res);
          navigate("/showstudent");
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
                <h4>First Name :</h4>
                <input
                  type="text"
                  // devalue={location.state?.firstName || ""}
                  defaultValue={location.state?.firstName || ""}
                  onChange={(e) =>
                    setmodel({ ...model, firstName: e.target.value })
                  }
                  placeholder="first Name "
                  className=" form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <h4>Last Name :</h4>
                <input
                defaultValue={location.state?.lastName || ""}
                  type="text"
                  onChange={(e) =>
                    setmodel({ ...model, lastName: e.target.value })
                  }
                  className="form-control"
                  placeholder="Last Name "
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <h4>Email :</h4>
                <input
                  defaultValue={location.state?.email || ""}

                  type="text"
                  onChange={(e) =>
                    setmodel({ ...model, email: e.target.value })
                  }
                  placeholder="Email "
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <h4>Password :</h4>
                <input
                  defaultValue={location.state?.password || ""}

                  type="text"
                  onChange={(e) =>
                    setmodel({ ...model, password: e.target.value })
                  }
                  placeholder="Password  "
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <h4 className="mt-2">Contact</h4>
              <input
                  defaultValue={location.state?.contact || ""}

                type="text"
                onChange={(e) =>
                  setmodel({ ...model, contact: e.target.value })
                }
                placeholder="Contact  "
                className="form-control"
                id="exampleInputPassword1"
              />

              <button
                onClick={add}
                type="submit"
                className="btn btn1 px-5 mt-5  btn-primary"
              >
                                {data?._id ? "Edit" : "Save"}

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
