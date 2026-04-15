import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));

      const tasksFromDB = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setTasks(tasksFromDB);
    } catch (e) {
      console.log("LOAD ERROR:", e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        text: text,
        done: false,
      });

      setText("");
      loadTasks();
    } catch (e) {
      console.log("ADD ERROR:", e);
    }
  };

  const toggleTask = async (id, current) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        done: !current,
      });

      loadTasks();
    } catch (e) {
      console.log("UPDATE ERROR:", e);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      loadTasks();
    } catch (e) {
      console.log("DELETE ERROR:", e);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "active") return !task.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>

      <Text style={styles.stats}>
        Wykonane: {doneCount} / {tasks.length}
      </Text>

      <TextInput placeholder="Dodaj zadanie..." value={text} onChangeText={setText} style={styles.input} />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Dodaj</Text>
      </TouchableOpacity>

      {/* filtry */}
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setFilter("all")}>
          <Text style={styles.filter}>Wszystkie</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("active")}>
          <Text style={styles.filter}>Aktywne</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("done")}>
          <Text style={styles.filter}>Zrobione</Text>
        </TouchableOpacity>
      </View>

      {/* lista */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleTask(item.id, item.done)}>
              <Text style={[styles.taskText, item.done && styles.doneTask]}>{item.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Usuń</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  stats: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },

  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  filter: {
    fontSize: 16,
    color: "#007AFF",
  },

  task: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
  },

  taskText: {
    fontSize: 18,
  },

  doneTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  delete: {
    fontSize: 18,
    marginLeft: 10,
    color: "red",
  },
});
