import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../actions/index';
class ProductListPage extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.fetchAllProducts();
	}
	showProduct(products){
		var result = null;
		if(products.length > 0) {
			result =  products.map((product,index)=> {
				return(
					<ProductItem 
						key={index}
						product={product}
						index={index}
						onDelete = {this.onDelete}
					/>
				)
			});
		}
		return result;
	}

	onDelete = (id) =>{
		this.props.onDeleteProduct(id);
		// var { products } = this.state;
		// callApi(`products/${id}`, "DELETE",null).then(res=>{
		// 	if(res.status === 200){
		// 		var index = this.findIndex(products, id);
		// 		if(index !== -1){
		// 			products.splice(index,1);
		// 			this.setState({
		// 				products:products
		// 			})
		// 		}
		// 	}
		// 	console.log(res);
		// });
	}
  	render() {
		var {products} = this.props;	
		return (             
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">						
				<Link to="/product/add" className="btn btn-info">Add Product</Link>						
				<ProductList>
					{this.showProduct(products)}
				</ProductList>
			</div> 
		);
  }
}
const mapStateToProps = (state) => {
	// get from store
    return {
        products : state.products
    }
}
const mapDispatchToProps = (dispatch,props) => {
	// save to store
	return {
		fetchAllProducts : () => {
			dispatch(action.actFetchProductRequestAPI())
		},
		onDeleteProduct : (id) => {
			dispatch(action.actDeleteProductRequestApi(id))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListPage);
