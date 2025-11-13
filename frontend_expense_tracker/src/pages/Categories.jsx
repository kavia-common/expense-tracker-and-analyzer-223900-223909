import React from 'react';
import Card from '../components/common/Card';

/**
 * Categories placeholder page.
 */
// PUBLIC_INTERFACE
export default function Categories() {
  return (
    <div>
      <h1>Categories</h1>
      <Card title="Manage Categories">
        <p>Create and manage your expense categories here.</p>
      </Card>
    </div>
  );
}
