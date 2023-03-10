import { useState } from 'react';
import { ImSearch } from 'react-icons/im';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const inputSearch = event => {
    setQuery(event.currentTarget.value);
  };

  const search = event => {
    event.preventDefault();

    onSubmit(query);

    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={search}>
        <button type="submit" className="SearchForm-button">
          <ImSearch size={25} />
        </button>

        <input
          value={query}
          onChange={inputSearch}
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
