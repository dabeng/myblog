import { ProfileForm } from '../../modules/profile';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();

  return (
    <div className="columns is-mobile">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <ProfileForm userId={id} />
        </div>
      </div>
    </div>
  );
}