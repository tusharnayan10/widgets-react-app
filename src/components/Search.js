import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Search = () => {
    const [term, setTerm] = useState('Programming');
    const [debouncedTerm, setdebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (term) {
                setdebouncedTerm(term);
            }
        }, 1000);
        // Inside useEffect (FIRST RETURN THEN USE EFFECT FUNCTION GET CALLED)
        return () => {
            clearTimeout(timeOutId);
        };
    }, [term]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
            setResults(data.query.search);
        }
        search();
    }, [debouncedTerm]);
    const renderResult = results.map((results) => {
        return (
            <div key={results.pageid} className="item">
                <div className="right floated content">
                    <a
                        href={`https://en.wikipedia.org?curid=${results.pageid}`}
                        className="ui button"
                    >Read More...
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {results.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: results.snippet }}></span>
                </div>
            </div>
        );
    })
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Search</label>
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input" type="text" />
                </div>
            </div>
            <div className="ui celled list">{renderResult}</div>
        </div>

    );
}

export default Search;
