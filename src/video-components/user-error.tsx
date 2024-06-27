import { Link } from "react-router-dom"

export function UserError(){
    return(
        <div>
            <h3 className="text-danger">Invalid Credentials</h3>
            <Link to="/user-login">Try again</Link>
        </div>
    )
}