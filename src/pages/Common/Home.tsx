import { TagList, MonthList } from '../../modules/home';

export default function HomePage() {
  return (
    <div className="columns">
      <div className="column is-narrow">
        <div className="box" style={{ width: '200px' }}>
          <p className="title is-5">MONTHS</p>
          <MonthList />
        </div>
      </div>
      <div className="column">
        <div className="box">
          <p className="title is-5">TAGS</p>
          <TagList />
        </div>
      </div>
    </div>
  );
}
