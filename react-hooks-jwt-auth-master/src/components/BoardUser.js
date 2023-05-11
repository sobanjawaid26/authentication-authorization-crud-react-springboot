import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import StudentService from "../services/student.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    age: ""
    });
  // const studentList = [
  //   {firstName:"John", lastName:"Doe", age:46},
  //   {firstName:"Jane", lastName:"Sen", age:26},
  //   {firstName:"Matty", lastName:"Schor", age:16},
  //   {firstName:"Perry", lastName:"Duhl", age:36},
  // ]

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    
    StudentService.getStudents().then(
      (response) => {
        setStudentList(response.data);
      }
    )
  }, []);

  const myFunction = (event) => {
    console.log('newStudent', newStudent)
    event.preventDefault();
  };

  const submitForm = (event) => {
    console.log('newStudent', newStudent)
    event.preventDefault();
    StudentService.saveStudent(newStudent).then(
      (response) => {
        console.log('response', response);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log('resMessage', resMessage);
      }
    );;
  };

  const handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log('value', value);
    console.log('name', name);

    setNewStudent((oldStudent) => {
      console.log('oldStudent', oldStudent);
      const newStudent = oldStudent;
      switch(name){
        case 'firstName':
        newStudent.firstName = value;
        case 'lastName':
        newStudent.lastName = value;
        case 'age':
        newStudent.age = value;
      }
      
      return newStudent;
    })
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div>
        <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map(( listValue, index ) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{listValue.firstName}</td>
                      <td>{listValue.lastName}</td>
                      <td>{listValue.age}</td>
                      <button type="button" className="btn btn-primary" onClick={myFunction}>
                        Edit</button>
                      <span> </span>
                      <button type="button" className="btn btn-danger" onClick={myFunction}>
                        Delete</button>
                    </tr>
                  );
                })}
            
          </tbody>
        </table>
        </div>
        <div>
          <form onSubmit={submitForm}>
            <div class="form-group">
              <label for="exampleInputEmail1">First Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter First Name" name="firstName"
              onChange={handleInput}></input>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Last Name</label>
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Last Name" name="lastName" onChange={handleInput}
              ></input>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Age</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Age"
              name="age" onChange={handleInput}></input>
              
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
