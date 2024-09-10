import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
async function openDatabase() {
  return await SQLite.openDatabaseAsync("spendysense.db");
}

export async function createItem() {
  const db = await openDatabase("spendysense.db");
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price INTEGER NOT NULL
      );
  `);
  console.log("Items table created or already exists.");
}

export async function createBalance() {
  const db = await openDatabase("spendysense.db");
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS balance (id INTEGER PRIMARY KEY AUTOINCREMENT,money INTEGER NOT NULL);"
  );
  console.log("Balance table created or already exists.");
}

export async function addBalance(balance) {
  const db = await openDatabase("spendysense.db");
  // Check if a balance value already exists
  const existingBalance = await db.getAllAsync("SELECT * FROM balance");

  if (existingBalance.length > 0) {
    // If a balance exists, update it
    await db.runAsync(
      "UPDATE balance SET money = ? WHERE rowid = ?",
      balance,
      1
    );
    console.log("Balance updated to " + balance);
  } else {
    // If no balance exists, insert a new balance
    await db.runAsync("INSERT INTO balance (money) VALUES (?)", balance);
    console.log("Added new balance: " + balance);
  }
}

export async function getBalance() {
  const db = await openDatabase("spendysense.db");
  const balance = await db.getAllAsync("SELECT * FROM balance");

  console.log(balance);

  return balance;
}

export async function getItems() {
  const db = await openDatabase("spendysense.db");
  const allItems = await db.getAllAsync("SELECT * FROM items");

  console.log("All items:");
  allItems.forEach((item) => {
    console.log(item.id, item.name, item.price);
  });

  return allItems;
}

export async function updateUser(id, name, price) {
  const db = await openDatabase("spendysense.db");
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

export async function deleteUser(id) {
  const db = await openDatabase("spendysense.db");
  const result = await db.runAsync("DELETE FROM items WHERE id = ?", id);

  if (result.changes > 0) {
    console.log(`Item with ID: ${id} deleted`);
  } else {
    console.log("No item found with the given ID");
  }
}

export async function DeleteDB() {
  const dbName = "spendysense.db";
  const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  try {
    // Check if the database exists
    const dbExists = await FileSystem.getInfoAsync(dbPath);
    if (dbExists.exists) {
      // Delete the database file
      await FileSystem.deleteAsync(dbPath);
      console.log("Database deleted successfully.");
      Alert.alert("Success", "Database deleted successfully.");
    } else {
      console.log("Database does not exist.");
      Alert.alert("Error", "Database does not exist.");
    }
  } catch (error) {
    console.log("Error deleting database: ", error);
    Alert.alert("Error", "An error occurred while deleting the database.");
  }
}
