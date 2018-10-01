import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListPage from '../pages/ProductListPage/ProductListPage';


class Products extends Component {
    render() {
        return(
            <div>
               
            </div>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        product : state.products;
    }
}
export default connect(mapStateToProps)(Products);