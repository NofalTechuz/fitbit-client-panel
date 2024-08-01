import './App.css';
import { AuthProvider } from './context/AuthProvider';
import Index from './Routes/Index';

function App() {
  return (
    <>
    <AuthProvider>

      <Index />
    </AuthProvider>
    </>
  );
}

export default App;
