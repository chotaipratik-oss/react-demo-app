import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  this.state.graphUsers = [];
  this.state.loadingGraph = true;
  }

  componentDidMount() {
    this.populateWeatherData();
  this.populateGraphUsers();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  static renderGraphUsersTable(users) {
    return (
      <table className="table table-striped" aria-labelledby="graphUsersLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Display Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.displayName}</td>
              <td>{user.mail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    let graphContents = this.state.loadingGraph
      ? <p><em>Loading Graph users...</em></p>
      : FetchData.renderGraphUsersTable(this.state.graphUsers);

    return (
      <div>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
        <h1 id="graphUsersLabel">GRAPH users</h1>
        {graphContents}
      </div>
    );
  }

  async populateWeatherData() {
    console.log("api.....");
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

  async populateGraphUsers() {
    try {
      const response = await fetch('/graphauth/users');
      const result = await response.json();
      // result.value is the array of users from Graph API
      this.setState({ graphUsers: result.value || [], loadingGraph: false });
    } catch (error) {
      this.setState({ graphUsers: [], loadingGraph: false });
    }
  }
}
