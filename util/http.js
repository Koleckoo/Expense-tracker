import axios from "axios";

const BE_URL =
  "https://expense-tracker-app-6181b-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeExpense(expenseData) {
  const response = await axios.post(BE_URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BE_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BE_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BE_URL + `/expenses/${id}.json`);
}
