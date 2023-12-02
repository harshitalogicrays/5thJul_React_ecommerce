import React from 'react'
import styles from './loader.module.css'
import image1 from './assets/loader.gif'
import ReactDOM from 'react-dom'
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={image1} alt="Loading..."/>
        </div>
    </div>,document.getElementById('loader')
  )
}

export default Loader
