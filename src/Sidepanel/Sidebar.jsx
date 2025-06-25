
import { Link } from "react-router-dom";
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="#" className="logo">📊 ExcelAnalytics</Link>

            <div className="sidebar-item">
                <i className="bi bi-speedometer2"></i>
                <Link to="/dashboardlayout/dashboard">Dashboard</Link>
            </div>

            <div className="sidebar-item">
                <i className="bi bi-upload"></i>
                <Link to="/dashboardlayout/upload">Upload Files</Link>
            </div>

            <div className="sidebar-item">
                <i className="bi bi-robot"></i>
                <Link to="/dashboardlayout/aiinsight">AI Insight</Link>
            </div>

            <div className="sidebar-item logout">
                <i className="bi bi-box-arrow-right"></i>
                <Link to="/">Log out</Link>
            </div>
        </div>
    );
}

export default Sidebar;
