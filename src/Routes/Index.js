import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Exercise from '../pages/Exercise/Exercise';
import ExerciseCategory from '../pages/Exercise/ExerciseCategory';
import Chat from '../pages/Chat/Chat';
import DietPlan from '../pages/DietPlan/DietPlan';
import Helps from '../pages/Helps/Helps';
import Settings from '../pages/Settings/Settings';
import Singin from '../pages/Auth/Singin';
import ClientAuthGuard from '../shared/ClientAuthGuard';
import ClientPageGuard from '../shared/ClientPageGuard';
import Signup from '../pages/Auth/Signup';
import ForgetPassword from '../pages/Auth/ForgetPassword';

function Index() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<ClientAuthGuard> <Dashboard /></ClientAuthGuard>} />
        <Route path='/dashboard/:id' element={<ClientAuthGuard> <Dashboard /> </ClientAuthGuard>} />
        <Route path='/exercisescategory/:id' element={<ClientAuthGuard> <ExerciseCategory /> </ClientAuthGuard>} />
        <Route path='/exercisescategory/:id/:name/:id' element={<ClientAuthGuard> <Exercise /> </ClientAuthGuard>} />
        <Route path='/chat/:id' element={<ClientAuthGuard> <Chat /> </ClientAuthGuard>} />
        <Route path='/dietplan/:id' element={<ClientAuthGuard> <DietPlan /> </ClientAuthGuard>} />
        <Route path='/helps/:id' element={<ClientAuthGuard> <Helps /> </ClientAuthGuard>} />
        <Route path='/settings/:id' element={<ClientAuthGuard> <Settings /> </ClientAuthGuard>} />
        <Route path='/signin' element={<ClientPageGuard><Singin /></ClientPageGuard>} />
        <Route path='/signup' element={<ClientPageGuard><Signup /></ClientPageGuard>} />
        <Route path='/forgetpassword' element={<ClientPageGuard><ForgetPassword /></ClientPageGuard>} />
      </Routes>
    </>
  );
}

export default Index;
