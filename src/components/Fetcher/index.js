import React, { Component } from "react";

class Fetcher extends Component {
  constructor(props) {
    super(props);
    this.url = "https://jsonplaceholder.typicode.com";
    this.state = {
      apiData: [],
    };
  }

  async componentDidMount() {
    const result = await fetch(this.url + this.props.path).then((res) =>
      res.json()
    );

    this.setState({
      apiData: result.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        address: `${row.address.street} ${row.address.suite}`,
      })),
    });
  }

  render() {
    return this.props.render(this.state.apiData);
  }
}

export default Fetcher;
