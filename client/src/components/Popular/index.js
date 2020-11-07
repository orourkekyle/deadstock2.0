import React, { Component } from "react";
import API from "../../utils/API";
import { FormBtn } from "../Form";
import Shoe from "../Shoe";
import CardDeck from "react-bootstrap/CardDeck";


class Popular extends Component {
    state = {
        popularSneakers: [],
    };

    componentDidMount = () => {
        return this.getPopular();
    }

    getPopular = () => {
        API.getPopular()
            .then(res => {
                console.log("res.data inside popularwishlistdb: ", res.data)
                return this.setState({
                    popularSneakers: res.data
                })
            })
            .catch(() =>
                this.setState({
                    popularSneakers: [],
                    message: "No Sneakers Found in DB"
                }));
    };

    render() {
        return (
            <div>
                {this.state.popularSneakers.length ? (
                    <CardDeck size="sm-4">
                        {this.state.popularSneakers.map(popular => (
                            <Shoe
                            key={popular.id}
                            shoe={popular.shoe}
                            colorway={popular.colorway}
                            brand={popular.brand}
                            price={popular.retailPrice}
                            gender={popular.gender}
                            year={popular.year}
                            image={popular.image}
                            Button={() => (
                                <FormBtn className="btn btn-pink tex-center mt-auto"
                                    onClick={() => this.handleSaves(popular.id)}
                                    id="save-btn" >Save</FormBtn>
                            )}
                        />
                        ))}
                    </CardDeck>
                ) : (
                        <h2 className="search-for-sneakers text-center" style={{color: "white"}}>These some user favorites!</h2>
                    )}
            </div> 
        )
    }
}

export default Popular;