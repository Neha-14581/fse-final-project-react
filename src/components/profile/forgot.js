import {useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Forgot = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const submit = () =>
        service.reset(newUser)
            .then(() => navigate('/home'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Forgot Password</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email" type="email"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/> 
            <button onClick={submit}
                    className="btn btn-primary mb-5">Reset Password
            </button>
        </div>
    );
}
export default Forgot;