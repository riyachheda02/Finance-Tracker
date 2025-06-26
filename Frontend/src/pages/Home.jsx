import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTransactions } from "../Context/TransactionContext";

function Home() {
  const {transactions}=useTransactions();

  const stats = transactions.reduce(
    (acc, item) => {
      const amount = Number(item.amount);
      if (item.type === "expense") {
        acc.expenses += amount;
      } else {
        acc.income += amount;
      }
      acc.total = acc.income - acc.expenses;
      return acc;
    },
    { total: 0, income: 0, expenses: 0 }
  );

  const recentTransactions = transactions
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="main-container" style={{ padding: "20px" }}>
      <Card className="card">
        <CardHeader>
          <h1 className="sub-heading-large">Welcome to Your Finance Tracker</h1>
          <p className="sub-text">
            Take control of your finances with our easy-to-use tracking tools
          </p>
        </CardHeader>
        <CardContent className="grid-container">
          <Card>
            <CardContent className="pt-6">
              <div className="sub-container">
                <div>
                  <p className="sub-heading-small">Total Balance</p>
                  <p
                    className="sub-heading-medium"
                    style={
                      stats.total >= 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    ${stats.total.toLocaleString()}
                  </p>
                </div>
                <TrendingUp
                  className="sub-container-icon-large"
                  style={{ color: "#666" }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="sub-container">
                <div>
                  <p className="sub-heading-small">Total Income</p>
                  <p className="sub-heading-medium" style={{ color: "green" }}>
                    ${stats.income.toLocaleString()}
                  </p>
                </div>
                <ArrowUpCircle
                  className="sub-container-icon"
                  style={{ color: "green" }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="sub-container">
                <div>
                  <p className="sub-heading-small">Total Expenses</p>
                  <p className="sub-heading-medium" style={{ color: "red" }}>
                    ${stats.expenses.toLocaleString()}
                  </p>
                </div>
                <ArrowDownCircle
                  className="sub-container-icon"
                  style={{ color: "red" }}
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Link to="/transactions">
            <Button>
              <PlusCircle className="sub-container-icon-large" />
              Add New Transaction
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="card">
        <CardHeader>
          <h2 className="sub-heading-medium">Recent Transactions</h2>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No transactions yet. Start by adding your first transaction!
            </p>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="sub-container recent-transactions-card"
                >
                  <div>
                    <p
                      className="font-medium"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {transaction.description}
                    </p>
                    <p
                      style={{
                        color: "#666",
                        fontWeight: "400",
                      }}
                    >
                      {new Date(transaction.id).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    style={{
                      color: transaction.type === "expense" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.type === "expense" ? "-" : "+"}$
                    {Number(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link to="/transactions" className="w-full">
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;