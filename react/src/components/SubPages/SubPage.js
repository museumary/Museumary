import React from 'react';
import Pagination from '../Pagination';

const defaultProps = {
    page: 1,
    entries_per_page: 5
}

class SubPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillMount() {
        let {
            page,
            entries_per_page,
            items
        } = this.props;

        let numPages = parseInt(items.length / entries_per_page);
        if(items.length % entries_per_page !== 0) {
            numPages += 1;
        }

        this.setState({ page: page, items: items, numPages: numPages })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.items}
                </div>
                <br/>
                <Pagination

                />
            </div>
        );
    }
}

SubPage.defaultProps = defaultProps;

export default SubPage;