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

function Index() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<ClientAuthGuard> <Dashboard /></ClientAuthGuard>} />
        <Route path='/dashboard' element={<ClientAuthGuard> <Dashboard /> </ClientAuthGuard>} />
        <Route path='/exercisescategory' element={<ClientAuthGuard> <ExerciseCategory /> </ClientAuthGuard>} />
        <Route path='/exercisescategory/:name/:id' element={<ClientAuthGuard> <Exercise /> </ClientAuthGuard>} />
        <Route path='/chat' element={<ClientAuthGuard> <Chat /> </ClientAuthGuard>} />
        <Route path='/dietplan' element={<ClientAuthGuard> <DietPlan /> </ClientAuthGuard>} />
        <Route path='/helps' element={<ClientAuthGuard> <Helps /> </ClientAuthGuard>} />
        <Route path='/settings' element={<ClientAuthGuard> <Settings /> </ClientAuthGuard>} />
        <Route path='/signin' element={<ClientPageGuard><Singin /></ClientPageGuard>} />
      </Routes>
    </>
  );
}

export default Index;
