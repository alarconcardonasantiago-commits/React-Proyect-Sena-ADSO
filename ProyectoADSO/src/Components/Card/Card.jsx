import styles from './Card.module.css';
import React from 'react'; 
// import PropTypes from 'prop-types';


function Card(props) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.image} alt={props.title}/>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.content}>{props.content}</p>
      <button className={styles.button}>{props.price}</button>
    </div>
  );
};

export default Card;




// function Card() {
//   return (
//     <div className={styles.card}>
//         <img className={styles.image} src="https://placehold.co/150" alt="Placeholder" />
//       <h3 className={styles.title}>Card Component</h3>
//         <p className={styles.content}>Texto de placeholder para cambiar por productos en un futuro</p>
//         <button className={styles.button}>100.000$</button>
//     </div>
//   );
// }
// export default Card;