import React from 'react';


function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="search"></label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search Employee"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary">
          Search
        </button>
        <button onClick={props.refreshPage} className="btn btn-primary">
          Reset
        </button>
      </div>
    </form>
  );
}
export default SearchForm;