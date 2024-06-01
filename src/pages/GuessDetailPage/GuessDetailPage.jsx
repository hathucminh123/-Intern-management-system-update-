import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GuessDetailsComponent from '../../components/GuessComponent/GuessDetailsComponent/GuessDetailsComponent';
import './GuessDetailPage.css';

const GuessDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className='Container'>
            <div className='content-wrapper'>
                <h5>
                    <span
                        className="breadcrumb"
                        onClick={() => navigate('/guest/info')}
                        role="button"
                        aria-label="Navigate to Internship Programs"
                    >
                        Trang chủ Chương Trình thực tập
                    </span>
                    {' '} - Chi tiết sản phẩm
                </h5>
                <GuessDetailsComponent id={id} />
            </div>
        </div>
    );
};

export default GuessDetailPage;
