// // This code uses localStorage to create a transaction context for a finance tracker application.

// import { createContext, useContext, useEffect, useState } from "react";

// // Create a context to hold transaction-related data and functions
// const TransactionContext = createContext();

// // Provider component that supplies state and handlers to its children
// export const TransactionProvider = ({ children }) => {
//   // Initialize transactions from localStorage (or empty array)
//   const [transactions, setTransactions] = useState(
//     JSON.parse(localStorage.getItem("transactions")) || []
//   );

//   // Persist transactions to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   // Add a new transaction to the list
//   const addTransaction = (transaction) => {
//     setTransactions([{ ...transaction, id: Date.now() }, ...transactions]);
//   };

//   // Remove a transaction by its id
//   const deleteTransaction = (id) => {
//     setTransactions(transactions.filter((t) => t.id !== id));
//   };

//   // Update an existing transaction
//   const editTransaction = (id, updatedTransaction) => {
//     setTransactions(
//       transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
//     );
//   };

//   // Provide all transaction state and functions to children
//   return (
//     <TransactionContext.Provider
//       value={{
//         transactions,
//         addTransaction,
//         deleteTransaction,
//         editTransaction,
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };

// // Custom hook for easy access to the transaction context
// export const useTransactions = () => useContext(TransactionContext);

// This code is uses mongo db and mongoose to create a transaction context for a finance tracker application.
import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET: Fetch all transactions
  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  }, []);

  // POST: Add a new transaction
  const addTransaction = async (tx) => {
    try {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });

      const newTx = await res.json();
      setTransactions((prev) => [newTx, ...prev]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  // DELETE: Delete transaction by _id
  const deleteTransaction = async (_id) => {
    try {
      await fetch(`http://localhost:5000/transactions/${_id}`, {
        method: "DELETE",
      });

      setTransactions((prev) => prev.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const editTransaction = async (_id, tx) => {
    try {
      const updatedTx = await fetch(
        `http://localhost:5000/transactions/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tx),
        }
      );

      setTransactions((prev) =>
        prev.map((t) => (t._id !== _id ? t : { ...updatedTx, ...tx }))
      );
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, loading }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);