import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Exercise from '../pages/Exercise/Exercise';
import ExerciseCategory from '../pages/Exercise/ExerciseCategory';
import Chat from '../pages/Chat/Chat';
import DietPlan from '../pages/DietPlan/DietPlan';
import Helps from '../pages/Helps/Helps';
import Settings from '../pages/Settings/Settings';

function Index() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/exercisescategory' element={<ExerciseCategory />} />
        <Route path='/exercisescategory/:name/:id' element={<Exercise />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/dietplan' element={<DietPlan />} />
        <Route path='/helps' element={<Helps />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </>
  );
}

export default Index;
