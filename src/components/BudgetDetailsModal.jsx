import React from 'react';

const BudgetDetailsModal = ({ budget, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{budget.name} Details</h3>
        <ul>
          {budget.expenses.map((expense) => (
            <li key={expense.id}>
              {expense.name}: {expense.amount} on {expense.date}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BudgetDetailsModal;
