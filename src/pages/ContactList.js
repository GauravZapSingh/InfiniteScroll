import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import Loader from '../components/Loader';

const ContactList = () => {
    const [userName, setUserName] = useState(null)
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    let loadingRef = useRef(null)
    const history = useHistory()

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getPhotos(page)
        }, 1000)
    }, [page])

    useEffect(() => {
        let datFromStorage = JSON.parse(localStorage.getItem("user"))
        setUserName(datFromStorage.userName)
        let options = {
            root: null,
            rootMargin: '10px',
            threshold: 1.0
        }

        const observer = new IntersectionObserver(handleObserver, options)

        if (loadingRef.current) observer.observe(loadingRef.current);
    }, [])

    const getPhotos = (page) => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`)
            .then(response => response.json())
            .then(res => {
                setPhotos(values => [...values, ...res])
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const mapPhotos = () => {
        return photos.length ? photos.map((item, i) => {
            return (
                <div className="column" key={i}>
                    <img key={item.id} src={item.url} alt={item.url} />
                </div>
            )
        }) : null
    }

    const handleLogOut = () => {
        localStorage.clear()
        history.push("/login")
    }

    return (
        <div className="app">
            <div className="header">
                <div className="header-user">Hi, {userName}</div>
                <div>
                    <button className="btn" onClick={() => handleLogOut()}>Logout</button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {mapPhotos()}
                </div>
                <Loader loading ref={loadingRef} />
            </div>
        </div>
    );
}

export default ContactList
