import axios from "axios";
import React, { useState } from "react";

function Practice() {
  const [txt, settext] = useState("");

  const handleSubmit = async (e) => {
     console.log(e,"alalalla");
     
    const form = new FormData();
    form.append("search", e);

     

    try {
      const response = await axios.post(
        "http://localhost:3000/search/seller",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicHVycG9zZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJsYXN0bmFtZSI6ImluaXQiLCJmaXJzdG5hbWUiOiJpbml0IiwiYmkiOiJpbml0IiwiY3JlYXRpdmVuYW1lIjoiaW5pdCIsImdlbmRlciI6ImluaXQiLCJpbWFnZSI6ImluaXQiLCJPdHAiOiJpbml0IiwiaXNWZXJpZmllZCI6ImluaXQiLCJpdGVtVG9TZWxsIjoiaW5pdCIsIlRvcFNlbGxlcnNDYXQiOiJpbml0IiwiTW9udGhseUVhcm5pbmciOiJpbml0IiwiaXNTZWxsaW5nRWxzZSI6ImluaXQiLCJTb2NpYWxNZWRpYSI6ImluaXQiLCJmb2xsb3dlcnMiOiJpbml0IiwiZm9sbG93aW5ncyI6ImluaXQiLCJjdXJyZW5jeSI6ImluaXQiLCJiYWxhbmNlIjoiaW5pdCIsInR3b19mYWN0b3JBdXRoIjoiaW5pdCIsImRldmljZXMiOiJpbml0Iiwid2hvQ2FuTXNnIjoiaW5pdCIsImlzQWNjVmVyaWZpZWQiOiJpbml0IiwiX2lkIjoiaW5pdCIsImV4cGlyZXNBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJmaXJzdG5hbWUiOnRydWUsImxhc3RuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImJpIjp0cnVlLCJjcmVhdGl2ZW5hbWUiOnRydWUsImdlbmRlciI6dHJ1ZSwiaW1hZ2UiOnRydWUsInB1cnBvc2UiOnRydWUsIk90cCI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZSwiaXRlbVRvU2VsbCI6dHJ1ZSwiVG9wU2VsbGVyc0NhdCI6dHJ1ZSwiTW9udGhseUVhcm5pbmciOnRydWUsImlzU2VsbGluZ0Vsc2UiOnRydWUsIlNvY2lhbE1lZGlhIjp0cnVlLCJmb2xsb3dlcnMiOnRydWUsImZvbGxvd2luZ3MiOnRydWUsImJhbGFuY2UiOnRydWUsInR3b19mYWN0b3JBdXRoIjp0cnVlLCJkZXZpY2VzIjp0cnVlLCJ3aG9DYW5Nc2ciOnRydWUsImlzQWNjVmVyaWZpZWQiOnRydWUsImV4cGlyZXNBdCI6dHJ1ZSwiX192Ijp0cnVlLCJjdXJyZW5jeSI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NmE4OThjZDRkNTgxNzI1ZGI3YjU5NzAiLCJmaXJzdG5hbWUiOiJWaW50YWdlIiwibGFzdG5hbWUiOiJUaHJpZnQgQ2xvdGhpbmciLCJlbWFpbCI6InRlc3RpbmdTZWxsZXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkR3Avb01jeVIzc1BPUC9FdWttdlRCdWgySEJDblVGYjVIRlV3alRyLnNEOXEvcXo1NWc4Qk8iLCJiaSI6IkJlc3Qgb25saW5lIHN0b3JlIHRvIHdlYXIgYmVzdCIsImNyZWF0aXZlbmFtZSI6IlZpbnRhZy5fLmUgIiwiZ2VuZGVyIjoibWFsZSIsImltYWdlIjoiMTcyMzQ2MTM3NzE2My01MzUwNjUwOTRkb3dubG9hZCAoMikuanBnIiwicHVycG9zZSI6InNlbGxlciIsIk90cCI6bnVsbCwiaXNWZXJpZmllZCI6dHJ1ZSwiaXRlbVRvU2VsbCI6WyJTbmVha2VyIiwiQ2xvdGhzIl0sIlRvcFNlbGxlcnNDYXQiOlsiTWFydmVsIFNuZWFrZXIiLCJDb3R0b24gQ2xvdGhzIl0sIk1vbnRobHlFYXJuaW5nIjoiTGVzcyB0aGVuICQxLDAwMCIsImlzU2VsbGluZ0Vsc2UiOiJNZXJjYXJpIiwiU29jaWFsTWVkaWEiOiJJbnN0YWdyYW0iLCJmb2xsb3dlcnMiOlsiNjY4NTEwMmU3OTRkM2UyZmZkYzllNjk2Il0sImZvbGxvd2luZ3MiOltdLCJiYWxhbmNlIjowLCJ0d29fZmFjdG9yQXV0aCI6ZmFsc2UsImRldmljZXMiOltdLCJ3aG9DYW5Nc2ciOjEsImlzQWNjVmVyaWZpZWQiOmZhbHNlLCJleHBpcmVzQXQiOiIyMDI0LTA3LTMwVDA3OjQ0OjU3LjI5MloiLCJfX3YiOjQsImN1cnJlbmN5IjoiJCJ9LCJpYXQiOjE3MjM1NTEyOTR9.r5mvpk-rQMUzSjv_dqjU9-hhnSiMJUSDG3D74h8I9TQ",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
        <input onChange={(e)=>handleSubmit(e.target.value)}  />
    </div>
  );
}

export default Practice;
