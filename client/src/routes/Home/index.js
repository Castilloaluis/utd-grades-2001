import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import reducer from './modules/reducer';
import { rootSaga } from './modules/sagas';
import { submit } from 'redux-form';
import { injectReducer, injectSaga } from 'modules/';
import View from './View';
import * as section from '../../modules/section/actions';
import { normalizedSectionsSelector } from 'modules/section/selectors';

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
  history: ownProps.history,
  sections: normalizedSectionsSelector(state),
  loading: state.section.fetchSections.requesting,
});

const actionCreators = {
  ...section,
  submit,
};

const localActionCreators = {

};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  localActions: bindActionCreators(localActionCreators, dispatch),
});

const Route = withRouter(connect(mapStateToProps, mapDispatchToProps)(View));

export default (store) => {
  injectReducer(store, 'home', reducer);
  injectSaga(store, rootSaga);

  return Route;
};
