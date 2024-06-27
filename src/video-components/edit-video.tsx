
import axios from "axios";
import { EditContract } from "../contracts/EditContract";
import { CategoriesContracts } from "../contracts/CategoriesContracts";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";




export function EditVideo() {

    const [edit, setEdit] = useState<EditContract[]>([
        {
            VideoId: 0,
            Title: '',
            Url: '',
            Description: '',
            Like:0,
            Dislike:0,
            CategoryId:0
        }
    ]);

    const [categories, setCategories] = useState<CategoriesContracts[]>([]);

    let params = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:7070/get-video/${params.id}`)
            .then(response => {
                setEdit(response.data);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:7070/get-categories`)
            .then(response => {
                setCategories(response.data);
            })
    }, [])
    

    const formik = useFormik({
        initialValues: {
            VideoId: edit[0].VideoId,
            Title: edit[0].Title,
            Url: edit[0].Url,
            Description: edit[0].Description,
            Like: edit[0].Like,
            Dislike: edit[0].Dislike,
            CategoryId: edit[0].CategoryId
        },
        onSubmit: (edit) => {
            axios.put(`http://127.0.0.1:7070/edit-video/${params.id}`, edit)
                .then(() => {
                    alert('Video Edited Successfully');
                    navigate('/admin-dashbord');
                })
        },
        enableReinitialize: true,
    })

    

    return (
        <div>
            <h2>Edit Video</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input type="number" value={formik.values.VideoId} className="form-control w-50" onChange={formik.handleChange} size={37} name="VideoId" required /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input type="text" className="form-control w-50" onChange={formik.handleChange} value={formik.values.Title} name="Title" required /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input type="text" className="form-control w-50" onChange={formik.handleChange} value={formik.values.Url} name="Url" required /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9">
                        <textarea name="Description" className="form-control w-50" onChange={formik.handleChange} value={formik.values.Description} rows={4} cols={40} required ></textarea>
                    </dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input type="number" className="form-control w-50" onChange={formik.handleChange} value={formik.values.Like} name="Like" required /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input type="number" className="form-control w-50" onChange={formik.handleChange} value={formik.values.Dislike} name="Disike" required /></dd>
                    <dt className="col-3">Select Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" value={formik.values.CategoryId} required className="form-control w-50" onChange={formik.handleChange} >
                            {
                                categories?.map(category =>

                                    <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Submit</button>
                <Link to="/admin-dashbord" className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}


