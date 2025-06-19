//import { Button } from "@/components/ui/button"
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Transaction from './pages/Transactions';
import DashBoard from './pages/DashBoard';
import Navbar from './components/navbar';
import { useEffect, useState


 } from 'react';


function App() {
  const [transactions, setTransactions] = useState(
  JSON.parse(localStorage.getItem("transactions")) || []
);

useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

const addTransaction = (transaction) => {
  setTransactions([...transactions, { ...transaction, id: Date.now() }]);
};

const deleteTransaction = (id) => {
  setTransactions(transactions.filter((t) => t.id !== id));
};

const editTransaction = (id, updatedTransaction) => {
  setTransactions(
    transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
  );
};
  return (
    <Router>
      <Navbar/>
      <h1 className='main-heading'>Personal Finance Traker</h1>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Transactions" element={
          <Transaction
        transaction={transactions}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
    </Router>
  )
}

export default App