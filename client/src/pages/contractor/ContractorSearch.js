import React, { Component } from 'react';
import ContractorItem from "./ContractorItem";
import NavBar from '../../components/NavigationBar';
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import './Contractor.css';
import ContractorImage from "../../images/ContractorMainPage.png";

class ContractorSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {businesses: [], term: "", location: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // Handling changes to the inputs
    handleChange(evt) {
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }
    // On submit of the form, send a GET request to '/yelp' to get data from the API
    handleSubmit(evt) {
        evt.preventDefault();

        axios.get("/api/yelp", {
            params: {
                term: this.state.term,
                location: this.state.location
            }
        })
        .then(res => {
            this.setState({ businesses: res.data.jsonBody.businesses });
        });
    }
    render() {
        return (
            <div className="contractor-main-section" style={{ backgroundColor: '#ede9e3' }}>
                <NavBar />
                <section id="contractor-main">
                    <div className="row" >
                        <div className="col-lg-7 topbox" >
                            <div className="contractor-text-area">
                                <span className="contractor-header1" style={{ color: 'white' }}>FIND A PROFESSIONAL</span>
                                <p className="contractor-text">We are here to help you find the best of the best. Search for the project you need help with to see a list of the highest rated providers in your area.</p>
                                <Form className="form1" onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Control as="select" id="term" name="term" onChange={this.handleChange}>
                                            <option value="default">Search by Category</option>
                                            <option value="Plumber">Plumber</option>
                                            <option value="Electrician">Electrician</option>
                                            <option value="Carpenter">Carpenter</option>
                                            <option value="Drywaller">Drywaller</option>
                                            <option value="Plastering">Plastering</option>
                                            <option value="Painter">Painter</option>
                                            <option value="Heating and Air-Conditioning">Heating and Air-Conditioning</option>
                                            <option value="Roofer">Roofer</option>
                                            <option value="Landscaper">Landscaper</option>
                                            <option value="Concrete">Concrete</option>
                                            <option value="Flooring">Flooring</option>
                                            <option value="Glass">Glass</option>
                                            <option value="General Contractor">General Contractor</option>
                                            <option value="Designer">Designer</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control id="location" value={this.state.location} name="location" onChange={this.handleChange} placeholder="Location (City/zip)" />
                                    </Form.Group>
                                    <Button className="butt" variant="outline-light" type="submit">Submit</Button>
                                </Form>
                            </div>
                        </div>
                        <div className="col-lg-5 contact-image-section d-flex" >
                            <div className="contact-image contact-overlap-image">
                                <img src={ContractorImage} className="img-fluid" alt="Contractor" />
                            </div>
                        </div>
                    </div>
                </section>


                <div className="ContractorSearchPage">
                    <div className="ContractorsList">
                        {this.state.businesses.map(b => (
                            <ContractorItem
                                key={b.id}
                                name={b.name}
                                phone={b.display_phone}
                                locationOne={b.location.display_address[0]}
                                locationTwo={b.location.display_address[1]}
                                rating={b.rating}
                                url={b.url}
                            />
                        ))}
                    </div>
                </div>
            </div>

        );
    }
}

export default ContractorSearch;