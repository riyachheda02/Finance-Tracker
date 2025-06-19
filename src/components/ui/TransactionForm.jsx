import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const TransactionForm = ({ addTransaction }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income"); // Default to income
  const [category, setCategory] = useState("General"); // Default to General
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Loading custom categories from localStorage
  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("customCategories")) || [];
    setCustomCategories(storedCategories);
  }, []);

  // Saving custom categories to localStorage
  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (amount && description) {
      addTransaction({
        id: Date.now(),
        amount: parseFloat(amount),
        description,
        type,
        category,
      });
      setAmount(0);
      setDescription("");
      setType("income"); // reset to income after adding
      setCategory("General"); // reset to General after adding
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (newCategory.trim()) {
      setCustomCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
    }
  };

  return (
    <Card className="">
      <CardHeader className="sub-heading-medium">
        Add New Transaction
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAdd} className="main-container">
          <div className="flex flex-col gap-2">
            <label htmlFor="amount">Amount</label>
            <Input
              id="amount"
              type="number"
              step="0.1"
              min="0"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="w-full"
            />
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="category">Category</label>
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
                {/* custom categories from localStorage */}
                {customCategories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section to add new custom category */}
          <div className="flex gap-2">
            <Input
              id="newCategory"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add custom category..."
            />
            <Button onClick={handleAddCategory} disabled={!newCategory.trim()}>
              Add
            </Button>
          </div>

          <Button
            type="submit"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={!amount || !description}
          >
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;