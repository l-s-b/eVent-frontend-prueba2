import  styles  from './Bienvenido.module.css'
import {Link} from 'react-router-dom'
import  FormEvent  from '../FormEvent/FormEvent'


function Loading (){
    return(
        <div className={ styles .bienvenidosCrear}>
            <Link to='/FormEvent' className={styles.linkcrear}>
            <div className={ styles .threeD}>
                <h1> Bienvedido a eVent </h1>
                <h1>Crear Su primer un evento</h1>
                
            </div></Link>
        </div>
    )
}

export default  Loading