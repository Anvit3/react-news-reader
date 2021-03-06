import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import "./UpdateSources.css";
import { setNewsSource } from "../../actions/newsActions";
import { getNewsSources } from "../../actions/newsActions";

class UpdateSources extends Component {
  state = {
    newsSource: []
  };
  async componentDidMount() {
    if (localStorage.newsSource) {
      await this.props.setNewsSource(JSON.parse(localStorage.newsSource));
    }

    this.props.getNewsSources();
  }

  onClick = () => {
    this.props.setNewsSource(this.state.newsSource);
    this.props.history.push("/news");
  };
  onChange = selectedOptions => {
    if (selectedOptions) {
      this.setState({ newsSource: selectedOptions });
    }
  };

  render() {
    if (this.props.news.allSources && this.props.news.newsSource)
      return (
        <div className="container select-wrapper">
          <Select
            defaultValue={this.props.news.newsSource}
            onChange={this.onChange}
            isMulti
            name="newsSource"
            options={this.props.news.allSources}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select one or more news sources"
          />

          <button
            className="mt-3 btn btn-info btn-md btn-block"
            onClick={this.onClick}
          >
            Submit
          </button>
        </div>
      );
    else return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { setNewsSource, getNewsSources }
)(UpdateSources);
