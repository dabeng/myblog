import { ProfileForm } from '../../modules/profile';

export default function SignUp() {
  return (
    <div className="columns is-mobile">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}