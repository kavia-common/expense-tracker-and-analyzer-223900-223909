import React from 'react';
import Card from '../components/common/Card';

/**
 * Settings placeholder page.
 */
// PUBLIC_INTERFACE
export default function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Card title="Preferences">
        <p>Update your preferences and account details here.</p>
      </Card>
    </div>
  );
}
