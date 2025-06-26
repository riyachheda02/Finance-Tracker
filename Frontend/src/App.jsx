import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

function App() {
  // Using Localstorage
  // const [transactions, setTransactions] = useState(
  //   JSON.parse(localStorage.getItem("transactions")) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem("transactions", JSON.stringify(transactions));
  // }, [transactions]);

  // const addTransaction = (transaction) => {
  //   setTransactions([{ ...transaction, id: Date.now() }, ...transactions]);
  // };

  // const deleteTransaction = (id) => {
  //   setTransactions(transactions.filter((t) => t.id !== id));
  // };

  // const editTransaction = (id, updatedTransaction) => {
  //   setTransactions(
  //     transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
  //   );
  // };

  // Using MongoDB

  return (
    <Router>
      <Navbar />
      <h1 className="main-heading">Personal Finance Tracker</h1>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
