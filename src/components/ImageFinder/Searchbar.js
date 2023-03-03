import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  inputSearch = event => {
    this.setState({ query: event.currentTarget.value });
  };

  search = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.search}>
          <button type="submit" className="SearchForm-button">
            <ImSearch size={25} />
          </button>

          <input
            value={this.state.query}
            onChange={this.inputSearch}
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
}
