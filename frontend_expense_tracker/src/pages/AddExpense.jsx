import React, { useState } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

/**
 * Add Expense placeholder page with simple form.
 */
// PUBLIC_INTERFACE
export default function AddExpense() {
  const [form, setForm] = useState({ title: '', amount: '' });

  return (
    <div>
      <h1>Add Expense</h1>
      <Card title="New Expense">
        <form
          aria-label="Add expense form"
          onSubmit={(e) => {
            e.preventDefault();
            // Placeholder submit
            alert(`Pretend to save: ${form.title} - $${form.amount}`);
          }}
        >
          <Input
            id="title"
            label="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g., Groceries"
            required
          />
          <Input
            id="amount"
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            placeholder="0.00"
            required
          />
          <Button type="submit">Add Expense</Button>
        </form>
      </Card>
    </div>
  );
}
