import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from './header';
import Footer from './footer';

const Home = () => {

    const user = useSelector((state) => state.auth.user)
    return (
        <div>
            <Header />
            <header className="masthead" style={{ height: '100vh' }}>
                <div className="container">
                    <div className="masthead-subheading">Welcome {user.fullName}</div>
                    <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
                    <a className="btn btn-primary btn-xl text-uppercase" href="/authPage">Authorized page</a>
                </div>
            </header>
            <Footer />
        </div > 
    )
}

export default Home