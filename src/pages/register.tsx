import RegisterForm from '../layout/RegisterForm';
import MainLeftSide from './MainLeftSide';

function Home() {
  return (
    <div className="main-wrapper d-flex row flex-grow-1">
      <MainLeftSide />
      <RegisterForm />
    </div>
  );
}
export default Home;
