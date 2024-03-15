import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setToken("this is a test token");
    navigate("/", { replace: true });
  };


  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input className="input" type="text" {...register("username")} />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" {...register("password")} />
        </div>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success" type="submit">
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default Login;