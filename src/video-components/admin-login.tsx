import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./user-login.css"


export function AdminLogin() {

    let navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['admin-id']);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:7070/get-admin`)
                .then(response => {
                    var user = response.data.find((item: any) => item.UserId === admin.UserId)
                    if (user.Password) {
                        if (admin.Password === user.Password) {
                            setCookie('admin-id', admin.UserId);
                            navigate('/admin-dashbord')
                        } else {
                            navigate('/error');
                        }
                    } else {
                        navigate('/error');
                    }
                })
        }
    })

    return (
        <div className="container container-fluid">
            <form onSubmit={formik.handleSubmit} style={{backgroundColor:'green'}}>
                <h3>Admin Login</h3>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" className="form-control" name="UserId" onChange={formik.handleChange} required /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" name="Password" onChange={formik.handleChange} required /></dd>
                </dl>
                <button className="btn btn-warning m-2">Login</button>
                <Link to="/" className="btn btn-dark">Cancel</Link>
            </form>
        </div >
    )
}