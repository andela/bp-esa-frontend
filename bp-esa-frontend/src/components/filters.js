import React, { Component } from 'react';
import Search from './search';
import { Row, Col} from 'reactstrap';

class Filters extends Component {
    state = {
        seletedFilterOption: 'date/month',
    }

    handleFilterOptionChange = (event) => {
        this.setState({ seletedFilterOption: event.target.value});
    }

    addDateFieldsForRangeSelection = (criteria) => {
        return(
            <div>
                {
                    ((criteria === 'Date/Month') && (this.state.seletedFilterOption === 'date/month')) &&
                    <Row>
                        <Col sm={6}>
                            <div class="form-group" className="moreFilters">
                                <label htmlFor="fromDate">From</label>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="fromDate"
                                />
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div class="form-group" className="moreFilters">
                                <label htmlFor="toDate">To</label>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="toDate"
                                />
                            </div>
                        </Col>
                    </Row>
       
                }
            </div>
        );
    }

    render() {
        const { filterCriteria, searchInput } = this.props;
        return(
            <Row>
                <Col sm={4}>
                    <fieldset className="form-group">
                    {
                        filterCriteria.map(criteria => (
                        <div className="form-check" key={criteria}>
                            <label className="form-check-label">
                                <input
                                type="radio"
                                className="form-check-input"
                                name="filter"
                                id={criteria.toLowerCase()}
                                value={criteria.toLowerCase()}
                                checked={this.state.seletedFilterOption === criteria.toLowerCase()}
                                onChange={this.handleFilterOptionChange}
                                />
                                {criteria}
                                { this.addDateFieldsForRangeSelection(criteria) }
                            </label>
                        </div>
                        ))
                    }
                    </fieldset>
                </Col>
                <Col sm={8}>
                    {this.state.seletedFilterOption !== 'date/month' && <Search/>}
                </Col>
            </Row>
        );
    }
}

export default Filters;
