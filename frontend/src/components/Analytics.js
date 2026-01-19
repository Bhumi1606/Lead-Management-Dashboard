import React from 'react';
import './Analytics.css';

const Analytics = ({ data }) => {
  const { totalLeads, convertedLeads, leadsByStage, totalValue } = data;

  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  return (
    <div className="analytics">
      <h2>Analytics Overview</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-icon total">📊</div>
          <div className="analytics-content">
            <h3>Total Leads</h3>
            <p className="analytics-value">{totalLeads}</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon converted">✅</div>
          <div className="analytics-content">
            <h3>Converted Leads</h3>
            <p className="analytics-value">{convertedLeads}</p>
            <p className="analytics-subtext">{conversionRate}% conversion rate</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon value">💰</div>
          <div className="analytics-content">
            <h3>Total Value</h3>
            <p className="analytics-value">${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon stages">📈</div>
          <div className="analytics-content">
            <h3>Leads by Stage</h3>
            <div className="stages-list">
              {Object.entries(leadsByStage).map(([stage, count]) => (
                <div key={stage} className="stage-item">
                  <span className="stage-name">{stage}</span>
                  <span className="stage-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
