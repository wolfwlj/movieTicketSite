import MoviesContainer from '../components/MoviesContainer'


interface Props {
  usernameEmit: string
  // setUsernameEmit: (username: string) => void

}


const HomeScreen = ({usernameEmit }: Props) => {
  // setUsernameEmit(usernameEmit)

  let msg = usernameEmit ? `Welcome ${usernameEmit}` : 'Welcome to the movie ticket site'


  return (
    <div>
      <h1>{msg}</h1> 


        <MoviesContainer />

    </div>
  )
}

export default HomeScreen