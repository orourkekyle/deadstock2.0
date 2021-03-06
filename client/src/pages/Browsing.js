// set up browsing (through external api's) components
import React, { Component } from "react";
import API from "../utils/API";
// import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Shoe from "../components/Shoe";
import CardDeck from "react-bootstrap/CardDeck";
import Navy from "../components/Nav";
import { FormGroup, Row, Col, Container, Form } from "reactstrap";
import "./Browsing.css"
import Popular from "../components/Popular";


class Browsing extends Component {
    // start state
    state = {
        sneakers: [],
        popularSneakers: [],
        shoeName: "",
        brand: "",
        gender: "",
        releaseYear: "",
        colorway: "",
        message: "Search For A Sneaker To Begin",
        order: "asc"
    };

    sortPriceDesc = () => {
        switch (this.state.order) {
            case 'asc':
                this.setState({ sneakers: this.state.sneakers.sort((a, b) => a.retailPrice - b.retailPrice), order: 'desc' });
                break;
        }
    }
    sortPriceAsc = () => {
        switch (this.state.order) {
            case 'desc':
                this.setState({ sneakers: this.state.sneakers.sort((a, b) => b.retailPrice - a.retailPrice), order: 'asc' });
                break;
        }
    }
    sortYearAsc = () => {
        switch (this.state.order) {
            case 'desc':
                this.setState({ sneakers: this.state.sneakers.sort((a, b) => a.year - b.year), order: 'asc' });
        }
    }
    sortYearDesc = () => {
        switch (this.state.order) {
            case 'asc':
                this.setState({ sneakers: this.state.sneakers.sort((a, b) => b.year - a.year), order: 'desc' });
        }
    }

    // get popular on page load
    // componentDidMount = () => {
    //     return this.getPopular();
    // }

    // register what gets put into input fields
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // get popular sneakers from db
    // getPopular = () => {
    //     API.getPopular()
    //         .then(res => {
    //             console.log("res.data inside popularwishlistdb: ", res.data)
    //             return this.setState({
    //                 popularSneakers: res.data
    //             })
    //         })
    //         .catch(() =>
    //             this.setState({
    //                 popularSneakers: [],
    //                 message: "No Sneakers Found in DB"
    //             }));
    // };

    // get sneakers from external api based on search
    getSneakers = () => {
        API.getSneakers(this.state.shoeName, this.state.brand, this.state.gender, this.state.releaseYear, this.state.colorway)
            .then(res => {
                console.log("res.data inside getSneakers call: ", res.data);
                return this.setState({
                    sneakers: res.data
                })
            })
            .catch(() =>
                this.setState({
                    sneakers: [],
                    message: "No Sneakers Found, Try a Different Query"
                })
            );
    };

    // register search functionality
    handleSearch = event => {
        event.preventDefault();
        this.getSneakers();
    };

    //  register save functionality
    handleUserSave = id => {
        const sneaker = this.state.sneakers.find(sneaker => sneaker.id === id);
        API.saveSneaker({
            sneakerId: sneaker.id,
            shoeName: sneaker.shoe,
            colorway: sneaker.colorway,
            brand: sneaker.brand,
            gender: sneaker.gender,
            retailPrice: sneaker.retailPrice,
            year: sneaker.year,
            image: sneaker.media.thumbUrl
        }).then(() => console.log("Saved Shoe to User!"));
    };

    handlePopularSave = id => {
        const sneaker = this.state.sneakers.find(sneaker => sneaker.id === id);
        API.saveToPopular({
            sneakerId: sneaker.id,
            shoeName: sneaker.shoe,
            colorway: sneaker.colorway,
            brand: sneaker.brand,
            gender: sneaker.gender,
            retailPrice: sneaker.retailPrice,
            year: sneaker.year,
            image: sneaker.media.thumbUrl
        }).then(() => console.log("Saved Shoe to Popular!"));
    };

    handleIdSave = id => {
        const sneaker = this.state.sneakers.find(sneaker => sneaker.id === id);
        API.saveUserSave({
            sneakerId: sneaker.id
        }).then(() => console.log("Saved Id in Popular!"));
    };

    handleSaves = id => {
        this.handleUserSave(id);
        this.handlePopularSave(id);
        this.handleIdSave(id);
    };

    render() {
        return (
            <div>
                <Navy />
                <Container style={{paddingTop: 100}}>
                    {/* <Nav /> */}
                    <Row>
                        <Col sm="6" className="text-center mx-auto">
                            <FormGroup className="text-center mx-auto">
                                <Input
                                    onChange={this.handleInputChange}
                                    name="shoeName"
                                    placeholder="Shoe name"
                                />
                                <Input
                                    onChange={this.handleInputChange}
                                    name="colorway"
                                    placeholder="Color" />
                                <Input
                                    onChange={this.handleInputChange}
                                    name="brand"
                                    placeholder="Brand"
                                />
                                <Input
                                    onChange={this.handleInputChange}
                                    name="gender"
                                    placeholder="Gender"
                                />
                                <Input
                                    onChange={this.handleInputChange}
                                    name="releaseYear"
                                    placeholder="Release Year"
                                />
                                <div>
                                    <FormBtn className="btn btn-white"
                                        onClick={this.handleSearch}
                                    >
                                       <strong>Search</strong>
                                </FormBtn>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Container>

                <Row className="text-center mx-auto">
                    <Col>
                        <FormBtn className="btn btn-pink" onClick={this.sortPriceDesc}> Sort Price from Low to High </FormBtn>
                        <FormBtn className="btn btn-blue" onClick={this.sortPriceAsc}> Sort Price from High to Low </FormBtn>
                    </Col>
                    <Col>
                    <FormBtn className="btn btn-blue" onClick={this.sortYearDesc}>Sort from Newest to Oldest</FormBtn>
                        <FormBtn className="btn btn-pink" onClick={this.sortYearAsc}> Sort from Oldest to Newest </FormBtn>
                    </Col>
                </Row>

                <div className="shoe-container">
                        {this.state.sneakers.length ? (
                            <CardDeck size="sm-4">
                                {this.state.sneakers.map(sneaker => (
                                    <Shoe
                                        key={sneaker.id}
                                        shoe={sneaker.shoe}
                                        colorway={sneaker.colorway}
                                        brand={sneaker.brand}
                                        price={sneaker.retailPrice}
                                        gender={sneaker.gender}
                                        year={sneaker.year}
                                        image={sneaker.media.thumbUrl}
                                        Button={() => (
                                            <FormBtn className="btn btn-pink tex-center mt-auto"
                                                onClick={() => this.handleSaves(sneaker.id)}
                                                id="save-btn" >Save</FormBtn>
                                        )}
                                    />
                                ))}
                            </CardDeck>
                        ) : (
                    // </div>
                                // <h2 className="search-for-sneakers text-center" style={{color: "white"}}>These some user favorites!</h2>
                                <Popular></Popular>
                            //    <div>
                            //        {this.state.popularSneakers.length ? (
                            //            <CardDeck size="sm-4">
                            //                {this.state.popularSneakers.map(popular => (
                            //                    <Shoe
                            //                     key={popular.id}
                            //                     shoe={popular.shoe}
                            //                     colorway={popular.colorway}
                            //                     brand={popular.brand}
                            //                     price={popular.retailPrice}
                            //                     gender={popular.gender}
                            //                     year={popular.year}
                            //                     image={popular.media.thumbUrl}
                            //                     Button={() => (
                            //                         <FormBtn className="btn btn-pink tex-center mt-auto"
                            //                             onClick={() => this.handleSaves(popular.id)}
                            //                             id="save-btn" >Save</FormBtn>
                            //                     )}
                            //                 />
                            //                ))}
                            //            </CardDeck>
                            //        ) : (
                            //                 <h2 className="search-for-sneakers text-center" style={{color: "white"}}>These some user favorites!</h2>
                            //             )}
                            //    </div> 
                            )}
                </div>
            </div>
        );
    }
}

export default Browsing;
