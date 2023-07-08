import React, { Component } from "react";
import PropTypes from "prop-types";
import searchIcon from '../../images/search.png';

class Searchbar extends Component {
    state = {
        value: '',
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { value } = this.state;
        if (value.trim() !== "") {
            this.props.handleSearch(value);
            this.setState({ value: "" });
        }
    };

    render() {
        const { value } = this.state;
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <img src={searchIcon} alt="Search icon" className="SearchForm-icon" />
                    </button>
                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={value}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default Searchbar;
