import React, { Component, useEffect, useState } from 'react';
import genericApiCall from './GenericApi';


export default function History() {
    const [historyData, setHistoryData] = useState([]);

    const fetchHistoryData = () => {
        genericApiCall({
            endpoint: 'search-history/',
            method: 'GET',
            callback: (data) => {
                setHistoryData(data)
            },
        });
    };

    return (
        <>
            <div>
                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal"
                    onClick={fetchHistoryData}
                    data-bs-target="#historyData">
                    History
                </button>

                <div className="modal fade" id="historyData" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">History</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {historyData.map(item => (
                                    <div key={item.id}>
                                        <p>City Name: {item.search_term}</p>
                                        <p>Datetime: {new Date(item.timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',  hour: 'numeric', minute: 'numeric', hour12: true  })}</p>
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
    );
}
