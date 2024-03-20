import { SignUpForm } from '../../modules/auth';

export default function SignUp() {
  return (
    <div className="columns is-mobile">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}