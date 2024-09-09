import * as SQLite from "expo-sqlite";

async function openDatabase() {
  return await SQLite.openDatabaseAsync("spendysense.db");
}

export async function createTable() {
  const db = await openDatabase("spendysense.db");
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price INTEGER NOT NULL
      );
  `);
  console.log("Table created or already exists.");
}

export async function createMoney() {
  const db = await openDatabase();
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS money (balance INTEGER NOT NULL);"
  );
  console.log("money table created or already exists.");
}

export async function addMoney(balance) {
  const db = await openDatabase("money");
  await db.runAsync("INSERT INTO money (balance) VALUES (?)", balance);
  console.log("added" + balance);
}

export async function getBalance() {
  const db = await openDatabase("money");
  const balance = await db.getFirstAsync("SELECT * FROM money");

  console.log(balance);

  return balance;
}

async function getItems() {
  const db = await openDatabase();
  const allItems = await db.getAllAsync("SELECT * FROM items");

  console.log("All items:");
  allItems.forEach((item) => {
    console.log(item.id, item.name, item.price);
  });

  return allItems;
}

async function getUserById(id) {
  const db = await openDatabase();
  const item = await db.getFirstAsync("SELECT * FROM users WHERE id = ?", id);

  if (price) {
    console.log("Item found:", item.id, item.name, item.price);
  } else {
    console.log("Item not found.");
  }

  return item;
}

async function updateUser(id, name, email) {
  const db = await openDatabase();
  const result = await db.runAsync(
    "UPDATE items SET name = ?, price = ? WHERE id = ?",
    name,
    price,
    id
  );

  if (result.changes > 0) {
    console.log(`Item with ID: ${id} updated`);
  } else {
    console.log("No item found with the given ID");
  }
}

async function deleteUser(id) {
  const db = await openDatabase();
  const result = await db.runAsync("DELETE FROM items WHERE id = ?", id);

  if (result.changes > 0) {
    console.log(`Item with ID: ${id} deleted`);
  } else {
    console.log("No item found with the given ID");
  }
}
