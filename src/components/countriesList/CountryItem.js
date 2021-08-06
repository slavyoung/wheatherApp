import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setCountry } from '../store/reducer';

const CountryItem = ({ name }) => {
    const dispatch = useDispatch();

    const handleCountrySelect = () => {
        dispatch(setCountry(name));
    };

    return (
        <div onClick={handleCountrySelect}>{name}</div>
    );
};

CountryItem.propTypes = {};

export default CountryItem;