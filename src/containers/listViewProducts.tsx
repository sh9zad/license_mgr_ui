import { connect } from "react-redux";
import { getProducts } from '../selectors/products';
import { ProductListView } from '../components/products/productListView';
import { IState } from "../reducers";

const mapStateToProps = (state: IState) => ({
    products: getProducts(state)
})

const mapDispatchProps = {
    onProductClicked: {}
}

export default connect<any, any, any>(mapStateToProps, mapDispatchProps)(ProductListView)
