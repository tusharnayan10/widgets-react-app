import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { items, list } from './db';
import Translate from './Translate';
import Accordion from './Accordion';
import Search from './Search';
import Route from './Route';
import Header from './Header';

const App = () => {
  const [selected, setSelected] = useState(list[0]);

  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a color"
          selected={selected}
          onSelectedChange={setSelected}
          options={list} />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>

    </div>

  );
}

export default App;
