// put together profile components
import React, { Component } from "react";
import API from "../utils/API";
import CardDeck from "react-bootstrap/CardDeck";
import Shoe from "../components/Shoe";
import { FormBtn } from "../components/Form";
import Navy from "../components/Nav";
import { Container, Col, Card } from "reactstrap";
import "./profile.css";

class Profile extends Component{
    state = {
        wishlist: [],
        user: {},
        error: null,
        authenticated: false,
        totalprice: [],
        message: "Add Sneakers To Your Wishlist"
    };

    // loads wishlisht on page load
    componentDidMount = () => {
        fetch("http://localhost:3001/oauth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
        .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
            let priceArr = responseJson.user.wishlist.map(wishlistObj => wishlistObj.retailPrice);
            console.log("responseJson inside componentDidMount: ", responseJson.user);
            this.setState({
                authenticated: true,
                user: responseJson.user,
                wishlist: responseJson.user.wishlist,
                totalprice: priceArr
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Failed to authenticate user"
            })
        })
        // this.getuser();
        // return this.loadUserWishlist();
    };

    // gets the user wishlist by their googleId
    // loadUserWishlist = () => {
    //     API.getWishlist()
    //         .then(res => {
    //             console.log("res.data[0].wishlist[0] - inside loadUserWishlist: ", res.data[0].wishlist[0]);
    //             console.log("res.data[0].username - inside loadUserWishlist: ", res.data[0].username);
    //             console.log("map data sneakerPrice arr - inside loadUserWishlist: ", res.data[0].wishlist.map(wishlistObj => wishlistObj.retailPrice));
    //             let priceArr = res.data[0].wishlist.map(wishlistObj => wishlistObj.retailPrice);
    //             return this.setState({
    //                 wishlist: res.data[0].wishlist,
    //                 user: res.data[0].username,
    //                 totalprice: priceArr
    //             });
    //         })
    //         .catch(() =>
    //             this.setState({
    //                 wishlist: [],
    //                 message: "No Sneakers Found"
    //             })
    //         );
    // };

    // deletes sneaker from collection with googleId matching current user as well as sneaker
    removeSneaker = id => {
        API.deleteSneaker(id)
            .then(res => {
                // returns html not json
                console.log(" res.data - inside removeSneaker: ", res.data);
                // returns proper id
                console.log("id - inside removeSneaker: ", id);
                return this.loadUserWishlist();
            })
            .catch(err => console.log(err));
    }


    render() {
        const { authenticated } = this.state;
        return (
            <div>
                <Navy />
                    <Container style={{paddingTop: 100}}>
                        <h1>{this.state.user.username}'s Virtual Closet</h1>
                        {this.state.totalprice.length ? (
                            <Col sm="3" className="mb-5 text-center mx-auto">
                                <Card style={{borderColor: 'green', borderStyle: 'ridge', borderWidth: '4px'}}>
                                    <h5 style={{color: "black"}}>Total Wishlist Amount:</h5>
                                    <strong style={{color: 'green'}}>${this.state.totalprice.reduce((result, number) => result+number)}</strong>
                                </Card>
                            </Col>
                        ) : (
                            <div></div>
                        )}
                        {/* <Row> */}
                            {this.state.wishlist.length ? (
                                <CardDeck size="md-8">
                                    {this.state.wishlist.map(sneakers => (
                                        <Shoe 
                                            key={sneakers.sneakerId}
                                            shoe={sneakers.shoeName}
                                            colorway={sneakers.colorway}
                                            brand={sneakers.brand}
                                            price={sneakers.retailPrice}
                                            gender={sneakers.gender}
                                            year={sneakers.year}
                                            image={sneakers.image}
                                            Button={() => (
                                                <FormBtn className="btn btn-danger text-center mt-auto"
                                                    onClick={() => this.removeSneaker(sneakers.sneakerId)}
                                                    id="delete-sneaker">Remove From Wishlist</FormBtn>
                                            )}
                                        />
                                    ))}
                                </CardDeck>
                            ) : (
                                <h1 className="placeholder text-center">You Don't Have Any Sneakers In Your Wishlist</h1>
                            )}
                        {/* </Row> */}
                    </Container>
            </div>
        )
    }
}


export default Profile;