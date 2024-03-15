import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import { useForm } from "react-hook-form";
import { AuthService } from "../../modules/auth/index";

const Login = () => {
  const { setAuth } = useAuth();
  const {state} = useLocation();
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   setToken("this is a test token");
  //   navigate("/", { replace: true });
  // };


  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    AuthService.login(data.username, data.password)
      .then((data) => {
        setAuth(data);
        navigate(state.from, { replace: true });
      })
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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