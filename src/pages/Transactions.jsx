import React from 'react'
import TransactionList from "../components/ui/TransactionsList"
import TransactionForm from "../components/ui/TransactionForm";
const Transactions = ({
  transactions, addTransaction, editTransaction,deleteTransaction})=>{
  
  return (
    <div>Transaction
      <TransactionForm addTransaction={addTransaction}/>
      <TransactionList
       transactions={transactions}
       deleteTransaction=
       {deleteTransaction}
       editTransaction={editTransaction}/>
    </div>
  );
};

export default Transactions
