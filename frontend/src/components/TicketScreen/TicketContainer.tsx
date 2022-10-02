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
    // const [movieImg, setMovieImg] = useState('')
    // const [movieViewingDate, setMovieViewingDate] = useState('')
    // const [movieStartTime, setMovieStartTime] = useState('')
    // const [movieEndTime, setMovieEndTime] = useState('')

    const [movieRoomID, setMovieRoomID] = useState(0)
    const [movieRoom, setMovieRoom] = useState('')
 
    const {id} = useParams<{id: string}>()

    const movieID = Number(id)


    const fetchMovieIndex = async (id) => {
        await getMovieIndex(id)
        .then((data) => {
            console.log(data.Movie)
            setMovieName(data.Movie.Movie_name)
            // setMovieImg(data.Movie.Image_url)
            // setMovieViewingDate(data.Movie.Viewing_date)
            // setMovieStartTime(data.Movie.Viewing_start_time)
            // setMovieEndTime(data.Movie.Viewing_end_time)




            setMovieRoom(data.RoomName)
            setMovieRoomID(data.Movie.Room_id_fk)


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
            <h1 style={ { textAlign: 'center', }}>Room Name : {movieRoom} </h1>
            
            <SeatContainer userID={userID} movieID={movieID} usernameEmit={usernameEmit} movieRoomID={movieRoomID} movieRoom={movieRoom}/>
        </>
  )
}

export default TicketContainer