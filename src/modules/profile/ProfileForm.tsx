import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { UserService } from "../../modules/profile";

const ProfileForm = ({ userId }) => {
  const { setAuth, accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
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
        <label className="label">Self Introduction</label>
        <div className="control">
          {accessToken &&
            <textarea className="textarea" placeholder="Hi my name is . . ." {...register("self-intro")}></textarea>
          }
          {!accessToken && <p className="readonly-value">{getValues('self-intro')}</p>}
        </div>
      </div>
      <div className="field">
        <label className="label">Full Name</label>
        <div className="control">
          {accessToken && <input className={classNames({
            "input": true,
            "is-danger": errors.name
          })} type="text" {...register("name", { required: 'This field is required' })} />
          }
          {!accessToken && <p className="readonly-value">{getValues('name')}</p>}
        </div>
        <ErrorMessage errors={errors} name="name" as={<p className="help is-danger" />} />
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          {accessToken && <input className={classNames({
            "input": true,
            "is-danger": errors.email
          })} type="text" {...register("email", { required: 'This field is required' })} />
          }
          {!accessToken && <p className="readonly-value">{getValues('email')}</p>}
        </div>
        <ErrorMessage errors={errors} name="email" as={<p className="help is-danger" />} />
      </div>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          {accessToken && <input className={classNames({
            "input": true,
            "is-danger": errors.username
          })} type="text" {...register("username", { required: 'This field is required' })} />
          }
          {!accessToken && <p className="readonly-value">{getValues('username')}</p>}
        </div>
        <ErrorMessage errors={errors} name="username" as={<p className="help is-danger" />} />
      </div>
      {accessToken &&
        <>
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
          <div className="field is-grouped is-grouped-right">
            <p className="control">
              <button className="button is-link" type="submit">
                Update
              </button>
            </p>
          </div>
        </>
      }
    </form>
  );
};

export default ProfileForm;