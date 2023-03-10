import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';  

import 'react-toastify/dist/ReactToastify.css';

const ArticleForm = ({ isAuth, pageStatus, submitFunc, article, slug, history }) => {
  return <div>123</div>;
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
});

export default connect(mapStateToProps)(withRouter(ArticleForm));
