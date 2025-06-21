import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit2, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

function TransactionList({ transactions, deleteTransaction, editTransaction }) {
  return (
    <Card className="main-container">
      <CardHeader>
        <h2 className="sub-heading-medium">Recent Transactions</h2>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div>
            <div
              style={{ textAlign: "center", padding: "24px", color: "#666" }}
            >
              No transactions yet. Add your first transaction above.
            </div>
          </div>
        ) : (
          transactions.map((item) => (
            <TransactionItem
              key={item.id}
              item={item}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function TransactionItem({ item, deleteTransaction, editTransaction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [description, setDescription] = useState(item.description);
  const [type, setType] = useState(item.type);
  const [category, setCategory] = useState(item.category || "General");

  const handleEdit = (e) => {
    e.preventDefault();

    editTransaction(item.id, {
      amount: parseFloat(amount),
      description,
      type,
      category,
    });
    setIsEditing(false);
  };

  return (
    <Card
      className={`transaction-card ${
        item.type === "expense" ? "expense" : "income"
      }`}
    >
      <CardContent className="p-6">
        {isEditing ? (
          <form onSubmit={handleEdit} className="main-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label>Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label>Description</label>
                <Input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label>Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Food">Food</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "8px",
              }}
            >
              <Button type="submit" variant="default">
                <Save className="sub-container-icon-medium" /> Save
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                variant="outline"
              >
                <X className="sub-container-icon-medium" /> Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div className="flex-container" style={{ gap: "8px" }}>
                <span
                  className="sub-text"
                  style={{
                    color: item.type === "expense" ? "red" : "green",
                    fontWeight: 700,
                  }}
                >
                  {item.type === "expense" ? "Expense" : "Income"}
                </span>
                <h3 className="sub-text" style={{ fontWeight: 700 }}>
                  {item.description}
                </h3>
              </div>
              <div className="flex-container" style={{ gap: "16px" }}>
                <span
                  className="sub-heading-small"
                  style={{
                    color: item.type === "expense" ? "red" : "green",
                  }}
                >
                  ${item.amount.toLocaleString()}
                </span>
                <span className="sub-text-small" style={{ color: "#666" }}>
                  {new Date(item.id).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" • "}
                  {new Date(item.id).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
                <span className="sub-text-small">{item.category}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit2 className="sub-container-icon-medium" />
              </Button>
              <Button
                onClick={() => deleteTransaction(item.id)}
                variant="outline"
                className="trash-button"
              >
                <Trash2 className="sub-container-icon-medium" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TransactionList;