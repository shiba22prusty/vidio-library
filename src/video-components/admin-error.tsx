import { Link } from "react-router-dom"

export function AdminError(){
    return(
        <div>
            <h3 className="text-danger">Invalid Credentials</h3>
            <Link to="/admin-login">Try again</Link>
        </div>
    )
}