import React from 'react';

const ReportsTables = (props) => {
    const { tableData: { tableData }, path } = props;

    //Display table data
    const renderTableBody = () => (
        tableData.tableBody.map(data => {
            const pathName = path;
            let bodyContent;
            switch (pathName) {
                case '/':
                    bodyContent = <tr key={data.partner}>
                        <td>{data.partner}</td>
                        <td>{data.slack}</td>
                        <td>{data.freckel}</td>
                        <td>{data.email}</td>
                    </tr>
                    break;
                case '/slack-report':
                    bodyContent = <tr key={data.devName}>
                        <td>{data.devName}</td>
                        <td>{data.slack}</td>
                        <td>{data.date}</td>
                        <td>{data.activity}</td>
                        <td>{data.status}</td>
                    </tr>
                    break;
                case '/freckle-report':
                    bodyContent = <tr key={data.devName}>
                        <td>{data.devName}</td>
                        <td>{data.partner}</td>
                        <td>{data.date}</td>
                        <td>{data.status}</td>
                    </tr>
                    break;
                case '/email-report':
                    bodyContent = <tr key={data.partner}>
                        <td>{data.partner}</td>
                        <td>{data.devName}</td>
                        <td>{data.toEmail}</td>
                        <td>{data.subject}</td>
                        <td>{data.date}</td>
                        <td>{data.status}</td>
                    </tr>
                    break;
                default:
                    bodyContent = '';
            }
            return (<tbody>{bodyContent}</tbody>);
        })
    )

    return(
        <div>
            <table className="report_table">
                <thead>
                    <tr>
                        {
                        tableData.tableHead.map(title => (
                            <th key={title}>{title}</th>
                        ))
                        }
                    </tr>
                </thead>
                {renderTableBody()}
            </table>
            <div className="pagination_container">
                <div className="pagination">
                    <a href="#">&laquo;</a>
                    <a className="active" href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">7</a>
                    <a href="#">8</a>
                    <a href="#">9</a>
                    <a href="#">&raquo;</a>
                </div>
            </div>
        </div>
    );
}

export default ReportsTables;