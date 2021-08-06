import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Map from './map/Map';
import CountriesList from './countriesList/CountriesList';

const ConnectedApp = () => {

    return (
        <Fragment>
            <CountriesList />
            <Map />
        </Fragment>
    );
};

ConnectedApp.propTypes = {};

export default ConnectedApp;