import { connect } from 'react-redux';
import UnsplashDrawer from './UnsplashDrawer';
import { fetchUnsplashQuery, fetchUnsplashPopular } from '../../../actions/unsplash_actions';

const mapStateToProps = (state) => ({
  images: state.ui.unsplashResults.map((id) => state.entities.unsplash[id]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUnsplashPopular: (page) => dispatch(fetchUnsplashPopular(page)),
  fetchUnsplashQuery: (page, query) => dispatch(fetchUnsplashQuery(page, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnsplashDrawer);