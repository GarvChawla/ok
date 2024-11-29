// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import './budgetDetails.css';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const BudgetDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { budget } = location.state;

//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount) {
//       toast.error('Please fill out all fields.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     budget.expenses.push(newExpense);
//     budget.spent += newExpense.amount;
//     setExpenseName('');
//     setExpenseAmount('');

//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const allBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`));
//     const updatedBudgets = allBudgets.map((b) => (b.id === budget.id ? budget : b));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));

//     toast.success('Expense added successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   const pieData = {
//     labels: budget.expenses.map((expense) => expense.name),
//     datasets: [
//       {
//         label: '% of Budget Spent',
//         data: budget.expenses.map((expense) => ((expense.amount / budget.spent) * 100).toFixed(2)),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="budget-details-container">
//       <ToastContainer />
//       <h2>Budget Details: {budget.name}</h2>
//       <div className="budget-summary">
//         <p><strong>Total Amount:</strong> {budget.amount}</p>
//         <p><strong>Total Spent:</strong> {budget.spent}</p>
//         <p><strong>Remaining Amount:</strong> {budget.amount - budget.spent}</p>
//         <div className="progress-bar">
//           <div
//             className="progress-bar-fill"
//             style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       <h3>Add Expense:</h3>
//       <div className="add-expense-section">
//         <input
//           type="text"
//           placeholder="Expense Name"
//           value={expenseName}
//           onChange={(e) => setExpenseName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={expenseAmount}
//           onChange={(e) => setExpenseAmount(e.target.value)}
//         />
//         <button onClick={handleAddExpense}>Add Expense</button>
//       </div>

//       <h3>Expenses:</h3>
//       {budget.expenses.length > 0 ? (
//         <>
//           <table className="expenses-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {budget.expenses.map((expense) => (
//                 <tr key={expense.id}>
//                   <td>{expense.name}</td>
//                   <td>${expense.amount.toFixed(2)}</td>
//                   <td>{expense.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="pie-chart-container">
//             <h3>Expense Distribution</h3>
//             <Pie data={pieData} />
//           </div>
//         </>
//       ) : (
//         <p>No expenses recorded yet.</p>
//       )}

//       <button onClick={() => navigate(-1)} className="go-back-button">Go Back</button>
//     </div>
//   );
// };

// export default BudgetDetails;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import 'react-toastify/dist/ReactToastify.css';
// import './budgetDetails.css';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const BudgetDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { budget } = location.state;

//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD'); // Default currency

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount) {
//       toast.error('Please fill out all fields.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     budget.expenses.push(newExpense);
//     budget.spent += newExpense.amount;
//     setExpenseName('');
//     setExpenseAmount('');

//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const allBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`));
//     const updatedBudgets = allBudgets.map((b) => (b.id === budget.id ? budget : b));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));

//     toast.success('Expense added successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   const handleDeleteExpense = (expenseId) => {
//     budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//     budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);

//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const allBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`));
//     const updatedBudgets = allBudgets.map((b) => (b.id === budget.id ? budget : b));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));

//     toast.info('Expense deleted successfully.', { position: 'top-right', autoClose: 3000 });
//   };

//   const pieData = {
//     labels: budget.expenses.map((expense) => expense.name),
//     datasets: [
//       {
//         label: '% of Budget Spent',
//         data: budget.expenses.map((expense) => ((expense.amount / budget.spent) * 100).toFixed(2)),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-4xl font-bold mb-8">Budget Details: <span className="text-cyan-500">{budget.name}</span></h2>

//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//           <h3 className="text-2xl font-semibold mb-4">Summary</h3>
//           <p><strong>Total Amount:</strong> {currency} {budget.amount.toFixed(2)}</p>
//           <p><strong>Total Spent:</strong> {currency} {budget.spent.toFixed(2)}</p>
//           <p><strong>Remaining Amount:</strong> {currency} {(budget.amount - budget.spent).toFixed(2)}</p>
//           <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
//             <div
//               className="bg-cyan-500 h-4 rounded-full"
//               style={{ width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%` }}
//             ></div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//           <h3 className="text-2xl font-semibold mb-4">Add Expense</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Expense Name"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//               className="px-3 py-2 border rounded-md w-full"
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
//               className="px-3 py-2 border rounded-md w-full"
//             />
//           </div>
//           <button
//             onClick={handleAddExpense}
//             className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//           >
//             Add Expense
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h3 className="text-2xl font-semibold mb-4">Expenses</h3>
//           {budget.expenses.length > 0 ? (
//             <>
//               <table className="min-w-full divide-y divide-gray-200 mb-8">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {budget.expenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.name}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         {currency} {expense.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{expense.date}</td>
//                       <td className="px-6 py-4 text-sm">
//                         <button
//                           onClick={() => handleDeleteExpense(expense.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="pie-chart-container">
//                 <h3 className="text-2xl font-semibold mb-4">Expense Distribution</h3>
//                 <Pie data={pieData} />
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500">No expenses recorded yet.</p>
//           )}
//         </div>

//         <button
//           onClick={() => navigate(-1)}
//           className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BudgetDetails;

// import React, { useState } from 'react';
// import wave from "D:/Web Dev/Money-Mate/PAID GPT/1/BudgetManagerClone/src/pages/wave.svg";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import 'react-toastify/dist/ReactToastify.css';
// import './budgetDetails.css';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const BudgetDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { budget } = location.state;

//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     budget.expenses.push(newExpense);
//     budget.spent += newExpense.amount;
//     setExpenseName('');
//     setExpenseAmount('');

//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const allBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`));
//     const updatedBudgets = allBudgets.map((b) => (b.id === budget.id ? budget : b));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (expenseId) => {
//     budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//     budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);

//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const allBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`));
//     const updatedBudgets = allBudgets.map((b) => (b.id === budget.id ? budget : b));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));

//     toast.info('Expense deleted successfully.', { position: 'top-right', autoClose: 3000 });
//   };

//   const pieData = {
//     labels: budget.expenses.map((expense) => expense.name),
//     datasets: [
//       {
//         label: '% of Budget Spent',
//         data: budget.expenses.map((expense) => ((expense.amount / budget.spent) * 100).toFixed(2)),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-4xl font-bold mb-8">Budget Details: <span className="text-cyan-500">{budget.name}</span></h2>

//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//           <h3 className="text-2xl font-semibold mb-4">Summary</h3>
//           <p><strong>Total Amount:</strong> {currency} {budget.amount.toFixed(2)}</p>
//           <p><strong>Total Spent:</strong> {currency} {budget.spent.toFixed(2)}</p>
//           <p><strong>Remaining Amount:</strong> {currency} {(budget.amount - budget.spent).toFixed(2)}</p>
//           <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
//             <div
//               className="bg-cyan-500 h-4 rounded-full"
//               style={{ width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%` }}
//             ></div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//           <h3 className="text-2xl font-semibold mb-4">Add Expense</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Expense Name"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//               className="px-3 py-2 border rounded-md w-full"
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
//               className="px-3 py-2 border rounded-md w-full"
//             />
//           </div>
//           <button
//             onClick={handleAddExpense}
//             className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//           >
//             Add Expense
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h3 className="text-2xl font-semibold mb-4">Expenses</h3>
//           {budget.expenses.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <table className="min-w-full divide-y divide-gray-200 mb-8">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {budget.expenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.name}</td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         {currency} {expense.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{expense.date}</td>
//                       <td className="px-6 py-4 text-sm">
//                         <button
//                           onClick={() => handleDeleteExpense(expense.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="pie-chart-container">
//                 <h3 className="text-2xl font-semibold mb-4">Expense Distribution</h3>
//                 <Pie data={pieData} />
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">No expenses recorded yet.</p>
//           )}
//         </div>

//         <button
//           onClick={() => navigate(-1)}
//           className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//         >
//           Go Back
//         </button>
//       </div>

//       <div className="w-full mt-8">
//         <img src={wave} alt="Wave Design" className="w-full h-auto" />
//       </div>
//     </div>
//   );
// };

// export default BudgetDetails;


import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import 'react-toastify/dist/ReactToastify.css';
import './budgetDetails.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { budget: initialBudget } = location.state;

  const [budget, setBudget] = useState(initialBudget);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'INR');

  const updateLocalStorage = (updatedBudget) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`));
    const updatedBudgets = allBudgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b));
    localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
  };

  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount) {
      toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      date: new Date().toLocaleDateString(),
    };

    const updatedBudget = {
      ...budget,
      expenses: [...budget.expenses, newExpense],
      spent: budget.spent + newExpense.amount,
    };

    setBudget(updatedBudget);
    updateLocalStorage(updatedBudget);

    setExpenseName('');
    setExpenseAmount('');

    toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const handleDeleteExpense = (expenseId) => {
    const updatedExpenses = budget.expenses.filter((expense) => expense.id !== expenseId);
    const updatedSpent = updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const updatedBudget = { ...budget, expenses: updatedExpenses, spent: updatedSpent };

    setBudget(updatedBudget);
    updateLocalStorage(updatedBudget);

    toast.info('Expense deleted successfully.', { position: 'top-right', autoClose: 3000 });
  };

  const pieData = {
    labels: budget.expenses.map((expense) => expense.name),
    datasets: [
      {
        label: '% of Budget Spent',
        data: budget.expenses.map((expense) => ((expense.amount / budget.spent) * 100).toFixed(2)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dashboard-transition">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold mb-8">
          Budget Details: <span className="text-cyan-500">{budget.name}</span>
        </h2>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Summary</h3>
          <p><strong>Total Amount:</strong> {currency} {budget.amount.toFixed(2)}</p>
          <p><strong>Total Spent:</strong> {currency} {budget.spent.toFixed(2)}</p>
          <p><strong>Remaining Amount:</strong> {currency} {(budget.amount - budget.spent).toFixed(2)}</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-cyan-500 h-4 rounded-full"
              style={{ width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Add Expense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="px-3 py-2 border rounded-md w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="px-3 py-2 border rounded-md w-full"
            />
          </div>
          <button
            onClick={handleAddExpense}
            className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add Expense
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-2xl font-semibold mb-4">Expenses</h3>
          {budget.expenses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <table className="min-w-full divide-y divide-gray-200 mb-8">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {budget.expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {currency} {expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{expense.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pie-chart-container">
                <h3 className="text-2xl font-semibold mb-4">Expense Distribution</h3>
                <Pie data={pieData} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No expenses recorded yet.</p>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Go Back
        </button>
      </div>
    
    </div>
  );
};

export default BudgetDetails;
