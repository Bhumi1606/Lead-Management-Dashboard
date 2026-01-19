import React from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="filters">
      <div className="filters-grid">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by name, email, company, phone..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Stage</label>
          <select
            value={filters.stage}
            onChange={(e) => onFilterChange('stage', e.target.value)}
            className="filter-select"
          >
            <option value="">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Source</label>
          <select
            value={filters.source}
            onChange={(e) => onFilterChange('source', e.target.value)}
            className="filter-select"
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Email Campaign">Email Campaign</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Trade Show">Trade Show</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="createdAt">Created Date</option>
            <option value="name">Name</option>
            <option value="value">Value</option>
            <option value="stage">Stage</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Order</label>
          <select
            value={filters.sortOrder}
            onChange={(e) => onFilterChange('sortOrder', e.target.value)}
            className="filter-select"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="filters-actions">
        <button
          onClick={() => {
            onFilterChange('search', '');
            onFilterChange('stage', '');
            onFilterChange('status', '');
            onFilterChange('source', '');
            onFilterChange('sortBy', 'createdAt');
            onFilterChange('sortOrder', 'desc');
          }}
          className="clear-filters-button"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
