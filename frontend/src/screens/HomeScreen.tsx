  interface Props {
  usernameEmit: string
  // setUsernameEmit: (username: string) => void

}
const HomeScreen = ({usernameEmit }: Props) => {
  // setUsernameEmit(usernameEmit)

  return usernameEmit ? (
    <h1>Welcome {usernameEmit}</h1>
  ) : (
    <h1>Welcome to the Home Page!</h1>
  )
}

export default HomeScreen