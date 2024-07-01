import HomePage from '../components/HomePage'

const Home = () => {

    const loggedIn = false;

    if(loggedIn){
        return (
            <div className = "home">
                <h2>Home</h2>
            </div>
        )
    } else {
        return (
            <div className = "home">
                <HomePage />
            </div>
        )
    }

}

export default Home