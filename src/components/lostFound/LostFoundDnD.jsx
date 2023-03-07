import React from 'react';
import s from './lostFound.module.css'

function LostFoundDnD(props) {
    return (
        <div className={s.dnd}>
            <span>📩</span>
            <p>Drag and drop photos or browse</p>
        </div>
    );
}

export default LostFoundDnD;