import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';

const StepsCompletion = () => {

    return (
        <div className="completion-container">
             <h1>Movie SuccessFully Created!</h1>
             <Icon style={{color: 'green', fontSize:'8em'}} type="check-circle" />

            <h3>Go to <Link to="/">
              Movies Grid
             </Link> to see the new record!</h3>
             
        </div>
       
    );
}

export default StepsCompletion;