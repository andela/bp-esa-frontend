import React from 'react';

class ReportPage extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <Sidebar />
        {/* Add dynamic table data component here */}
        <Footer />
      </div>
    );
  }
}

export default ReportPage;
