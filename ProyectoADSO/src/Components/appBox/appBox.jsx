import React from 'react';
import { Children } from 'react';
import styles from './appBox.module.css';

const AppBox = ({ children }) => {
    return (
        <div className={styles.appBox}>
            {children}
        </div>
    );
}

export default AppBox;
