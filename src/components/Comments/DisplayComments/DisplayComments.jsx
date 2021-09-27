import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from '../Card/Card'
import style from './DisplayComments.module.css'


export default function DisplayComments(id) {
    const [data, setData] = useState([]) // Backup intocable
    const [tempDisplay, setTempDisplay] = useState([]) // Solo se muestra mientras que no haya click en estrellas izq
    const [display, setDisplay] = useState([]) // Solo se muestra cuando click en las estrellas de la izq
    const [eventRating, setEventRating] = useState(0) // Calificacion general
    const [totalComments, setTotalComments] = useState(0) // Cuenta todos los comentarios recopilados de este evento

    
    useEffect(() => {
        const fetchData = async () => {
        let backup;
        let temporary;
        let generalRating;
        try {
            backup = await axios.get(`http://localhost:3001/api/comment/all?id=${id.state}`)
            temporary = await axios.get(`http://localhost:3001/api/comment/someComments?id=${id.state}`)
            generalRating = await axios.get(`http://localhost:3001/api/comment/generalRating?id=${id.state}`)
            if (backup && backup.data.length) setData(backup.data);
            if (temporary && temporary.data.length) setTempDisplay(temporary.data)
            if (generalRating && generalRating.data !== 0) setEventRating(generalRating.data)
        } catch (error) {
            console.log(error)
        }
        }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        setTotalComments(countComments(data))
    },[data])

    //Diego: Recibe una calificacion y la convierte a estrellas. Puede recibir numeros enteros 1-5
    const toStars = (grade) => {
        let result = ''
        while (grade !== 0){
            result += '★'
            grade--
        }        
        while (result.length < 5) {
            result += '☆'
        }
        return result
    }

    //Diego: Funcion que obtiene la longitud total de los comentarios del evento.
    const countComments = (reviews) => {
        let res = 0
        for (let i = 0; i < reviews.length; i++) {
            res += reviews[i][`star${i+1}`].length
        }
        
        return res
    }

    let keyGenerator = 0
    return (
        <div className={style.commentsWrapper}>
        {
            !tempDisplay.length ? (
                    
                        <p className={style.noReviews}>Este evento todavia no tiene comentarios.</p>
                    
                ) : (
                    <div>
                        <div className={style.leftContainer}>
                        {
                            eventRating !== 0 ? (
                                <>
                                    <p className={style.generalRating}>
                                    Rating General: <span className='general-stars'>{toStars(eventRating)}</span>
                                    </p>
                                    <p>
                                        {totalComments} {totalComments > 1? 'calificaciones' : 'calificación'} para este evento.
                                    </p>
                                    <p onClick={e => setDisplay(tempDisplay)}>
                                        Ver algunas
                                    </p>
                                    <div className={style.starContainer}>
                                        <p onClick={e => setDisplay(data[4].star5)}>
                                            ★★★★★ {data[4].star5.length / totalComments * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[3].star4)}>
                                            ★★★★☆ {data[3].star4.length / totalComments * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[2].star3)}>
                                            ★★★☆☆ {data[2].star3.length / totalComments * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[1].star2)}>
                                            ★★☆☆☆ {data[1].star2.length / totalComments * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[0].star1)}>
                                            ★☆☆☆☆ {data[0].star1.length / totalComments * 100}%
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p className={style.noRating}>
                                    Este evento todavia no tiene calificaciones.
                                </p>
                            )
                        }
                        </div>
                        <div className={style.rightContainer}>
                        {
                            !display.length ? (
                                
                                    tempDisplay.map(comment => (
                                    <Card
                                        key={keyGenerator++}
                                        name={`${comment.user.first_name} ${comment.user.last_name}`}
                                        // avatar={comment.user.picture || }
                                        rating={toStars(comment.rating)}
                                        review={comment.review}
                                    />)
                                    )
                                
                            ) : (
                                    display.map(comment => (
                                        <Card
                                            key={keyGenerator++}
                                            name={`${comment.user.first_name} ${comment.user.last_name}`}
                                            rating={toStars(comment.rating)}
                                            review={comment.review}
                                        />)
                                    )
                            )
                        
                        }
                        </div>
                    </div>
            )
        }
        </div>
    )
}
