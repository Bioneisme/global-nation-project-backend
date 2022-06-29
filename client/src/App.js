import {useState, useEffect} from "react";
import API from './api';
import NavBar from "./components/navbar";

function App() {
    const [email, setEmail] = useState(null)

    useEffect( () => {
        async function fetchData() {
            const response = await API.get('/profile', {
                responseType: "json",
            })
            setEmail(response.data.email)
        }
        fetchData().then(r => console.log("email fetched"))
    }, [])

    return (
        <div className="main__wrap">
            <main className="container">
                <div className="card__box">
                    <NavBar
                        email={email}
                    />
                    <hr></hr>
                </div>
            </main>
        </div>
    );
}

export default App;