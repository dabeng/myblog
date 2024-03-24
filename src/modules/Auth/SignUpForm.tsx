import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AuthService } from "../../modules/auth/index";

const SignUpForm = () => {
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleSignup = (data) => {
    AuthService.signup(data)
      .then((data) => {
        setAuth(data);
        navigate(`/profile/${data.id}`, { replace: true });
      })
      .catch(error => {
        // TODO: show notification
        console.log('Registration failed: ', error);
      })
      .finally(() => {

      });
  };

  const switchPassword = () => {
    setPasswordFieldType(type => type === 'password' ? 'input' : 'password');
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
        <div className="control has-icons-right">
          <input
            className={classNames({
              "input": true,
              "is-danger": errors.password
            })}
            type={passwordFieldType}
            {...register("password", {
              required: 'This field is required',
              // pattern: {
              //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
              //   message: 'the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 8 characters long',
              // },
              minLength: {
                value: 4,
                message: 'Requires a minimum length of 4 characters',
              },
              validate: {
                atLeastOneDigit: v => /(?=.*\d)/.test(v) || 'Requires at least one digit',
                atLeastOneLetter: v => /(?=.*[a-zA-Z])/.test(v) || 'Requires at least one letter',
                atLeastOneSpecialCharacter: v => /(?=.*[!@#$%^&*])/.test(v) || 'Requires at least one special character'
              }
            })}
          />
          <span className="icon is-small is-right" style={{ color: 'unset', pointerEvents: 'unset' }} onClick={switchPassword}>
            <i className={classNames({
              "fa-solid": true,
              "fa-eye": passwordFieldType === "input",
              "fa-eye-slash": passwordFieldType === "password"
            })}></i>
          </span>
        </div>
        <ErrorMessage errors={errors} name="password"
          as={<p className="help is-danger" />}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
      </div>
      <div className="field is-grouped is-grouped-right">
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