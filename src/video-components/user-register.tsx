import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import './user-login.css';



export function UserRegister() {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:
        {
            UserName: '',
            UserId: '',
            Password: '',
            Email: '',
            Mobile: 0

        },
        onSubmit: (form,{resetForm}) => {

            axios.post('http://127.0.0.1:7070/user-register', form)
                .then(() => {
                    alert('Register Successfully');
                    resetForm();
                    navigate('/user-register');
                })

        }
    })

    return (
        <div className="container container-fluid w-25 justify-content-center d-flex">
            <div >
                <div>
                    <h2 className="text-center">User Register</h2>
                </div>
                <form onSubmit={formik.handleSubmit} className="justify-content-center d-flex flex-column">
                    <dl className="row">
                        <dt >Name</dt>
                        <dd ><input type="text" onChange={formik.handleChange} value={formik.values.UserName} className="form-control" name="UserName" required /></dd>
                        <dt >User Id</dt>
                        <dd ><input type="text" onChange={formik.handleChange} value={formik.values.UserId} className="form-control" name="UserId" required /></dd>
                        <dt >Password</dt>
                        <dd ><input type="password" onChange={formik.handleChange} value={formik.values.Password} className="form-control" name="Password" required /></dd>
                        <dt >Email</dt>
                        <dd ><input type="email" onChange={formik.handleChange} value={formik.values.Email} className="form-control" name="Email" required /></dd>
                        <dt >Mobile</dt>
                        <dd ><input type="number" onChange={formik.handleChange} value={formik.values.Mobile} className="form-control" name="Mobile" required /></dd>
                    </dl>
                    <div className="btn-group">
                    <button className="btn btn-success">Submit</button>
                    <button className="btn btn-danger" ><Link to='/' className="btn btn-danger">Cancel</Link></button>
                    
                    </div>
                </form>
            </div>
        </div>
    )
}