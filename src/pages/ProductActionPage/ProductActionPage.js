import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as action from '../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			txtName : "",
			txtPrice: "",
			chbStatus: ''
		}
	}
	componentDidMount(){
		var { match } = this.props;
		if(match){
			var id = match.params.id; //get id from url
			this.props.onEditProduct(id);
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps && nextProps.itemEditing){
			var {itemEditing} = nextProps;
			console.log(itemEditing);
			this.setState({
				id: itemEditing.id,
				txtName: itemEditing.name,
				txtPrice: itemEditing.price,
				chbStatus: itemEditing.status
			})
		}
	}
	onChange = (e) => {
		var target = e.target,
			name = target.name,
			value = target.type === "checkbox" ? target.checked : target.value;
		this.setState({
			[name] : value
		})
	}
	onSave = (e) => {
		var { history } = this.props;
		var {id, txtName,txtPrice,chbStatus} = this.state;
		var product = {
			id: id,
			name: txtName,
			price: txtPrice,
			status: chbStatus
		}
		e.preventDefault();
		if(id){
			this.props.onUpdateProduct(product);
		}else {
			this.props.onAddProduct(product);
		}
		history.goBack();
	}
  	render() {
		var {txtName,txtPrice,chbStatus} = this.state;
		return (
			<div className="container">			
				<div className="row">			
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">						
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">Add new</h3>
						</div>
						<div className="panel-body">
							<form onSubmit= {this.onSave}>							
							
								<div className="form-group">
									<label>Name:</label>
									<input type="text" 
											className="form-control"
											placeholder="Name" 
											name="txtName" 
											value={txtName}
											onChange = {this.onChange}
											/>
								</div>
								<div className="form-group">
									<label>Price</label>
									<input type="text" 
									className="form-control" 
									placeholder="Price" 
									name="txtPrice"
									value={txtPrice}
									onChange = {this.onChange}
									/>
								</div>
								<div className="form-group">
									<label>Status</label>							
								</div>
								
								<div className="checkbox">
									<label>
										<input type="checkbox" 
										value="" name="chbStatus"
										value={chbStatus}
										onChange = {this.onChange}
										checked = {chbStatus}
										/>
										Available
									</label>
								</div>
								<button type="submit" className="btn btn-primary">Save</button>
								<Link to = "/product-list" className="btn btn-default">Cancle</Link>
							</form>
						</div>
						</div>
					</div>
				</div>
			</div>
		)
  	}
}

const mapStateToProps = (state) => {
	return {
		itemEditing : state.itemEditing
	}
	
}

const mapDispatchToProps = (dispatch, props)=>{
	return {
		onAddProduct : (product) => {
			return dispatch(action.actAddProducRequestApi(product));
		},
		onEditProduct : (id) => {
			return dispatch(action.actEditProductRequestApi(id));
		},
		onUpdateProduct : (product) =>{
			return dispatch(action.actUpdateProductRequestApi(product))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductActionPage);
