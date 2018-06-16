import React from 'react'

import ResultPage from "./ResultPage";

import {BrowserRouter as Router, Link, Route} from 'react-router-dom'


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.searchChanged = this.searchChanged.bind(this);
    };

    searchChanged(event) {
        this.setState({search: event.target.value})
    }

    render() {
        return (
            <Router>
                <div className="container-fluid">

                    <Route path="/results/:search"
                           component={ResultPage}>
                    </Route>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">CookMi</a>
                        <button onClick={this.findRecipe}
                                type="button"
                                className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Login<span className="sr-only">(current)</span></a>
                                </li>

                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Register<span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>


                    </nav>

                    <br/>
                    <br/>


                    <div className="col-sm-10 form-group-lg">
                        <form className="form-group my-2 my-lg-0">
                            <input className="form-control mr-lg-2"
                                   onChange = {this.searchChanged}
                                   type="search"
                                   placeholder="Search"
                                   aria-label="Search">
                            </input>

                                <Link to={`/results/${this.state.search}`}>
                                    <button
                                        className="btn btn-outline-success my-2 my-sm-0 "
                                        type="button">Search</button>
                                </Link>
                        </form>
                    </div>

                </div>
            </Router>
        )
    }
}
export default HomePage;