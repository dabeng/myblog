import { ProfileForm } from '../../modules/profile';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();

  return (
    <div className="columns is-mobile box mt-1">
      <div className="column is-half is-offset-one-quarter">
          <ProfileForm userId={id} />
      </div>
    </div>
  );
}