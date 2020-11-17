import React, { Component } from "react";

class Fetcher extends Component {
  constructor(props) {
    super(props);
    this.url = "https://jsonplaceholder.typicode.com";
    this.state = {
      apiData: null,
    };
  }

  componentDidMount() {
    fetch(this.url + this.props.path)
      .then((res) => res.json())
      .then((apiData) => {
        this.setState({ apiData });
      });
  }

  render() {
    return this.props.render(this.state.apiData);
  }
}

export default Fetcher;
