import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [translate, setTranslate] = useState('');
    const [debounceText, setDebounceText] = useState(text);

    useEffect(() => {
        const timerID = setTimeout(() => {
            setDebounceText(text);
        }, 500)
        return () => {
            clearTimeout(timerID);
        }
    }, [text]);


    useEffect(() => {
        const doTranslation = async () => {
            const { data } = await axios.post('https://translate.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debounceText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });
            setTranslate(data.data.translations[0].translatedText);
        }
        doTranslation();
    }, [language, debounceText])
    return (
        <div className="ui header">
            {translate}
        </div>
    );
}

export default Convert;