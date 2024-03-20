import { useNavigate, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AuthService } from "../../modules/auth/index";

const SignUpForm = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleSignup = (data) => {
    AuthService.signup(data)
      .then((data) => {
        setAuth(data);
        navigate('/profile', { replace: true });
      })
      .catch(error => {
        // TODO: show notification
        console.log('Registration failed: ', error);
      })
      .finally(() => {

      });
  };

  return (

    <form onSubmit={handleSubmit(handleSignup)}>
      <div className="field">
        <label className="label">Full Name</label>
        <div className="control">
          <input className={classNames({
            "input": true,
            "is-danger": errors.name
          })} type="text" {...register("name", { required: 'This field is required' })} />
        </div>
        <ErrorMessage errors={errors} name="name" as={<p className="help is-danger" />} />
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className={classNames({
            "input": true,
            "is-danger": errors.email
          })} type="text" {...register("email", { required: 'This field is required' })} />
        </div>
        <ErrorMessage errors={errors} name="email" as={<p className="help is-danger" />} />
      </div>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input className={classNames({
            "input": true,
            "is-danger": errors.username
          })} type="text" {...register("username", { required: 'This field is required' })} />
        </div>
        <ErrorMessage errors={errors} name="username" as={<p className="help is-danger" />} />
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className={classNames({
            "input": true,
            "is-danger": errors.password
          })} type="password" {...register("password", { required: 'This field is required' })} />
        </div>
        <ErrorMessage errors={errors} name="password" as={<p className="help is-danger" />} />
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-link" type="submit">
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;