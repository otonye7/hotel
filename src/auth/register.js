import RegisterForm from "../component/RegisterForm";

const Register = () => {

    return (
     <>
        <div className="container-fluid bg-secondary h1 p-5 text-center">
            <h1>Register Page</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RegisterForm />
                </div>
            </div>
        </div>
     </>
    )
}

export default Register;