import{Card, CardImg, CardText, CardBody, CardTitle, Button, CardBlock}from "reactstrap";
import React from"react";
import "../Shoe/style.css";


function Shoe({ shoe, brand, gender, year, image, colorway, price,  Button}) {
    return (
        <div className="text-center mx-auto" style={{paddingBottom: '10px', paddingLeft: '5px', paddingRight: '5px'}}>
        {/* <React.Fragment> */}
            <Card className="mx-auto content-center">
                <CardBody className="mx-auto d-flex flex-column" style={{paddingBlock: '20px', height: '32rem', width: '14rem'}}>
                    <CardTitle style={{fontFamily: "Courier New", fontWeight: "light", fontStyle: 'oblique' }}><strong>{shoe}</strong></CardTitle>
                    <CardImg src={image}  alt="shoe" />
                    <CardText className="card-text" style={{fontFamily: "Helvetica"}}>Brand: {brand}</CardText>    
                    <CardText className="card-text" style={{fontFamily: "Helvetica"}}>Gender: {gender} Year: {year}</CardText>
                    <CardText className="card-text" style={{fontFamily: "Helvetica"}}>Colorway: {colorway}</CardText>
                    <CardText className="card-text" style={{fontFamily: "Helvetica"}}>${price}</CardText>
                    <Button/>
                </CardBody>
            </Card>
        {/* </React.Fragment> */}
        </div>
    )
}
export default Shoe;