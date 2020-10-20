import React from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = API.getCurrentGoogleUser().then(res => { console.log("res.data inside ProtectedRoute: ", res.data)})

        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/'}} />
        );
    }
}

export default ProtectedRoute;