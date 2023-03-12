import React from 'react';
import s from './lostFoundForm.module.css'

function LostFoundFormDnD(props) {
    return (
        <div className={s.dnd}>
            <span>📩</span>
            <p>Drag and drop photos or browse</p>
        </div>
    );
}

export default LostFoundFormDnD;