import React, { useState } from 'react'
import genericApiCall from './GenericApi';

export default function Favorite() {

    const [favoriteCities, setFavoriteCities] = useState([]);

    const fetchFavoriteCities = () => {
        genericApiCall({
            endpoint: 'favorite-cities/',
            method: 'GET',
            callback: (data) => {
                setFavoriteCities(data)
            },
        });
    };

    return (
        <>
            <div>
                <button type="button mx-2" className="btn btn-outline-danger" data-bs-toggle="modal"
                    onClick={fetchFavoriteCities}
                    data-bs-target="#favoriteCities">
                    Favorite
                </button>

                <div className="modal fade" id="favoriteCities" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Favorite Cities</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {favoriteCities.map(item => (
                                    <div key={item.id}>
                                        <p>City Name: {item.name}</p>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
