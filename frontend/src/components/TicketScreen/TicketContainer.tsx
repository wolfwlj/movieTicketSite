import { useEffect, useState } from 'react'
import { useParams} from "react-router-dom";
import { getMovieIndex } from '../../proxies/MovieIndex';
import SeatContainer from "./SeatContainer" 
import '../../styles/seats.css'

interface Props {
    usernameEmit: string
    // setUsernameEmit: (username: string) => void
    userID : Number

  }
  
function TicketContainer({usernameEmit, userID} : Props) {

    const [movieName, setMovieName] = useState('')
    const [movieImg, setMovieImg] = useState('')
    const [movieViewingDate, setMovieViewingDate] = useState('')
    const [movieStartTime, setMovieStartTime] = useState('')
    const [movieEndTime, setMovieEndTime] = useState('')

    const [movieRoomID, setMovieRoomID] = useState(0)
    const [movieRoom, setMovieRoom] = useState('')
 
    const {id} = useParams<{id: string}>()

    const movieID = Number(id)


    const fetchMovieIndex = async (id) => {
        await getMovieIndex(id)
        .then((data) => {

            let splitViewDate = data.Movie.Viewing_date.split(/[T +]/);
            let splitStartTime = data.Movie.Viewing_start_time.split(/[T +]/);
            let splitEndTime = data.Movie.Viewing_end_time.split(/[T +]/);

            let tempViewDate = splitViewDate[0]
            let tempStartTime = splitStartTime[1]
            let tempEndTime = splitEndTime[1]

            console.log(data.Movie)
            setMovieName(data.Movie.Movie_name)
            setMovieRoom(data.RoomName)
            setMovieRoomID(data.Movie.Room_id_fk)
            setMovieViewingDate(tempViewDate)
            setMovieStartTime(tempStartTime)
            setMovieEndTime(tempEndTime)
            setMovieImg(data.Movie.Image_url)
        })
        .catch((err) => {
            console.log(err)
        })   

    }

    useEffect(() => {
        fetchMovieIndex(id)
    }, [id]);




    console.log(movieRoomID)
    return (
        <>

            <h1>  {movieName} </h1>
            <h2 style={ { textAlign: 'center', }}>Room Name : {movieRoom} </h2>
            <h4 style={ { textAlign: 'center', }}>Viewing Date : {movieViewingDate} </h4>
            <h4 style={ { textAlign: 'center', }}>Viewing Start Time : {movieStartTime} </h4>
            <h4 style={ { textAlign: 'center', }}>Viewing End Time : {movieEndTime} </h4>

            <SeatContainer 
                userID={userID} 
                movieID={movieID} 
                usernameEmit={usernameEmit} 
                movieRoomID={movieRoomID} 
                movieRoom={movieRoom}
                movieViewingDate={movieViewingDate}
                movieStartTime={movieStartTime}
                movieEndTime={movieEndTime}
                movieName={movieName}

            />
        </>
  )
}

export default TicketContainer