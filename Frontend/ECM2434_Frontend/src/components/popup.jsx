import React from 'react';
import classes from './popup.module.css';
export function Popup({handleClose,children,open}){
    return(
        open && (
        <section className={classes.bg}>
            <div className={classes.card}>
                {children}
            <button onClick={handleClose} className={classes.closeButton}>Close</button>
            </div>
        </section>
        )
    )
}