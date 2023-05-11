import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/student/";

const saveStudent = (newStudent) => {
    return axios.post(API_URL , newStudent, { headers: authHeader() });
    console.log('saving student');
  };

  const getStudents = (newStudent) => {
    return axios.get(API_URL , { headers: authHeader() });
    console.log('getting all  student');
  };

  const StudentService = {
    saveStudent,
    getStudents
  };
  
  export default StudentService;