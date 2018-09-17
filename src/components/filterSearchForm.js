import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';

class FilterSearchForm extends Component {
    render() {
        return(
            <div>
                <form>
                    <Row>
                        <Col sm={3}>
                        <fieldset className="form-group">
                            <legend>Search Filter</legend>
                            {
                                 this.props.filterCriteria.map(criteria => (
                                    <div className="form-check">
                                    <label className="form-check-label">
                                        <input
                                        type="radio"
                                        className="form-check-input"
                                        name="filter"
                                        id={criteria.name}
                                        value={criteria.name}
                                        />
                                        {criteria.display}
                                    </label>
                                    </div>
                                 ))
                            }
                        </fieldset>
                        </Col>
                        <Col sm={9}>
                        <div className="form-group">
                            <input
                            type="search"
                            className="form-control"
                            placeholder="&#xF002; Search"
                            id="search"
                            name="search"
                            />
                        </div>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

export default FilterSearchForm;
