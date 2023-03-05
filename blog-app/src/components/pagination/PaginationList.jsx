import { Pagination } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const PaginationList = ({ getArticles, countArticles, currentPage = 1 }) => {
    return (
        <Pagination 
          defaultCurrent={currentPage}
          total={countArticles}
          onChange={(page) => {
            getArticles(page)
          }}
          defaultPageSize={20}
          showSizeChanger={false}
        />
    );
};

const mapStateToProps = (state) => ({
    countArticles: state.articles.countArticles,
  });

export default connect(mapStateToProps, actions)(PaginationList);