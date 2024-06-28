
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
                <h2>Home 2</h2>
            </div>
        )
    }

}

export default Home