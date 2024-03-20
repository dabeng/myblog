import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { UserService } from "../../modules/profile";

const ProfileForm = ({userId}) => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: async () => UserService.getUser(userId)
  });
  const updateProfile = (data) => {
    UserService.updateUser(data)
      .then((data) => {
        // TODO: show notification to diaplay succeed
      })
      .catch(error => {
        console.log("Update user's profile failed: ", error);
      })
      .finally(() => {
        // TODO: close loading spinner
      });
  };

  return (
    <form onSubmit={handleSubmit(updateProfile)}>
      <div className="field">
        <label className="label">Full Name123</label>
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
            Update
          </button>
        </p>
      </div>
    </form>
  );
};

export default ProfileForm;