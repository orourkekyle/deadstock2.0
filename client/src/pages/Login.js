// put together our login components (similar to signup)
import React, { Component } from "react";
import "./Login.css";
// import { Container, Row, Col } from "../components/Grid";
import { FormGroup, Row, Col, Container, Form } from "reactstrap";
import { Input, FormBtn } from "../components/Form";


class Login extends Component {

    loginPath = (process.env.NODE_ENV === "production") ? "https://fathomless-shore-38628.herokuapp.com/oauth/google" : "http://localhost:3001/oauth/google";

    render() {
        return (
            <Container fluid >
                <Row fluid >
                    <Col sm="3" className="text-center mx-auto" >
                        <h1 style={{
                            textAlign: "center",
                            paddingTop: "12%"
                        }}>DEADSTOCK</h1>
                        <form style={{ textAlign: "center" }}>
                            <Input
                                style={{ textAlign: "left" }}
                                name="username"
                                placeholder="username"
                            />
                            <Input
                                style={{ textAlign: "left" }}
                                name="password"
                                placeholder="password"
                            />
                            <FormBtn
                                className="btn btn-success"
                                style={{ marginLeft: "auto" }}
                            >
                            <strong>Login</strong>
                            </FormBtn>
                            <a className="nav-link" as='a' href={this.loginPath}>
                                <FormBtn type="button" className="btn btn-danger" >
                                    {/* <img src={googlePlusimg} alt="google" style={{height: "54px", width: "88px", borderRadius: "6px"}} /> */}
                                    <strong>Google+</strong>
                                    {/* <span>
                                        <img src={googleimg} alt="shoe" style={{ width: "30px", float: "right", display: "block", margin: "1px"}} />
                                    </span> */}
                                </FormBtn>
                            </a>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Login;