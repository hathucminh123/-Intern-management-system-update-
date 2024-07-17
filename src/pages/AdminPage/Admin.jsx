import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem("role").toLowerCase();

        if (storedRole !== 'admin') {
            navigate('/'); // Redirect to home or some other page if not admin
        }
    }, [navigate]);

    return (
        <nav>
            <ul>
                <li><a href='/hrmanager'>HR manager pages</a></li>
                <li><a href='/mentor'>Mentor pages</a></li>
                <li><a href='/internshipcoordinators'>Intershipcoordinators pages</a></li>
                <li><a href='/intern'>Intern pages</a></li>
            </ul>
        </nav>
    );
};

export default AdminPage;
