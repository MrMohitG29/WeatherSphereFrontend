import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import { Link } from 'react-router-dom';

export default function NavBar({ title }) {
    const { searchTerm, setSearchTerm } = useAppContext();
    const [searchValue, setSearchValue] = useState();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'));
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearchTerm(searchValue);
            setSearchValue("");
        }
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleLogOut = (e) => {
        localStorage.clear();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="">{title}</Link>
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            placeholder="Search"
                            value={searchValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            aria-label="Search"
                        />

                        {!accessToken ? (
                            <>
                                <Link className="btn btn-outline-success mx-3" to="Login">
                                    Login
                                </Link>
                            </>
                        ) :
                            (
                                <>
                                    <button className='btn btn-outline-success' to="Logout" onClick={handleLogOut}>
                                        Logout
                                    </button>
                                </>
                            )}
                    </form>
                </div>
            </nav>
        </>
    );
}
