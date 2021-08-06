import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import CountryItem from './CountryItem';
import './CountriesList.scss';


const CountriesList = () => {
    const countries = useSelector((state) => (state.countries));
    
    return (
        <div className='countires__wrapper'>
            {!!countries?.length > 0 && countries.map((item) => (<CountryItem name={item?.name} key={item?.name} />))}
        </div>
    );
};

CountriesList.propTypes = {};

export default CountriesList;