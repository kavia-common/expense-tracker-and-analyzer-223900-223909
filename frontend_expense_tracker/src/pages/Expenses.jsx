import React from 'react';
import Card from '../components/common/Card';

/**
 * Expenses list placeholder page.
 */
// PUBLIC_INTERFACE
export default function Expenses() {
  return (
    <div>
      <h1>Expenses</h1>
      <Card title="Recent Expenses">
        <p>A list of your recent expenses will be displayed here.</p>
      </Card>
    </div>
  );
}
