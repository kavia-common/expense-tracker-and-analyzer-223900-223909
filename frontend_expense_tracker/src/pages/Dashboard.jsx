import React from 'react';
import Card from '../components/common/Card';

/**
 * Dashboard placeholder page.
 */
// PUBLIC_INTERFACE
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Card title="Overview">
        <p>Welcome to your Expense Tracker. Quick insights and summaries will appear here.</p>
      </Card>
    </div>
  );
}
