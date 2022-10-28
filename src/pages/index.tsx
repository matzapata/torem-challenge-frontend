import MainLeftSide from './mmainLeftSide';
import LoginForm from '../layout/LoginForm';

function Home() {
  return (
    <div className="main-wrapper d-flex row flex-grow-1">
      <MainLeftSide />
      <LoginForm />
    </div>
  );
}
export default Home;
