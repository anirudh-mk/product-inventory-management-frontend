import React from 'react'
import style from '../style/iconButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard } from '@fortawesome/free-solid-svg-icons'
function IconButton({ title }) {
    return (
        <div className={style.iconButton}>
            <div>
                <FontAwesomeIcon icon={faDashboard} />
            </div>
            <div>
                <p>{title}</p>
            </div>
        </div>
    )
}

export default IconButton