import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { lang } from './db';
import Convert from './Convert';

const Translate = () => {
    const [language, setLanguage] = useState(lang[0]);
    const [text, setText] = useState('');
    return (
        <div>
            <div className="ui form" >
                <div className="field">
                    <label>Enter text</label>
                    <input type="text" value={text} onChange={(e) => { setText(e.target.value) }} />
                </div>
            </div>
            <Dropdown
                label="Select a language"
                options={lang}
                selected={language}
                onSelectedChange={setLanguage}
            />
            <hr></hr>
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language} />
        </div>
    );

}

export default Translate;