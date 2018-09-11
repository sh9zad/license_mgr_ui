import { connect } from "react-redux";
import { addProduct } from '../actions/products';
import { ProductContainer } from '../components/products/productContainer';

export default connect<any, any, any>(null, {
    handleSubmit: addProduct
})(ProductContainer)