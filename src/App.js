import React from 'react';
import EmployeeCard from './components/EmployeeCard';
import SearchForm from './components/SearchForm';
import Wrapper from './components/Wrapper';
import Col from './components/Col';
import API from './utils/API';
// import './App.css';


class App extends React.Component {
  state = { employees: [], search: "" };
  componentDidMount() {
    API.search().then((res) => {
      this.setState({
        employees: res.data.results.map((event, key) => ({
        firstName: event.name.first,
        lastName: event.name.last,
        picture: event.picture.large,
        email: event.email,
        phone: event.phone,
        city: event.location.city,
        key: key,
        })),
      });
    }).catch((err) => console.log(err));
  }
  refreshPage() {
    window.location.reload(false);
  }
  searchEmployee = (filter) => {
    console.log('Search', filter);
    const filteredList = this.state.employees.filter((employee) => {
      let values = Object.values(employee).join('').toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ employees: filteredList });
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('Handle ', this.state.search);
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.searchEmployee(this.state.search);
    console.log('Button Clicked', this.state.search, e);
  };

  
  render() {
    return (
      <Wrapper>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row">
            <Col size="md-4">
              <h1>Employee Directory</h1>
              <SearchForm 
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />  
            </Col>
          </div>
          <br />
          <div className="row">
            <Col size="md-12">
              <table className="table">
                <thead>
                  <tr>
                  <th>Picture</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  </tr>
                </thead>
                <br />
                {[...this.state.employees].map((item) => (
                  <EmployeeCard
                    picture={item.picture}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    email={item.email}
                    phone={item.phone}
                    city={item.city}
                    key={item.key}
                  />
                ))}
              </table>
            </Col>
          </div>
        </div>
      </Wrapper>
    )
  }
}
export default App;