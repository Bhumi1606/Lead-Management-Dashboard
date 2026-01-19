import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './LeadDetails.css';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/leads/${id}`);
      setLead(response.data);
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="lead-details">
        <header className="details-header">
          <h1>Lead Management Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="lead-details">
        <header className="details-header">
          <h1>Lead Management Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>
        <div className="container">
          <div className="error">Lead not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-details">
      <header className="details-header">
        <h1>Lead Management Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <div className="container">
        <div className="details-actions">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Back to Dashboard
          </button>
        </div>

        <div className="lead-details-card">
          <h2>Lead Details</h2>
          
          <div className="details-grid">
            <div className="detail-item">
              <label>Name</label>
              <div className="detail-value">{lead.name}</div>
            </div>

            <div className="detail-item">
              <label>Email</label>
              <div className="detail-value">
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
              </div>
            </div>

            <div className="detail-item">
              <label>Phone</label>
              <div className="detail-value">
                <a href={`tel:${lead.phone}`}>{lead.phone}</a>
              </div>
            </div>

            <div className="detail-item">
              <label>Company</label>
              <div className="detail-value">{lead.company || 'N/A'}</div>
            </div>

            <div className="detail-item">
              <label>Stage</label>
              <div className="detail-value">
                <span className={`stage-badge stage-${lead.stage.toLowerCase().replace(/\s+/g, '-')}`}>
                  {lead.stage}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <label>Status</label>
              <div className="detail-value">
                <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                  {lead.status}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <label>Source</label>
              <div className="detail-value">{lead.source}</div>
            </div>

            <div className="detail-item">
              <label>Value</label>
              <div className="detail-value">${lead.value?.toLocaleString() || '0'}</div>
            </div>

            <div className="detail-item">
              <label>Assigned To</label>
              <div className="detail-value">{lead.assignedTo || 'Unassigned'}</div>
            </div>

            <div className="detail-item full-width">
              <label>Notes</label>
              <div className="detail-value">{lead.notes || 'No notes available'}</div>
            </div>

            <div className="detail-item">
              <label>Created At</label>
              <div className="detail-value">
                {new Date(lead.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div className="detail-item">
              <label>Last Updated</label>
              <div className="detail-value">
                {new Date(lead.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
