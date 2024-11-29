// // import React, { useState, useEffect } from 'react';
// // import Navbar from '../components/Navbar';
// // import BudgetDetailsModal from '../components/BudgetDetailsModal';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedBudgetDetails, setSelectedBudgetDetails] = useState(null);

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     setSelectedBudgetDetails(budget);
// //     setShowModal(true);
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || !selectedBudget) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.name === selectedBudget) {
// //         const newExpense = {
// //           id: Date.now(),
// //           name: expenseName,
// //           amount: parseFloat(expenseAmount),
// //           date: new Date().toLocaleDateString(),
// //         };
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //         setRecentExpenses((prev) => [newExpense, ...prev]);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteBudget = (budgetId) => {
// //     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     toast.info('Budget deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDownloadData = () => {
// //     const data = budgets.map((budget) => {
// //       return `
// //         Budget Name: ${budget.name}
// //         Total Amount: ${budget.amount}
// //         Expenses:
// //         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
// //       `;
// //     }).join('\n\n');

// //     const blob = new Blob([data], { type: 'text/plain' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'budget_data.txt';
// //     link.click();

// //     toast.info('Budget data downloaded.', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>
// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //               <option value="">Select Budget</option>
// //               {budgets.map((budget) => (
// //                 <option key={budget.id} value={budget.name}>{budget.name}</option>
// //               ))}
// //             </select>
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>

// //           <div className="existing-budgets">
// //             <h3>Existing Budgets</h3>
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount} Budgeted</p>
// //                 <p>{currency} {budget.spent} Spent</p>
// //                 <p>{currency} {budget.amount - budget.spent} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //                 <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             {recentExpenses.slice(0, 5).map((expense) => (
// //               <div key={expense.id}>
// //                 <p>{expense.name}: {currency} {expense.amount} on {expense.date}</p>
// //                 <button
// //                   onClick={() => handleDeleteExpense(
// //                     budgets.find((budget) => budget.expenses.some((e) => e.id === expense.id)).id,
// //                     expense.id
// //                   )}
// //                   className="delete-expense-button"
// //                 >
// //                   Delete Expense
// //                 </button>
// //               </div>
// //             ))}
// //           </div>

// //           <button onClick={handleDownloadData}>Download Budget Data</button>
// //         </>
// //       )}

// //       {showModal && (
// //         <BudgetDetailsModal
// //           budget={selectedBudgetDetails}
// //           onClose={() => setShowModal(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // import React, { useState, useEffect } from 'react';
// // import Navbar from '../components/Navbar';
// // import BudgetDetailsModal from '../components/BudgetDetailsModal';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedBudgetDetails, setSelectedBudgetDetails] = useState(null);

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     navigate(`/budget-details/${budget.id}`, { state: { budget } });
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || !selectedBudget) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.name === selectedBudget) {
// //         const newExpense = {
// //           id: Date.now(),
// //           name: expenseName,
// //           amount: parseFloat(expenseAmount),
// //           date: new Date().toLocaleDateString(),
// //         };
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //         setRecentExpenses((prev) => [newExpense, ...prev]);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteBudget = (budgetId) => {
// //     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     toast.info('Budget deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDownloadData = () => {
// //     const data = budgets.map((budget) => {
// //       return `
// //         Budget Name: ${budget.name}
// //         Total Amount: ${budget.amount}
// //         Expenses:
// //         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
// //       `;
// //     }).join('\n\n');

// //     const blob = new Blob([data], { type: 'text/plain' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'budget_data.txt';
// //     link.click();

// //     toast.info('Budget data downloaded.', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>
// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>

// //         {budgets.length > 0 && (
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //               <option value="">Select Budget</option>
// //               {budgets.map((budget) => (
// //                 <option key={budget.id} value={budget.name}>{budget.name}</option>
// //               ))}
// //             </select>
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>
// //         )}
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="existing-budgets">
// //             <h3>Existing Budgets</h3>
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount} Budgeted</p>
// //                 <p>{currency} {budget.spent} Spent</p>
// //                 <p>{currency} {budget.amount - budget.spent} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //                 <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             {recentExpenses.slice(0, 5).map((expense) => (
// //               <div key={expense.id}>
// //                 <p>{expense.name}: {currency} {expense.amount} on {expense.date}</p>
// //                 <button
// //                   onClick={() => handleDeleteExpense(
// //                     budgets.find((budget) => budget.expenses.some((e) => e.id === expense.id)).id,
// //                     expense.id
// //                   )}
// //                   className="delete-expense-button"
// //                 >
// //                   Delete Expense
// //                 </button>
// //               </div>
// //             ))}
// //           </div>

// //           <button onClick={handleDownloadData}>Download Budget Data</button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // import Navbar from '../components/Navbar';
// // import BudgetDetailsModal from '../components/BudgetDetailsModal';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const navigate = useNavigate(); // Initialize useNavigate hook

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     navigate(`/budget-details/${budget.id}`, { state: { budget } }); // Navigate to budget details page with state
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || !selectedBudget) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.name === selectedBudget) {
// //         const newExpense = {
// //           id: Date.now(),
// //           name: expenseName,
// //           amount: parseFloat(expenseAmount),
// //           date: new Date().toLocaleDateString(),
// //         };
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //         setRecentExpenses((prev) => [newExpense, ...prev]);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteBudget = (budgetId) => {
// //     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     toast.info('Budget deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDownloadData = () => {
// //     const data = budgets.map((budget) => {
// //       return `
// //         Budget Name: ${budget.name}
// //         Total Amount: ${budget.amount}
// //         Expenses:
// //         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
// //       `;
// //     }).join('\n\n');

// //     const blob = new Blob([data], { type: 'text/plain' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'budget_data.txt';
// //     link.click();

// //     toast.info('Budget data downloaded.', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>
// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>

// //         {budgets.length > 0 && (
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //               <option value="">Select Budget</option>
// //               {budgets.map((budget) => (
// //                 <option key={budget.id} value={budget.name}>{budget.name}</option>
// //               ))}
// //             </select>
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>
// //         )}
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="existing-budgets">
// //             <h3>Existing Budgets</h3>
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount} Budgeted</p>
// //                 <p>{currency} {budget.spent} Spent</p>
// //                 <p>{currency} {budget.amount - budget.spent} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //                 <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             {recentExpenses.slice(0, 5).map((expense) => (
// //               <div key={expense.id}>
// //                 <p>{expense.name}: {currency} {expense.amount} on {expense.date}</p>
// //                 <button
// //                   onClick={() => handleDeleteExpense(
// //                     budgets.find((budget) => budget.expenses.some((e) => e.id === expense.id)).id,
// //                     expense.id
// //                   )}
// //                   className="delete-expense-button"
// //                 >
// //                   Delete Expense
// //                 </button>
// //               </div>
// //             ))}
// //           </div>

// //           <button onClick={handleDownloadData}>Download Budget Data</button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom'; 
// // import Navbar from '../components/Navbar';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);

// //       // Fetch recent expenses from all budgets
// //       const allExpenses = userBudgets.flatMap((budget) => 
// //         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
// //       );
// //       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     navigate(`/budget-details/${budget.id}`, { state: { budget } });
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
// //     if (!targetBudget) {
// //       toast.error('Please select a valid budget.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newExpense = {
// //       id: Date.now(),
// //       name: expenseName,
// //       amount: parseFloat(expenseAmount),
// //       date: new Date().toLocaleDateString(),
// //     };

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === targetBudget.id) {
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     // Update recent expenses
// //     setRecentExpenses((prev) => [newExpense, ...prev].slice(0, 5));

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>

// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>

// //         {budgets.length > 0 && (
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             {budgets.length > 1 && (
// //               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //                 <option value="">Select Budget</option>
// //                 {budgets.map((budget) => (
// //                   <option key={budget.id} value={budget.name}>{budget.name}</option>
// //                 ))}
// //               </select>
// //             )}
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>
// //         )}
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="existing-budgets">
// //             <h3>Existing Budgets</h3>
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount} Budgeted</p>
// //                 <p>{currency} {budget.spent} Spent</p>
// //                 <p>{currency} {budget.amount - budget.spent} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             {recentExpenses.map((expense) => (
// //               <div key={expense.id}>
// //                 <p>
// //                   {expense.name}: {currency} {expense.amount} on {expense.date} ({expense.budgetName})
// //                 </p>
// //                 <button
// //                   onClick={() => handleDeleteExpense(
// //                     budgets.find((budget) => budget.name === expense.budgetName).id,
// //                     expense.id
// //                   )}
// //                   className="delete-expense-button"
// //                 >
// //                   Delete Expense
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// // ----------------------------------------------------------------
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom'; 
// // import Navbar from '../components/Navbar';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);

// //       const allExpenses = userBudgets.flatMap((budget) =>
// //         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
// //       );
// //       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     navigate(`/budget-details/${budget.id}`, { state: { budget } });
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
// //     if (!targetBudget) {
// //       toast.error('Please select a valid budget.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newExpense = {
// //       id: Date.now(),
// //       name: expenseName,
// //       amount: parseFloat(expenseAmount),
// //       date: new Date().toLocaleDateString(),
// //     };

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === targetBudget.id) {
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     setRecentExpenses((prev) => [newExpense, ...prev].slice(0, 5));

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteBudget = (budgetId) => {
// //     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));

// //     toast.info('Budget deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDownloadData = () => {
// //     const data = budgets.map((budget) => {
// //       return `
// //         Budget Name: ${budget.name}
// //         Total Amount: ${budget.amount}
// //         Expenses:
// //         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
// //       `;
// //     }).join('\n\n');

// //     const blob = new Blob([data], { type: 'text/plain' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'budget_data.txt';
// //     link.click();

// //     toast.info('Budget data downloaded.', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>

// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>

// //         {budgets.length > 0 && (
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             {budgets.length > 1 && (
// //               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //                 <option value="">Select Budget</option>
// //                 {budgets.map((budget) => (
// //                   <option key={budget.id} value={budget.name}>{budget.name}</option>
// //                 ))}
// //               </select>
// //             )}
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>
// //         )}
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="existing-budgets">
// //             <h3>Existing Budgets</h3>
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount} Budgeted</p>
// //                 <p>{currency} {budget.spent} Spent</p>
// //                 <p>{currency} {budget.amount - budget.spent} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //                 <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             {recentExpenses.map((expense) => (
// //               <div key={expense.id}>
// //                 <p>
// //                   {expense.name}: {currency} {expense.amount} on {expense.date} ({expense.budgetName})
// //                 </p>
// //                 <button
// //                   onClick={() => handleDeleteExpense(
// //                     budgets.find((budget) => budget.name === expense.budgetName).id,
// //                     expense.id
// //                   )}
// //                   className="delete-expense-button"
// //                 >
// //                   Delete Expense
// //                 </button>
// //               </div>
// //             ))}
// //           </div>

// //           <button onClick={handleDownloadData}>Download Budget Data</button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// // old dash recent exp------------------------------------------
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Navbar from '../components/Navbar';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);

// //       const allExpenses = userBudgets.flatMap((budget) =>
// //         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
// //       );
// //       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     navigate(`/budget-details/${budget.id}`, { state: { budget } });
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
// //     if (!targetBudget) {
// //       toast.error('Please select a valid budget.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newExpense = {
// //       id: Date.now(),
// //       name: expenseName,
// //       amount: parseFloat(expenseAmount),
// //       date: new Date().toLocaleDateString(),
// //     };

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === targetBudget.id) {
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     setRecentExpenses((prev) => [newExpense, ...prev].slice(0, 5));

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteBudget = (budgetId) => {
// //     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));

// //     toast.info('Budget deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDownloadData = () => {
// //     const data = budgets.map((budget) => {
// //       return `
// //         Budget Name: ${budget.name}
// //         Total Amount: ${budget.amount}
// //         Expenses:
// //         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
// //       `;
// //     }).join('\n\n');

// //     const blob = new Blob([data], { type: 'text/plain' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'budget_data.txt';
// //     link.click();

// //     toast.info('Budget data downloaded.', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>

// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>

// //         {budgets.length > 0 && (
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             {budgets.length > 1 && (
// //               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //                 <option value="">Select Budget</option>
// //                 {budgets.map((budget) => (
// //                   <option key={budget.id} value={budget.name}>{budget.name}</option>
// //                 ))}
// //               </select>
// //             )}
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>
// //         )}
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="existing-budgets">
// //             <h3>Existing Budgets</h3>
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount.toFixed(2)} Budgeted</p>
// //                 <div className="progress-bar">
// //                   <div
// //                     className="progress-bar-fill"
// //                     style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
// //                   ></div>
// //                 </div>
// //                 <p>{currency} {budget.spent.toFixed(2)} Spent</p>
// //                 <p>{currency} {(budget.amount - budget.spent).toFixed(2)} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //                 <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             {recentExpenses.map((expense) => (
// //               <div key={expense.id}>
// //                 <p>
// //                   {expense.name}: {currency} {expense.amount.toFixed(2)} on {expense.date} ({expense.budgetName})
// //                 </p>
// //                 <button
// //                   onClick={() => handleDeleteExpense(
// //                     budgets.find((budget) => budget.name === expense.budgetName).id,
// //                     expense.id
// //                   )}
// //                   className="delete-expense-button"
// //                 >
// //                   Delete Expense
// //                 </button>
// //               </div>
// //             ))}
// //           </div>

// //           <button onClick={handleDownloadData}>Download Budget Data</button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Navbar from '../components/Navbar';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './dashboard.css';

// // const Dashboard = () => {
// //   const [currency, setCurrency] = useState('');
// //   const [budgetName, setBudgetName] = useState('');
// //   const [budgetAmount, setBudgetAmount] = useState('');
// //   const [budgets, setBudgets] = useState([]);
// //   const [expenseName, setExpenseName] = useState('');
// //   const [expenseAmount, setExpenseAmount] = useState('');
// //   const [selectedBudget, setSelectedBudget] = useState('');
// //   const [recentExpenses, setRecentExpenses] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     if (currentUser) {
// //       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
// //       setBudgets(userBudgets);

// //       const allExpenses = userBudgets.flatMap((budget) =>
// //         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
// //       );
// //       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
// //     }
// //   }, []);

// //   const saveBudgets = (updatedBudgets) => {
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// //     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
// //   };

// //   const handleViewDetails = (budget) => {
// //     navigate(`/budget-details/${budget.id}`, { state: { budget } });
// //   };

// //   const handleCreateBudget = () => {
// //     if (!budgetName || !budgetAmount || !currency) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newBudget = {
// //       id: Date.now(),
// //       name: budgetName,
// //       amount: parseFloat(budgetAmount),
// //       spent: 0,
// //       expenses: [],
// //     };

// //     const updatedBudgets = [...budgets, newBudget];
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setBudgetName('');
// //     setBudgetAmount('');

// //     toast.success('Budget created successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleAddExpense = () => {
// //     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
// //       toast.error('Please fill out all fields.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
// //     if (!targetBudget) {
// //       toast.error('Please select a valid budget.', {
// //         position: 'top-right',
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     const newExpense = {
// //       id: Date.now(),
// //       name: expenseName,
// //       amount: parseFloat(expenseAmount),
// //       date: new Date().toLocaleDateString(),
// //     };

// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === targetBudget.id) {
// //         budget.expenses.push(newExpense);
// //         budget.spent += newExpense.amount;
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setExpenseName('');
// //     setExpenseAmount('');

// //     // Update recent expenses properly without crash
// //     const newRecentExpenses = [ 
// //       { ...newExpense, budgetName: targetBudget.name }, 
// //       ...recentExpenses 
// //     ].slice(0, 5); // Always slice 5 entries to control data length
// //     setRecentExpenses(newRecentExpenses);

// //     toast.success('Expense added successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteBudget = (budgetId) => {
// //     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));

// //     toast.info('Budget deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDeleteExpense = (budgetId, expenseId) => {
// //     const updatedBudgets = budgets.map((budget) => {
// //       if (budget.id === budgetId) {
// //         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
// //         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
// //       }
// //       return budget;
// //     });

// //     saveBudgets(updatedBudgets);
// //     setBudgets(updatedBudgets);
// //     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

// //     toast.info('Expense deleted successfully!', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   const handleDownloadData = () => {
// //     const data = budgets.map((budget) => {
// //       return `
// //         Budget Name: ${budget.name}
// //         Total Amount: ${budget.amount}
// //         Expenses:
// //         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
// //       `;
// //     }).join('\n\n');

// //     const blob = new Blob([data], { type: 'text/plain' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = 'budget_data.txt';
// //     link.click();

// //     toast.info('Budget data downloaded.', {
// //       position: 'top-right',
// //       autoClose: 3000,
// //     });
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <Navbar />
// //       <ToastContainer />
// //       <h2>Welcome to Your Dashboard</h2>

// //       <div className="currency-selector">
// //         <label>Select Currency:</label>
// //         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //           <option value="">Select</option>
// //           <option value="USD">USD</option>
// //           <option value="EUR">EUR</option>
// //           <option value="INR">INR</option>
// //         </select>
// //       </div>

// //       <div className="form-section">
// //         <div className="budget-section">
// //           <h3>Create Budget</h3>
// //           <input
// //             type="text"
// //             placeholder="Budget Name"
// //             value={budgetName}
// //             onChange={(e) => setBudgetName(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={budgetAmount}
// //             onChange={(e) => setBudgetAmount(e.target.value)}
// //           />
// //           <button onClick={handleCreateBudget}>Create Budget</button>
// //         </div>

// //         {budgets.length > 0 && (
// //           <div className="expense-section">
// //             <h3>Add Expense</h3>
// //             <input
// //               type="text"
// //               placeholder="Expense Name"
// //               value={expenseName}
// //               onChange={(e) => setExpenseName(e.target.value)}
// //             />
// //             <input
// //               type="number"
// //               placeholder="Amount"
// //               value={expenseAmount}
// //               onChange={(e) => setExpenseAmount(e.target.value)}
// //             />
// //             {budgets.length > 1 && (
// //               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
// //                 <option value="">Select Budget</option>
// //                 {budgets.map((budget) => (
// //                   <option key={budget.id} value={budget.name}>{budget.name}</option>
// //                 ))}
// //               </select>
// //             )}
// //             <button onClick={handleAddExpense}>Add Expense</button>
// //           </div>
// //         )}
// //       </div>

// //       {budgets.length > 0 && (
// //         <>
// //           <div className="existing-budgets">
            
// //             <h3>Existing Budgets</h3>
// //             <div className='existing-budget-list'>  
// //             {budgets.map((budget) => (
// //               <div key={budget.id} className="budget-card">
// //                 <h4>{budget.name}</h4>
// //                 <p>{currency} {budget.amount.toFixed(2)} Budgeted</p>
// //                 <div className="progress-bar">
// //                   <div
// //                     className="progress-bar-fill"
// //                     style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
// //                   ></div>
// //                 </div>
// //                 <p>{currency} {budget.spent.toFixed(2)} Spent</p>
// //                 <p>{currency} {(budget.amount - budget.spent).toFixed(2)} Remaining</p>
// //                 <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
// //                 <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
// //               </div>
// //             ))}
// //             </div>
// //           </div>

// //           <div className="recent-expenses">
// //             <h3>Recent Expenses</h3>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Amount</th>
// //                   <th>Date</th>
// //                   <th>Budget</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {recentExpenses.map((expense) => (
// //                   <tr key={expense.id}>
// //                     <td>{expense.name}</td>
// //                     <td>{currency} {expense.amount.toFixed(2)}</td>
// //                     <td>{expense.date}</td>
// //                     <td><span className="badge">{expense.budgetName}</span></td>
// //                     <td>
// //                       <button
// //                         onClick={() => handleDeleteExpense(
// //                           budgets.find((budget) => budget.name === expense.budgetName).id,
// //                           expense.id
// //                         )}
// //                         className="delete-expense-button"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <button onClick={handleDownloadData}>Download Budget Data</button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './dashboard.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     }
//   }, []);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', {
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

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [
//       { ...newExpense, budgetName: targetBudget.name },
//       ...recentExpenses,
//     ].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     // Remove related expenses from recent expenses
//     setRecentExpenses((prev) =>
//       prev.filter((expense) => expense.budgetId !== budgetId)
//     );

//     toast.info('Budget deleted successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   const handleDownloadData = () => {
//     const data = budgets.map((budget) => {
//       return `
//         Budget Name: ${budget.name}
//         Total Amount: ${budget.amount}
//         Expenses:
//         ${budget.expenses.map(expense => `  - ${expense.name}: $${expense.amount} on ${expense.date}`).join('\n')}
//       `;
//     }).join('\n\n');

//     const blob = new Blob([data], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'budget_data.txt';
//     link.click();

//     toast.info('Budget data downloaded.', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   return (
//     <div className="dashboard-container">
//       <Navbar />
//       <ToastContainer />
//       <h2>Welcome to Your Dashboard</h2>

//       <div className="currency-selector">
//         <label>Select Currency:</label>
//         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
//           <option value="">Select</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="INR">INR</option>
//         </select>
//       </div>

//       <div className="form-section">
//         <div className="budget-section">
//           <h3>Create Budget</h3>
//           <input
//             type="text"
//             placeholder="Budget Name"
//             value={budgetName}
//             onChange={(e) => setBudgetName(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={budgetAmount}
//             onChange={(e) => setBudgetAmount(e.target.value)}
//           />
//           <button onClick={handleCreateBudget}>Create Budget</button>
//         </div>

//         {budgets.length > 0 && (
//           <div className="expense-section">
//             <h3>Add Expense</h3>
//             <input
//               type="text"
//               placeholder="Expense Name"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
//             />
//             {budgets.length > 1 && (
//               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
//                 <option value="">Select Budget</option>
//                 {budgets.map((budget) => (
//                   <option key={budget.id} value={budget.name}>{budget.name}</option>
//                 ))}
//               </select>
//             )}
//             <button onClick={handleAddExpense}>Add Expense</button>
//           </div>
//         )}
//       </div>

//       {budgets.length > 0 && (
//         <>
//           <div className="existing-budgets">
//             <h3>Existing Budgets</h3>
//             <div className="existing-budget-list">  
//               {budgets.map((budget) => (
//                 <div key={budget.id} className="budget-card">
//                   <h4>{budget.name}</h4>
//                   <p>{currency} {budget.amount.toFixed(2)} Budgeted</p>
//                   <div className="progress-bar">
//                     <div
//                       className="progress-bar-fill"
//                       style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <p>{currency} {budget.spent.toFixed(2)} Spent</p>
//                   <p>{currency} {(budget.amount - budget.spent).toFixed(2)} Remaining</p>
//                   <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
//                   {/* <button onClick={() => handleDeleteBudget(budget.id)} */}
//                   <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">
//                   Delete Budget
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {recentExpenses.length > 0 && (
//           <div className="recent-expenses">
//             <h3>Recent Expenses</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Amount</th>
//                   <th>Date</th>
//                   <th>Budget</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentExpenses.map((expense) => (
//                   <tr key={expense.id}>
//                     <td>{expense.name}</td>
//                     <td>{currency} {expense.amount.toFixed(2)}</td>
//                     <td>{expense.date}</td>
//                     <td><span className="badge">{expense.budgetName}</span></td>
//                     <td>
//                       <button
//                         onClick={() =>
//                           handleDeleteExpense(
//                             budgets.find((budget) => budget.name === expense.budgetName).id,
//                             expense.id
//                           )
//                         }
//                         className="delete-expense-button"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <button onClick={handleDownloadData}>Download Budget Data</button>
//       </>
//     )}
//   </div>
// );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf'; // Import jsPDF
// import 'react-toastify/dist/ReactToastify.css';
// import './dashboard.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     }
//   }, []);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadCSV = () => {
//     const csvContent = [
//       ['Budget Name', 'Total Amount', 'Spent', 'Remaining', 'Currency'],
//       ...budgets.map((budget) => [
//         budget.name,
//         budget.amount.toFixed(2),
//         budget.spent.toFixed(2),
//         (budget.amount - budget.spent).toFixed(2),
//         currency,
//       ]),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'budget_data.csv';
//     link.click();

//     toast.info('CSV file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Budget Summary', 10, 10);
//     let y = 20;

//     budgets.forEach((budget) => {
//       doc.setFontSize(12);
//       doc.text(`Budget Name: ${budget.name}`, 10, y);
//       doc.text(`Total Amount: ${budget.amount.toFixed(2)} ${currency}`, 10, y + 10);
//       doc.text(`Spent: ${budget.spent.toFixed(2)} ${currency}`, 10, y + 20);
//       doc.text(`Remaining: ${(budget.amount - budget.spent).toFixed(2)} ${currency}`, 10, y + 30);
//       y += 40;
//     });

//     doc.save('budget_summary.pdf');
//     toast.info('PDF file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   return (
//     <div className="dashboard-container">
//       <Navbar />
//       <ToastContainer />
//       <h2>Welcome to Your Dashboard</h2>

//       <div className="currency-selector">
//         <label>Select Currency:</label>
//         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
//           <option value="">Select</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="INR">INR</option>
//         </select>
//       </div>

//       <div className="form-section">
//         <div className="budget-section">
//           <h3>Create Budget</h3>
//           <input
//             type="text"
//             placeholder="Budget Name"
//             value={budgetName}
//             onChange={(e) => setBudgetName(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={budgetAmount}
//             onChange={(e) => setBudgetAmount(e.target.value)}
//           />
//           <button onClick={handleCreateBudget}>Create Budget</button>
//         </div>

//         {budgets.length > 0 && (
//           <div className="expense-section">
//             <h3>Add Expense</h3>
//             <input
//               type="text"
//               placeholder="Expense Name"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
//             />
//             {budgets.length > 1 && (
//               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
//                 <option value="">Select Budget</option>
//                 {budgets.map((budget) => (
//                   <option key={budget.id} value={budget.name}>
//                     {budget.name}
//                   </option>
//                   // </option>
//                 ))}
//               </select>
//             )}
//             <button onClick={handleAddExpense}>Add Expense</button>
//           </div>
//         )}
//       </div>

//       {budgets.length > 0 && (
//         <>
//           <div className="existing-budgets">
//             <h3>Existing Budgets</h3>
//             <div className="existing-budget-list">
//               {budgets.map((budget) => (
//                 <div key={budget.id} className="budget-card">
//                   <h4>{budget.name}</h4>
//                   <p>{currency} {budget.amount.toFixed(2)} Budgeted</p>
//                   <div className="progress-bar">
//                     <div
//                       className="progress-bar-fill"
//                       style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <p>{currency} {budget.spent.toFixed(2)} Spent</p>
//                   <p>{currency} {(budget.amount - budget.spent).toFixed(2)} Remaining</p>
//                   <button onClick={() => handleViewDetails(budget)} className="details-button">View Details</button>
//                   <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">Delete Budget</button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {recentExpenses.length > 0 && (
//             <div className="recent-expenses">
//               <h3>Recent Expenses</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                     <th>Budget</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentExpenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td>{expense.name}</td>
//                       <td>{currency} {expense.amount.toFixed(2)}</td>
//                       <td>{expense.date}</td>
//                       <td><span className="badge">{expense.budgetName}</span></td>
//                       <td>
//                         <button
//                           onClick={() =>
//                             handleDeleteExpense(
//                               budgets.find((budget) => budget.name === expense.budgetName).id,
//                               expense.id
//                             )
//                           }
//                           className="delete-expense-button"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <div className="download-buttons">
//             <button onClick={handleDownloadCSV}>Download CSV</button>
//             <button onClick={handleDownloadPDF}>Download PDF</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf'; // Import jsPDF
// import 'react-toastify/dist/ReactToastify.css';
// import './dashboard.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     }
//   }, []);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadCSV = () => {
//     const csvContent = [
//       ['Budget Name', 'Total Amount', 'Spent', 'Remaining', 'Currency', 'Expense Name', 'Expense Amount', 'Expense Date'],
//       ...budgets.flatMap((budget) =>
//         budget.expenses.map((expense) => [
//           budget.name,
//           budget.amount.toFixed(2),
//           budget.spent.toFixed(2),
//           (budget.amount - budget.spent).toFixed(2),
//           currency,
//           expense.name,
//           expense.amount.toFixed(2),
//           expense.date,
//         ])
//       ),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'budget_data_with_expenses.csv';
//     link.click();

//     toast.info('CSV file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Budget Summary with Expenses', 10, 10);
//     let y = 20;

//     budgets.forEach((budget) => {
//       doc.setFontSize(12);
//       doc.text(`Budget Name: ${budget.name}`, 10, y);
//       doc.text(`Total Amount: ${budget.amount.toFixed(2)} ${currency}`, 10, y + 10);
//       doc.text(`Spent: ${budget.spent.toFixed(2)} ${currency}`, 10, y + 20);
//       doc.text(`Remaining: ${(budget.amount - budget.spent).toFixed(2)} ${currency}`, 10, y + 30);
//       y += 40;

//       doc.text('Expenses:', 10, y);
//       budget.expenses.forEach((expense, index) => {
//         doc.text(
//           `${index + 1}. ${expense.name} - ${expense.amount.toFixed(2)} ${currency} on ${expense.date}`,
//           10,
//           y + 10
//         );
//         y += 10;
//       });
//       y += 10;
//     });

//     doc.save('budget_summary_with_expenses.pdf');
//     toast.info('PDF file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   return (
//     <div className="dashboard-container">
//       <Navbar />
//       <ToastContainer />
//       <h2>Welcome to Your Dashboard</h2>

//       <div className="currency-selector">
//         <label>Select Currency:</label>
//         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
//           <option value="">Select</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="INR">INR</option>
//         </select>
//       </div>

//       <div className="form-section">
//         <div className="budget-section">
//           <h3>Create Budget</h3>
//           <input
//             type="text"
//             placeholder="Budget Name"
//             value={budgetName}
//             onChange={(e) => setBudgetName(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={budgetAmount}
//             onChange={(e) => setBudgetAmount(e.target.value)}
//           />
//           <button onClick={handleCreateBudget}>Create Budget</button>
//         </div>

//         {budgets.length > 0 && (
//           <div className="expense-section">
//             <h3>Add Expense</h3>
//             <input
//               type="text"
//               placeholder="Expense Name"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
//             />
//             {budgets.length > 1 && (
//               <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
//                 <option value="">Select Budget</option>
//                 {budgets.map((budget) => (
//                   // <option key={budget.id} value={
//                     <option key={budget.id} value={budget.name}>
//                     {budget.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//             <button onClick={handleAddExpense}>Add Expense</button>
//           </div>
//         )}
//       </div>

//       {budgets.length > 0 && (
//         <>
//           <div className="existing-budgets">
//             <h3>Existing Budgets</h3>
//             <div className="existing-budget-list">
//               {budgets.map((budget) => (
//                 <div key={budget.id} className="budget-card">
//                   <h4>{budget.name}</h4>
//                   <p>
//                     {currency} {budget.amount.toFixed(2)} Budgeted
//                   </p>
//                   <div className="progress-bar">
//                     <div
//                       className="progress-bar-fill"
//                       style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <p>
//                     {currency} {budget.spent.toFixed(2)} Spent
//                   </p>
//                   <p>
//                     {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
//                   </p>
//                   <button onClick={() => handleViewDetails(budget)} className="details-button">
//                     View Details
//                   </button>
//                   <button onClick={() => handleDeleteBudget(budget.id)} className="delete-button">
//                     Delete Budget
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {recentExpenses.length > 0 && (
//             <div className="recent-expenses">
//               <h3>Recent Expenses</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                     <th>Budget</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentExpenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td>{expense.name}</td>
//                       <td>
//                         {currency} {expense.amount.toFixed(2)}
//                       </td>
//                       <td>{expense.date}</td>
//                       <td>
//                         <span className="badge">{expense.budgetName}</span>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() =>
//                             handleDeleteExpense(
//                               budgets.find((budget) => budget.name === expense.budgetName).id,
//                               expense.id
//                             )
//                           }
//                           className="delete-expense-button"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <div className="download-buttons">
//             <button onClick={handleDownloadCSV}>Download CSV</button>
//             <button onClick={handleDownloadPDF}>Download PDF</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf';
// import { HomeIcon, PlusCircle, Trash2 } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('USD');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     }
//   }, []);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadCSV = () => {
//     const csvContent = [
//       ['Budget Name', 'Total Amount', 'Spent', 'Remaining', 'Currency', 'Expense Name', 'Expense Amount', 'Expense Date'],
//       ...budgets.flatMap((budget) =>
//         budget.expenses.map((expense) => [
//           budget.name,
//           budget.amount.toFixed(2),
//           budget.spent.toFixed(2),
//           (budget.amount - budget.spent).toFixed(2),
//           currency,
//           expense.name,
//           expense.amount.toFixed(2),
//           expense.date,
//         ])
//       ),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'budget_data_with_expenses.csv';
//     link.click();

//     toast.info('CSV file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Budget Summary with Expenses', 10, 10);
//     let y = 20;

//     budgets.forEach((budget) => {
//       doc.setFontSize(12);
//       doc.text(`Budget Name: ${budget.name}`, 10, y);
//       doc.text(`Total Amount: ${budget.amount.toFixed(2)} ${currency}`, 10, y + 10);
//       doc.text(`Spent: ${budget.spent.toFixed(2)} ${currency}`, 10, y + 20);
//       doc.text(`Remaining: ${(budget.amount - budget.spent).toFixed(2)} ${currency}`, 10, y + 30);
//       y += 40;

//       doc.text('Expenses:', 10, y);
//       budget.expenses.forEach((expense, index) => {
//         doc.text(
//           `${index + 1}. ${expense.name} - ${expense.amount.toFixed(2)} ${currency} on ${expense.date}`,
//           10,
//           y + 10
//         );
//         y += 10;
//       });
//       y += 10;
//     });

//     doc.save('budget_summary_with_expenses.pdf');
//     toast.info('PDF file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer />
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <HomeIcon className="h-8 w-8 text-cyan-500" />
//               <span className="ml-2 text-xl font-semibold">MoneyMate</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <select 
//                 className="px-3 py-2 border rounded-md"
//                 value={currency} 
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="INR">INR</option>
//               </select>
//               <button className="text-red-500 flex items-center">
//                 <Trash2 className="h-5 w-5 mr-1" />
//                 Delete User
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mb-8">
//           Welcome back, <span className="text-cyan-500">User</span>
//         </h1>

//         {/* Forms Grid */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           {/* Create Budget Form */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Create budget</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Groceries"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetName}
//                   onChange={(e) => setBudgetName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="e.g., 350"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetAmount}
//                   onChange={(e) => setBudgetAmount(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleCreateBudget}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Create budget
//               </button>
//             </div>
//           </div>

//           {/* Add Expense Form */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Coffee"
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={expenseName}
//                     onChange={(e) => setExpenseName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                   <input
//                     type="number"
//                     placeholder="e.g., 3.50"
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={expenseAmount}
//                     onChange={(e) => setExpenseAmount(e.target.value)}
//                   />
//                 </div>
//               </div>
//               {budgets.length > 1 && (
//                 <select
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={selectedBudget}
//                   onChange={(e) => setSelectedBudget(e.target.value)}
//                 >
//                   <option value="">Select Budget</option>
//                   {budgets.map((budget) => (
//                     <option key={budget.id} value={budget.name}>
//                       {budget.name}
//                     </option>
//                   ))}
//                 </select>
//               )}
//               <button
//                 onClick={handleAddExpense}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Add Expense
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Existing Budgets */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Existing Budgets</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {budgets.map((budget) => (
//               <div key={budget.id} className="bg-white rounded-lg shadow-sm border p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">{budget.name}</h3>
//                   <span className="text-lg font-semibold">
//                     {currency} {budget.amount.toFixed(2)} Budgeted
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//                   <div
//                     className="bg-cyan-500 h-4 rounded-full"
//                     style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>
//                     {currency} {budget.spent.toFixed(2)} Spent
//                   </span>
//                   <span className="text-gray-500">
//                     {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
//                   </span>
//                 </div>
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     onClick={() => handleViewDetails(budget)}
//                     className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => handleDeleteBudget(budget.id)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Expenses */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
//           <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentExpenses.map((expense) => (
//                   <tr key={expense.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.budgetName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {currency} {expense.amount.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <button
//                         onClick={() => handleDeleteExpense(expense.budgetId, expense.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Export Options */}
//         <div className="flex gap-4">
//           <button
//             onClick={handleDownloadCSV}
//             className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//           >
//             Download CSV
//           </button>
//           <button
//             onClick={handleDownloadPDF}
//             className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// -----
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf';
// import { HomeIcon, PlusCircle, Trash2, LogOut } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('USD');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     } else {
//       navigate('/login'); // Redirect to login if no user is logged in
//     }
//   }, [navigate]);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleDeleteUser = () => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       localStorage.removeItem(`budgets_${currentUser.id}`);
//       localStorage.removeItem('currentUser');
//       setBudgets([]);
//       setRecentExpenses([]);
//       toast.success('User deleted successfully!', { position: 'top-right', autoClose: 3000 });
//       navigate('/login'); // Redirect to login after deletion
//     }
//   };

//   const handleLogout = () => {
//     toast.info('Logged out successfully!', { position: 'top-right', autoClose: 3000 });
//     navigate('/login');
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadCSV = () => {
//     const csvContent = [
//       ['Budget Name', 'Total Amount', 'Spent', 'Remaining', 'Currency', 'Expense Name', 'Expense Amount', 'Expense Date'],
//       ...budgets.flatMap((budget) =>
//         budget.expenses.map((expense) => [
//           budget.name,
//           budget.amount.toFixed(2),
//           budget.spent.toFixed(2),
//           (budget.amount - budget.spent).toFixed(2),
//           currency,
//           expense.name,
//           expense.amount.toFixed(2),
//           expense.date,
//         ])
//       ),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'budget_data_with_expenses.csv';
//     link.click();

//     toast.info('CSV file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Budget Summary with Expenses', 10, 10);
//     let y = 20;

//     budgets.forEach((budget) => {
//       doc.setFontSize(12);
//       doc.text(`Budget Name: ${budget.name}`, 10, y);
//       doc.text(`Total Amount: ${budget.amount.toFixed(2)} ${currency}`, 10, y + 10);
//       doc.text(`Spent: ${budget.spent.toFixed(2)} ${currency}`, 10, y + 20);
//       doc.text(`Remaining: ${(budget.amount - budget.spent).toFixed(2)} ${currency}`, 10, y + 30);
//       y += 40;

//       doc.text('Expenses:', 10, y);
//       budget.expenses.forEach((expense, index) => {
//         doc.text(
//           `${index + 1}. ${expense.name} - ${expense.amount.toFixed(2)} ${currency} on ${expense.date}`,
//           10,
//           y + 10
//         );
//         y += 10;
//       });
//       y += 10;
//     });

//     doc.save('budget_summary_with_expenses.pdf');
//     toast.info('PDF file downloaded.', { position: 'top-right', autoClose: 3000 });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer />
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <HomeIcon className="h-8 w-8 text-cyan-500" />
//               <span className="ml-2 text-xl font-semibold">MoneyMate</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <select
//                 className="px-3 py-2 border rounded-md"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="INR">INR</option>
//               </select>
//               <button 
//                 onClick={handleDeleteUser} 
//                 className="text-red-500 flex items-center"
//               >
//                 <Trash2 className="h-5 w-5 mr-1" />
//                 Delete User
//               </button>
//               <button 
//                 onClick={handleLogout} 
//                 className="text-gray-700 flex items-center"
//               >
//                 <LogOut className="h-5 w-5 mr-1" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <h1 className="text-4xl font-bold mb-8">
//           Welcome back, <span className="text-cyan-500">User</span>
//         </h1>

//         {/* Forms Grid */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           {/* Create Budget Form */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Create budget</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Groceries"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetName}
//                   onChange={(e) => setBudgetName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="e.g., 350"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetAmount}
//                   onChange={(e) => setBudgetAmount(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleCreateBudget}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Create budget
//               </button>
//             </div>
//           </div>

//           {/* Add Expense Form */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Coffee"
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={expenseName}
//                     onChange={(e) => setExpenseName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                   <input
//                     type="number"
//                     placeholder="e.g., 3.50"
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={expenseAmount}
//                     onChange={(e) => setExpenseAmount(e.target.value)}
//                   />
//                 </div>
//               </div>
//               {budgets.length > 1 && (
//                 <select
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={selectedBudget}
//                   onChange={(e) => setSelectedBudget(e.target.value)}
//                 >
//                   <option value="">Select Budget</option>
//                   {budgets.map((budget) => (
//                     <option key={budget.id} value={budget.name}>
//                       {budget.name}
//                     </option>
//                   ))}
//                 </select>
//               )}
//               <button
//                 onClick={handleAddExpense}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Add Expense
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Existing Budgets */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Existing Budgets</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {budgets.map((budget) => (
//               <div key={budget.id} className="bg-white rounded-lg shadow-sm border p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">{budget.name}</h3>
//                   <span className="text-lg font-semibold">
//                     {currency} {budget.amount.toFixed(2)} Budgeted
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//                   <div
//                     className="bg-cyan-500 h-4 rounded-full"
//                     style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>
//                     {currency} {budget.spent.toFixed(2)} Spent
//                   </span>
//                   <span className="text-gray-500">
//                     {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
//                   </span>
//                 </div>
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     onClick={() => handleViewDetails(budget)}
//                     className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => handleDeleteBudget(budget.id)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Expenses */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
//           <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentExpenses.map((expense) => (
//                   <tr key={expense.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.budgetName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {currency} {expense.amount.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <button
//                         onClick={() => handleDeleteExpense(expense.budgetId, expense.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Export Options */}
//         <div className="flex gap-4">
//           <button
//             onClick={handleDownloadCSV}
//             className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//           >
//             Download CSV
//           </button>
//           <button
//             onClick={handleDownloadPDF}
//             className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import wave from "D:/Web Dev/Money-Mate/PAID GPT/1/BudgetManagerClone/src/pages/wave.svg";
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf';
// import { HomeIcon, PlusCircle, Trash2, LogOut } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('USD');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       setUsername(currentUser.username);
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleDeleteUser = () => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       localStorage.removeItem(`budgets_${currentUser.id}`);
//       localStorage.removeItem('currentUser');
//       setBudgets([]);
//       setRecentExpenses([]);
//       toast.success('User deleted successfully!', { position: 'top-right', autoClose: 3000 });
//       navigate('/login');
//     }
//   };

//   const handleLogout = () => {
//     toast.info('Logged out successfully!', { position: 'top-right', autoClose: 3000 });
//     navigate('/login');
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dashboard-transition">
//       <ToastContainer />
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <HomeIcon className="h-8 w-8 text-cyan-500" />
//               <span className="ml-2 text-xl font-semibold">MoneyMate</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <select
//                 className="px-3 py-2 border rounded-md"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="INR">INR</option>
//               </select>
//               <button 
//                 onClick={handleDeleteUser} 
//                 className="text-red-500 flex items-center"
//               >
//                 <Trash2 className="h-5 w-5 mr-1" />
//                 Delete User
//               </button>
//               <button 
//                 onClick={handleLogout} 
//                 className="text-gray-700 flex items-center"
//               >
//                 <LogOut className="h-5 w-5 mr-1" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-4xl font-bold mb-8">
//           Welcome back, <span className="text-cyan-500">{username}</span>
//         </h1>

//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Create budget</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Groceries"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetName}
//                   onChange={(e) => setBudgetName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="e.g., 350"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetAmount}
//                   onChange={(e) => setBudgetAmount(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleCreateBudget}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Create budget
//               </button>
//             </div>
//           </div>

//           {budgets.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Coffee"
//                       className="w-full px-3 py-2 border rounded-md"
//                       value={expenseName}
//                       onChange={(e) => setExpenseName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 3.50"
//                       className="w-full px-3 py-2 border rounded-md"
//                       value={expenseAmount}
//                       onChange={(e) => setExpenseAmount(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 {budgets.length > 1 && (
//                   <select
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={selectedBudget}
//                     onChange={(e) => setSelectedBudget(e.target.value)}
//                   >
//                     <option value="">Select Budget</option>
//                     {budgets.map((budget) => (
//                       <option key={budget.id} value={budget.name}>
//                         {budget.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 <button
//                   onClick={handleAddExpense}
//                   className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//                 >
//                   <PlusCircle className="h-5 w-5 mr-2" />
//                   Add Expense
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {budgets.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Existing Budgets</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               {budgets.map((budget) => (
//                 <div key={budget.id} className="bg-white rounded-lg shadow-sm border p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">{budget.name}</h3>
//                     <span className="text-lg font-semibold">
//                       {currency} {budget.amount.toFixed(2)} Budgeted
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//                     <div
//                       className="bg-cyan-500 h-4 rounded-full"
//                       style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>
//                       {currency} {budget.spent.toFixed(2)} Spent
//                     </span>
//                     <span className="text-gray-500">
//                       {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
//                     </span>
//                   </div>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => handleViewDetails(budget)}
//                       className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => handleDeleteBudget(budget.id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {recentExpenses.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
//             <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Budget
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {recentExpenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.budgetName}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {currency} {expense.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button
//                           onClick={() => handleDeleteExpense(expense.budgetId, expense.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {budgets.length > 0 && (
//           <div className="flex gap-4">
//             <button
//               onClick={() => console.log('Download CSV')}
//               className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//             >
//               Download CSV
//             </button>
//             <button
//               onClick={() => console.log('Download PDF')}
//               className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
//             >
//               Download PDF
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="w-full mt-8">
//        <img src={wave} alt="Wave Design" className="w-full h-auto" />
//   </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import wave from "D:/Web Dev/Money-Mate/PAID GPT/1/BudgetManagerClone/src/pages/wave.svg";
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf';
// import { HomeIcon, PlusCircle, Trash2, LogOut } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('USD');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       setUsername(currentUser.username);
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleDeleteUser = () => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       localStorage.removeItem(`budgets_${currentUser.id}`);
//       localStorage.removeItem('currentUser');
//       setBudgets([]);
//       setRecentExpenses([]);
//       toast.success('User deleted successfully!', { position: 'top-right', autoClose: 3000 });
//       navigate('/login');
//     }
//   };

//   const handleLogout = () => {
//     toast.info('Logged out successfully!', { position: 'top-right', autoClose: 3000 });
//     navigate('/login');
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setRecentExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

  

//   const downloadCSV = () => {
//     if (budgets.length === 0) return;

//     let csvContent = [];
//     let headers = ['Budget Name', 'Total Amount', 'Spent Amount', 'Remaining Amount'];
    
//     const hasExpenses = budgets.some(budget => budget.expenses.length > 0);
//     if (hasExpenses) {
//       headers = [...headers, 'Expense Name', 'Expense Amount', 'Date'];
//     }
    
//     csvContent.push(headers);

//     budgets.forEach(budget => {
//       if (budget.expenses.length === 0) {
//         csvContent.push([
//           budget.name,
//           budget.amount,
//           budget.spent,
//           budget.amount - budget.spent
//         ]);
//       } else {
//         budget.expenses.forEach(expense => {
//           csvContent.push([
//             budget.name,
//             budget.amount,
//             budget.spent,
//             budget.amount - budget.spent,
//             expense.name,
//             expense.amount,
//             expense.date
//           ]);
//         });
//       }
//     });

//     const csvString = csvContent.map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute('download', `budget_report_${new Date().toLocaleDateString()}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadPDF = () => {
//     if (budgets.length === 0) return;

//     const doc = new jsPDF();
//     let yOffset = 20;
//     const pageHeight = doc.internal.pageSize.height;
    
//     doc.setFontSize(16);
//     doc.text(`Budget Report for ${username}`, 10, 10);
    
//     doc.setFontSize(10);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, yOffset);
//     yOffset += 10;

//     budgets.forEach((budget, index) => {
//       if (yOffset > pageHeight - 20) {
//         doc.addPage();
//         yOffset = 20;
//       }

//       doc.setFontSize(12);
//       doc.setFont(undefined, 'bold');
//       doc.text(`Budget: ${budget.name}`, 10, yOffset);
//       yOffset += 7;

//       doc.setFontSize(10);
//       doc.setFont(undefined, 'normal');
//       doc.text(`Total Amount: ${currency} ${budget.amount.toFixed(2)}`, 15, yOffset);
//       yOffset += 5;
//       doc.text(`Spent Amount: ${currency} ${budget.spent.toFixed(2)}`, 15, yOffset);
//       yOffset += 5;
//       doc.text(`Remaining Amount: ${currency} ${(budget.amount - budget.spent).toFixed(2)}`, 15, yOffset);
//       yOffset += 10;

//       if (budget.expenses.length > 0) {
//         doc.setFont(undefined, 'bold');
//         doc.text('Expenses:', 15, yOffset);
//         yOffset += 5;
//         doc.setFont(undefined, 'normal');

//         budget.expenses.forEach((expense) => {
//           if (yOffset > pageHeight - 20) {
//             doc.addPage();
//             yOffset = 20;
//           }
          
//           doc.text(`- ${expense.name}: ${currency} ${expense.amount.toFixed(2)} (${expense.date})`, 20, yOffset);
//           yOffset += 5;
//         });
//       }
      
//       yOffset += 10;
//     });

//     doc.save(`budget_report_${new Date().toLocaleDateString()}.pdf`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dashboard-transition">
//       <ToastContainer />
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <HomeIcon className="h-8 w-8 text-cyan-500" />
//               <span className="ml-2 text-xl font-semibold">MoneyMate</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <select
//                 className="px-3 py-2 border rounded-md"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="INR">INR</option>
//               </select>
//               <button 
//                 onClick={handleDeleteUser} 
//                 className="text-red-500 flex items-center"
//               >
//                 <Trash2 className="h-5 w-5 mr-1" />
//                 Delete User
//               </button>
//               <button 
//                 onClick={handleLogout} 
//                 className="text-gray-700 flex items-center"
//               >
//                 <LogOut className="h-5 w-5 mr-1" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-4xl font-bold mb-8">
//           Welcome back, <span className="text-cyan-500">{username}</span>
//         </h1>

//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Create budget</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Groceries"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetName}
//                   onChange={(e) => setBudgetName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="e.g., 350"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetAmount}
//                   onChange={(e) => setBudgetAmount(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleCreateBudget}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Create budget
//               </button>
//             </div>
//           </div>

//           {budgets.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Coffee"
//                       className="w-full px-3 py-2 border rounded-md"
//                       value={expenseName}
//                       onChange={(e) => setExpenseName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 3.50"
//                       className="w-full px-3 py-2 border rounded-md"
//                       value={expenseAmount}
//                       onChange={(e) => setExpenseAmount(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 {budgets.length > 1 && (
//                   <select
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={selectedBudget}
//                     onChange={(e) => setSelectedBudget(e.target.value)}
//                   >
//                     <option value="">Select Budget</option>
//                     {budgets.map((budget) => (
//                       <option key={budget.id} value={budget.name}>
//                         {budget.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 <button
//                   onClick={handleAddExpense}
//                   className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//                 >
//                   <PlusCircle className="h-5 w-5 mr-2" />
//                   Add Expense
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {budgets.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Existing Budgets</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               {budgets.map((budget) => (
//                 <div key={budget.id} className="bg-white rounded-lg shadow-sm border p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">{budget.name}</h3>
//                     <span className="text-lg font-semibold">
//                       {currency} {budget.amount.toFixed(2)} Budgeted
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//                     <div
//                       className="bg-cyan-500 h-4 rounded-full"
//                       style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>
//                       {currency} {budget.spent.toFixed(2)} Spent
//                     </span>
//                     <span className="text-gray-500">
//                       {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
//                     </span>
//                   </div>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => handleViewDetails(budget)}
//                       className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => handleDeleteBudget(budget.id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {recentExpenses.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
//             <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Budget
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {recentExpenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.budgetName}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {currency} {expense.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button
//                           onClick={() => handleDeleteExpense(expense.budgetId, expense.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

// {budgets.length > 0 && (
//           <div className="flex gap-4">
//             <button onClick={downloadCSV} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
//               Download CSV
//             </button>
//             <button onClick={downloadPDF} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
//               Download PDF
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="w-full mt-8">
//        <img src={wave} alt="Wave Design" className="w-full h-auto" />
//   </div>
//     </div>
//   );
// };

// export default Dashboard;
//recent--------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import wave from "D:/Web Dev/Money-Mate/PAID GPT/1/BudgetManagerClone/src/pages/wave.svg";
// import { ToastContainer, toast } from 'react-toastify';
// import { jsPDF } from 'jspdf';
// import { HomeIcon, PlusCircle, Trash2, LogOut } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const Dashboard = () => {
//   const [currency, setCurrency] = useState('USD');
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [budgets, setBudgets] = useState([]);
//   const [expenseName, setExpenseName] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [selectedBudget, setSelectedBudget] = useState('');
//   const [recentExpenses, setRecentExpenses] = useState([]);
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       setUsername(currentUser.username);
//       const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
//       setBudgets(userBudgets);

//       const allExpenses = userBudgets.flatMap((budget) =>
//         budget.expenses.map((expense) => ({ ...expense, budgetName: budget.name }))
//       );
//       setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const saveBudgets = (updatedBudgets) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
//   };

//   const handleDeleteUser = () => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       localStorage.removeItem(`budgets_${currentUser.id}`);
//       localStorage.removeItem('currentUser');
//       setBudgets([]);
//       setRecentExpenses([]);
//       toast.success('User deleted successfully!', { position: 'top-right', autoClose: 3000 });
//       navigate('/login');
//     }
//   };

//   const handleLogout = () => {
//     toast.info('Logged out successfully!', { position: 'top-right', autoClose: 3000 });
//     navigate('/login');
//   };

//   const handleViewDetails = (budget) => {
//     navigate(`/budget-details/${budget.id}`, { state: { budget } });
//   };

//   const handleCreateBudget = () => {
//     if (!budgetName || !budgetAmount || !currency) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newBudget = {
//       id: Date.now(),
//       name: budgetName,
//       amount: parseFloat(budgetAmount),
//       spent: 0,
//       expenses: [],
//     };

//     const updatedBudgets = [...budgets, newBudget];
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setBudgetName('');
//     setBudgetAmount('');

//     toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleAddExpense = () => {
//     if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
//       toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
//     if (!targetBudget) {
//       toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       name: expenseName,
//       amount: parseFloat(expenseAmount),
//       date: new Date().toLocaleDateString(),
//     };

//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === targetBudget.id) {
//         budget.expenses.push(newExpense);
//         budget.spent += newExpense.amount;
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);
//     setExpenseName('');
//     setExpenseAmount('');

//     const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name }, ...recentExpenses].slice(0, 5);
//     setRecentExpenses(newRecentExpenses);

//     toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteBudget = (budgetId) => {
//     const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
//     toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const handleDeleteExpense = (budgetId, expenseId) => {
//     const updatedBudgets = budgets.map((budget) => {
//       if (budget.id === budgetId) {
//         budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
//         budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
//       }
//       return budget;
//     });

//     saveBudgets(updatedBudgets);
//     setBudgets(updatedBudgets);

//     const updatedRecentExpenses = updatedBudgets
//       .flatMap((budget) =>
//         budget.expenses.map((expense) => ({
//           ...expense,
//           budgetId: budget.id,
//           budgetName: budget.name,
//         }))
//       )
//       .sort((a, b) => new Date(b.date) - new Date(a.date))
//       .slice(0, 5);

//     setRecentExpenses(updatedRecentExpenses);

//     toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   const downloadCSV = () => {
//     if (budgets.length === 0) return;

//     let csvContent = [];
//     let headers = ['Budget Name', 'Total Amount', 'Spent Amount', 'Remaining Amount'];

//     const hasExpenses = budgets.some(budget => budget.expenses.length > 0);
//     if (hasExpenses) {
//       headers = [...headers, 'Expense Name', 'Expense Amount', 'Date'];
//     }

//     csvContent.push(headers);

//     budgets.forEach(budget => {
//       if (budget.expenses.length === 0) {
//         csvContent.push([
//           budget.name,
//           budget.amount,
//           budget.spent,
//           budget.amount - budget.spent
//         ]);
//       } else {
//         budget.expenses.forEach(expense => {
//           csvContent.push([
//             budget.name,
//             budget.amount,
//             budget.spent,
//             budget.amount - budget.spent,
//             expense.name,
//             expense.amount,
//             expense.date
//           ]);
//         });
//       }
//     });

//     const csvString = csvContent.map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute('download', `budget_report_${new Date().toLocaleDateString()}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadPDF = () => {
//     if (budgets.length === 0) return;

//     const doc = new jsPDF();
//     let yOffset = 20;
//     const pageHeight = doc.internal.pageSize.height;

//     doc.setFontSize(16);
//     doc.text(`Budget Report for ${username}`, 10, 10);

//     doc.setFontSize(10);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, yOffset);
//     yOffset += 10;

//     budgets.forEach((budget, index) => {
//       if (yOffset > pageHeight - 20) {
//         doc.addPage();
//         yOffset = 20;
//       }

//       doc.setFontSize(12);
//       doc.setFont(undefined, 'bold');
//       doc.text(`Budget: ${budget.name}`, 10, yOffset);
//       yOffset += 7;

//       doc.setFontSize(10);
//       doc.setFont(undefined, 'normal');
//       doc.text(`Total Amount: ${currency} ${budget.amount.toFixed(2)}`, 15, yOffset);
//       yOffset += 5;
//       doc.text(`Spent Amount: ${currency} ${budget.spent.toFixed(2)}`, 15, yOffset);
//       yOffset += 5;
//       doc.text(`Remaining Amount: ${currency} ${(budget.amount - budget.spent).toFixed(2)}`, 15, yOffset);
//       yOffset += 10;

//       if (budget.expenses.length > 0) {
//         doc.setFont(undefined, 'bold');
//         doc.text('Expenses:', 15, yOffset);
//         yOffset += 5;
//         doc.setFont(undefined, 'normal');

//         budget.expenses.forEach((expense) => {
//           if (yOffset > pageHeight - 20) {
//             doc.addPage();
//             yOffset = 20;
//           }

//           doc.text(`- ${expense.name}: ${currency} ${expense.amount.toFixed(2)} (${expense.date})`, 20, yOffset);
//           yOffset += 5;
//         });
//       }

//       yOffset += 10;
//     });

//     doc.save(`budget_report_${new Date().toLocaleDateString()}.pdf`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dashboard-transition">
//       <ToastContainer />
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <HomeIcon className="h-8 w-8 text-cyan-500" />
//               <span className="ml-2 text-xl font-semibold">MoneyMate</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <select
//                 className="px-3 py-2 border rounded-md"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="INR">INR</option>
//               </select>
//               <button onClick={handleDeleteUser} className="text-red-500 flex items-center">
//                 <Trash2 className="h-5 w-5 mr-1" />
//                 Delete User
//               </button>
//               <button onClick={handleLogout} className="text-gray-700 flex items-center">
//                 <LogOut className="h-5 w-5 mr-1" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-4xl font-bold mb-8">
//           Welcome back, <span className="text-cyan-500">{username}</span>
//         </h1>

//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-4">Create budget</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Groceries"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetName}
//                   onChange={(e) => setBudgetName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="e.g., 350"
//                   className="w-full px-3 py-2 border rounded-md"
//                   value={budgetAmount}
//                   onChange={(e) => setBudgetAmount(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleCreateBudget}
//                 className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Create budget
//               </button>
//             </div>
//           </div>

//           {budgets.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Coffee"
//                       className="w-full px-3 py-2 border rounded-md"
//                       value={expenseName}
//                       onChange={(e) => setExpenseName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 3.50"
//                       className="w-full px-3 py-2 border rounded-md"
//                       value={expenseAmount}
//                       onChange={(e) => setExpenseAmount(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 {budgets.length > 1 && (
//                   <select
//                     className="w-full px-3 py-2 border rounded-md"
//                     value={selectedBudget}
//                     onChange={(e) => setSelectedBudget(e.target.value)}
//                   >
//                     <option value="">Select Budget</option>
//                     {budgets.map((budget) => (
//                       <option key={budget.id} value={budget.name}>
//                         {budget.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 <button
//                   onClick={handleAddExpense}
//                   className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//                 >
//                   <PlusCircle className="h-5 w-5 mr-2" />
//                   Add Expense
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {budgets.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Existing Budgets</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               {budgets.map((budget) => (
//                 <div key={budget.id} className="bg-white rounded-lg shadow-sm border p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">{budget.name}</h3>
//                     <span className="text-lg font-semibold">
//                       {currency} {budget.amount.toFixed(2)} Budgeted
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//                     <div
//                       className="bg-cyan-500 h-4 rounded-full"
//                       style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>
//                       {currency} {budget.spent.toFixed(2)} Spent
//                     </span>
//                     <span className="text-gray-500">
//                       {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
//                     </span>
//                   </div>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => handleViewDetails(budget)}
//                       className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => handleDeleteBudget(budget.id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {recentExpenses.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
//             <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Budget
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {recentExpenses.map((expense) => (
//                     <tr key={expense.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.budgetName}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {currency} {expense.amount.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button
//                           onClick={() => handleDeleteExpense(expense.budgetId, expense.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {budgets.length > 0 && (
//           <div className="flex gap-4">
//             <button onClick={downloadCSV} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
//               Download CSV
//             </button>
//             <button onClick={downloadPDF} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
//               Download PDF
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="w-full mt-8">
//         <img src={wave} alt="Wave Design" className="w-full h-auto" />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wave from "wave.svg";
import { ToastContainer, toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import { HomeIcon, PlusCircle, Trash2, LogOut } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [currency, setCurrency] = useState('INR');
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUsername(currentUser.username);
      const userBudgets = JSON.parse(localStorage.getItem(`budgets_${currentUser.id}`)) || [];
      setBudgets(userBudgets);

      const allExpenses = userBudgets.flatMap((budget) =>
        budget.expenses.map((expense) => ({
          ...expense,
          budgetName: budget.name,
          budgetId: budget.id,
        }))
      );
      setRecentExpenses(allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const saveBudgets = (updatedBudgets) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.setItem(`budgets_${currentUser.id}`, JSON.stringify(updatedBudgets));
  };

  const handleDeleteUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      localStorage.removeItem(`budgets_${currentUser.id}`);
      localStorage.removeItem('currentUser');
      setBudgets([]);
      setRecentExpenses([]);
      toast.success('User deleted successfully!', { position: 'top-right', autoClose: 3000 });
      navigate('/login');
    }
  };

  const handleLogout = () => {
    toast.info('Logged out successfully!', { position: 'top-right', autoClose: 3000 });
    navigate('/login');
  };

  const handleViewDetails = (budget) => {
    navigate(`/budget-details/${budget.id}`, { state: { budget } });
  };

  const handleCreateBudget = () => {
    if (!budgetName || !budgetAmount || !currency) {
      toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const newBudget = {
      id: Date.now(),
      name: budgetName,
      amount: parseFloat(budgetAmount),
      spent: 0,
      expenses: [],
    };

    const updatedBudgets = [...budgets, newBudget];
    saveBudgets(updatedBudgets);
    setBudgets(updatedBudgets);
    setBudgetName('');
    setBudgetAmount('');

    toast.success('Budget created successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount || (!selectedBudget && budgets.length > 1)) {
      toast.error('Please fill out all fields.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const targetBudget = budgets.length === 1 ? budgets[0] : budgets.find((budget) => budget.name === selectedBudget);
    if (!targetBudget) {
      toast.error('Please select a valid budget.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      date: new Date().toLocaleDateString(),
    };

    const updatedBudgets = budgets.map((budget) => {
      if (budget.id === targetBudget.id) {
        budget.expenses.push(newExpense);
        budget.spent += newExpense.amount;
      }
      return budget;
    });

    saveBudgets(updatedBudgets);
    setBudgets(updatedBudgets);
    setExpenseName('');
    setExpenseAmount('');

    const newRecentExpenses = [{ ...newExpense, budgetName: targetBudget.name, budgetId: targetBudget.id }, ...recentExpenses].slice(0, 5);
    setRecentExpenses(newRecentExpenses);

    toast.success('Expense added successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const handleDeleteBudget = (budgetId) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
    saveBudgets(updatedBudgets);
    setBudgets(updatedBudgets);

    setRecentExpenses((prev) => prev.filter((expense) => expense.budgetId !== budgetId));
    toast.info('Budget deleted successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const handleDeleteExpense = (budgetId, expenseId) => {
    const updatedBudgets = budgets.map((budget) => {
      if (budget.id === budgetId) {
        budget.expenses = budget.expenses.filter((expense) => expense.id !== expenseId);
        budget.spent = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
      }
      return budget;
    });

    saveBudgets(updatedBudgets);
    setBudgets(updatedBudgets);

    const updatedRecentExpenses = updatedBudgets
      .flatMap((budget) =>
        budget.expenses.map((expense) => ({
          ...expense,
          budgetName: budget.name,
          budgetId: budget.id,
        }))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setRecentExpenses(updatedRecentExpenses);

    toast.info('Expense deleted successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const downloadCSV = () => {
    if (budgets.length === 0) return;

    let csvContent = [];
    let headers = ['Budget Name', 'Total Amount', 'Spent Amount', 'Remaining Amount'];

    const hasExpenses = budgets.some((budget) => budget.expenses.length > 0);
    if (hasExpenses) {
      headers = [...headers, 'Expense Name', 'Expense Amount', 'Date'];
    }

    csvContent.push(headers);

    budgets.forEach((budget) => {
      if (budget.expenses.length === 0) {
        csvContent.push([budget.name, budget.amount, budget.spent, budget.amount - budget.spent]);
      } else {
        budget.expenses.forEach((expense) => {
          csvContent.push([
            budget.name,
            budget.amount,
            budget.spent,
            budget.amount - budget.spent,
            expense.name,
            expense.amount,
            expense.date,
          ]);
        });
      }
    });

    const csvString = csvContent.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `budget_report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    if (budgets.length === 0) return;

    const doc = new jsPDF();
    let yOffset = 20;
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(16);
    doc.text(`Budget Report for ${username}`, 10, 10);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, yOffset);
    yOffset += 10;

    budgets.forEach((budget) => {
      if (yOffset > pageHeight - 20) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`Budget: ${budget.name}`, 10, yOffset);
      yOffset += 7;

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Total Amount: ${currency} ${budget.amount.toFixed(2)}`, 15, yOffset);
      yOffset += 5;
      doc.text(`Spent Amount: ${currency} ${budget.spent.toFixed(2)}`, 15, yOffset);
      yOffset += 5;
      doc.text(`Remaining Amount: ${currency} ${(budget.amount - budget.spent).toFixed(2)}`, 15, yOffset);
      yOffset += 10;

      if (budget.expenses.length > 0) {
        doc.setFont(undefined, 'bold');
        doc.text('Expenses:', 15, yOffset);
        yOffset += 5;
        doc.setFont(undefined, 'normal');

        budget.expenses.forEach((expense) => {
          if (yOffset > pageHeight - 20) {
            doc.addPage();
            yOffset = 20;
          }

          doc.text(`- ${expense.name}: ${currency} ${expense.amount.toFixed(2)} (${expense.date})`, 20, yOffset);
          yOffset += 5;
        });
      }

      
    
      

      yOffset += 10;
    });

    doc.save(`budget_report_${new Date().toLocaleDateString()}.pdf`);
  };

  

  return (
    <div className="min-h-screen bg-gray-50 dashboard-transition">
      <ToastContainer />
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-cyan-500" />
              <span className="ml-2 text-xl font-semibold">MoneyMate</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-3 py-2 border rounded-md"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
              <button onClick={handleDeleteUser} className="text-red-500 flex items-center">
                <Trash2 className="h-5 w-5 mr-1" />
                Delete Budgets
              </button>
              <button onClick={handleLogout} className="text-gray-700 flex items-center">
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome back, <span className="text-cyan-500">{username}</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Create budget</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
                <input
                  type="text"
                  placeholder="e.g., Groceries"
                  className="w-full px-3 py-2 border rounded-md"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="e.g., 350"
                  className="w-full px-3 py-2 border rounded-md"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
              </div>
              <button
                onClick={handleCreateBudget}
                className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create budget
              </button>
            </div>
          </div>

          {budgets.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expense Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Coffee"
                      className="w-full px-3 py-2 border rounded-md"
                      value={expenseName}
                      onChange={(e) => setExpenseName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      placeholder="e.g., 3.50"
                      className="w-full px-3 py-2 border rounded-md"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                  </div>
                </div>
                {budgets.length > 1 && (
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                  >
                    <option value="">Select Budget</option>
                    {budgets.map((budget) => (
                      <option key={budget.id} value={budget.name}>
                        {budget.name}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={handleAddExpense}
                  className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Expense
                </button>
              </div>
            </div>
          )}
        </div>

        {budgets.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Existing Budgets</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {budgets.map((budget) => (
                <div key={budget.id}id="garv" className="bg-white rounded-lg shadow-sm border p-6 extra">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{budget.name}</h3>
                    <span className="text-lg font-semibold">
                      {currency} {budget.amount.toFixed(2)} Budgeted
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-cyan-500 h-4 rounded-full"
                      style={{ width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      {currency} {budget.spent.toFixed(2)} Spent
                    </span>
                    <span className="text-gray-500">
                      {currency} {(budget.amount - budget.spent).toFixed(2)} Remaining
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(budget)}
                      className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(budget.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentExpenses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.budgetName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {currency} {expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteExpense(expense.budgetId, expense.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {budgets.length > 0 && (
          <div className="flex gap-4">
            <button onClick={downloadCSV} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Download CSV
            </button>
            <button onClick={downloadPDF} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Download PDF
            </button>
          </div>
        )}
      </div>
      <div className="w-full mt-8">
        <img src={wave} alt="Wave Design" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Dashboard;


