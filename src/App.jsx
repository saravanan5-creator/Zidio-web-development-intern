import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './web page/Home';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Sidepanel/Dashboard';
import Upload from './Sidepanel/Upload';
import Chart from './Sidepanel/Chart'; 
import DashboardLayout from './Sidepanel/DashboardLayout';
import AInsight from './Sidepanel/AInsight'; 



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/dashboardlayout',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'upload',
        element: <Upload />
      },
      {
        path: 'chart',   
        element: <Chart />
      },
        {
        path: 'aiinsight',  
        element: <AInsight />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

