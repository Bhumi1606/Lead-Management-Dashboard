import React from 'react';
import './LeadsTable.css';

const LeadsTable = ({ leads, loading, pagination, onPageChange, onLeadClick }) => {
  if (loading) {
    return (
      <div className="leads-table-container">
        <div className="loading">Loading leads...</div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="leads-table-container">
        <div className="no-leads">No leads found</div>
      </div>
    );
  }

  return (
    <div className="leads-table-container">
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Stage</th>
              <th>Status</th>
              <th>Source</th>
              <th>Value</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} onClick={() => onLeadClick(lead._id)} className="table-row">
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.company || 'N/A'}</td>
                <td>
                  <span className={`stage-badge stage-${lead.stage.toLowerCase().replace(/\s+/g, '-')}`}>
                    {lead.stage}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                    {lead.status}
                  </span>
                </td>
                <td>{lead.source}</td>
                <td>${lead.value?.toLocaleString() || '0'}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </span>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsTable;
