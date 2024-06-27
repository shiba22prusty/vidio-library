import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import './user-login.css'


export function UserLogin() {
    const [cookie, setCookie, removeCookie] = useCookies(['user-id']);
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (user) => {
            axios.get(`http://127.0.0.1:7070/get-users`)
                .then(response => {
                    var x = response.data.find((item: any) => item.UserId === user.UserId)
                    if (x) {
                        if (user.Password === x.Password) {
                            setCookie('user-id', user.UserId);
                            alert('User Login Successifuly')
                            navigate('/user-dashbord')

                        } else {
                            navigate('/user-error');
                        }
                    } else {
                        navigate('/user-error');
                    }
                })
        }
    })

    return (
        <div className="container container-fluid">
             <form onSubmit={formik.handleSubmit} style={{backgroundColor:'blue'}}>
                 <h3>User Login</h3>
                 <dl>
                     <dt>User Id</dt>
                     <dd><input type="text" className="form-control" name="UserId" onChange={formik.handleChange} required /></dd>
                     <dt>Password</dt>
                     <dd><input type="password" className="form-control" name="Password" onChange={formik.handleChange} required /></dd>
                 </dl>
                 <button className="btn btn-success m-2">Login</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
                <div>
                <Link to="/user-register" className="bi bi-person-add text-white text-decoration-none">New User Register</Link>
                </div>
             </form>
             
             
                    
         </div >
    )
}
