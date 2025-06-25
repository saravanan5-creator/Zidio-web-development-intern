import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function DashboardLayout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet /> {/* Renders Dashboard or Upload based on route */}
            </main>
        </div>
    );
}

export default DashboardLayout;
