
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function VideoHome() {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:
        {
            Name: '',
            MailId: '',
            Mobile: 0,
            Department: '',
            Message: ''


        },
        onSubmit: (form,{resetForm}) => {

            axios.post('http://127.0.0.1:7070/add-feedback', form)
                .then(() => {
                    alert('Submit Successfully.....');
                    resetForm();
                    navigate('/');
                })

        }
    })

    return (

        <div className="container container-fluid">
            {/* <div>
                <img src="../public/public/books-1842306_960_720.jpg" />
            </div> */}
            <form onSubmit={formik.handleSubmit} style={{backgroundColor:'red'}} >
                <h2>Feedback Form</h2>
                <dl>
                    <dt>Name</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.Name} name="Name" required /></dd>
                    <dt>Mail Id</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.MailId} name="MailId" required /></dd>
                    <dt>Mobile Number</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange} value={formik.values.Mobile} name="Mobile" required /></dd>
                    <dt>Department</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.Department} name="Department" required /></dd>
                    <dt>Message</dt>
                    <dd><textarea name="Message" className="form-control" onChange={formik.handleChange} value={formik.values.Message} cols={30} rows={5} required></textarea></dd>
                </dl>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>

    )
}