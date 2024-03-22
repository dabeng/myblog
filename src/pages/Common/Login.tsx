import { LoginForm } from '../../modules/auth';

export default function Login() {
  return (
    <div className="columns is-mobile">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}