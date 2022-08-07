import LoginForm from "../component/LoginForm";

const Login = () => {
    return (
        <>
        <div className="container-fluid bg-secondary h1 p-5 text-center">
            <h1>Login Page</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <LoginForm />
                </div>
            </div>
        </div>
     </>
    )
}

export default Login;