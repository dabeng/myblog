import { useNavigate, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AuthService } from "../../modules/auth/index";

const SignUp = () => {
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
        console.log('Registration failed: ', error);
      })
      .finally(() => {

      });
  };

  return (
    <div className="columns is-mobile">
    <div className="column is-half is-offset-one-quarter">
      <form onSubmit={handleSubmit(handleSignup)}>
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
            <button className="button is-info" type="submit">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
  );
};

export default SignUp;