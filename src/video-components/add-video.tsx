import { useEffect, useState } from "react";
import { CategoriesContracts } from "../contracts/CategoriesContracts";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './user-login.css';


export function AddVideo() {
    let navigate = useNavigate();
    const [categories, setCategories] = useState<CategoriesContracts[]>();
    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Description: '',
            Like: 0,
            Dislike: 0,
            CategoryId: 0
        },
        onSubmit: (video) => {
             axios.post('http://127.0.0.1:7070/add-video', video)
             .then(()=>{
                alert('Video Added Successfully');
                navigate('/admin-dashbord');
             })
            
            }
        })

    function LoadCategories() {
        axios.get('http://127.0.0.1:7070/get-categories')
            .then(response => {
                response.data.unshift({ CategoryId: '-1', CategoryName: 'Select Category' })
                setCategories(response.data);
            })
    }

    useEffect(() => {
        LoadCategories();
    }, []);
    return (
        <div className="container container-fluid justify-content-center d-flex">
            <div>
                
            </div>
            <form onSubmit={formik.handleSubmit} className="justify-content-center d-flex flex-column w-50">
            <h2 className="text-center">Add New Video</h2>
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input type="number" className="form-control w-50" onChange={formik.handleChange} size={37} name="VideoId" required /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" className="form-control w-50" onChange={formik.handleChange} name="Title" required /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input type="text" className="form-control w-50" onChange={formik.handleChange} name="Url" required /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9">
                        <textarea name="Description" className="form-control w-50" onChange={formik.handleChange} rows={4} cols={40} required ></textarea>
                    </dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number" className="form-control w-50" onChange={formik.handleChange} name="Likes" required /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="number" className="form-control w-50" onChange={formik.handleChange} name="Disikes" required /></dd>
                    <dt className="col-3">Select Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" required className="form-control w-50" onChange={formik.handleChange} >
                            {
                                categories?.map(category =>

                                    <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button  className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}