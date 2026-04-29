# ToDOApp

Prosta aplikacja mobilna typu To-Do stworzona w React Native, wykorzystująca bazę danych Firebase Firestore do przechowywania zadań.

---

## Funkcjonalności

* Dodawanie nowych zadań
* Oznaczanie zadań jako wykonane / niewykonane
* Usuwanie zadań
* Filtrowanie zadań:

  * wszystkie
  * aktywne
  * wykonane
* Licznik wykonanych zadań

---

## Technologie

* React Native
* Firebase (Firestore)
* JavaScript (ES6+)

---

## Struktura danych (Firestore)

Kolekcja: `tasks`

Przykładowy dokument:

```json
{
  "text": "Zrobić zakupy",
  "done": false
}
```

---

## Instalacja i uruchomienie

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/twoj-username/todo-app.git
cd todo-app
```

### 2. Instalacja zależności

```bash
npm install
```

### 3. Konfiguracja Firebase

Utwórz plik `firebase.js` i dodaj konfigurację:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### 4. Uruchomienie aplikacji

```bash
npx expo start
```

---

## Jak działa aplikacja

### Pobieranie danych

Po uruchomieniu aplikacji wykonywana jest funkcja:

```js
getDocs(collection(db, "tasks"))
```

Pobiera ona wszystkie zadania z Firestore i zapisuje w stanie `tasks`.

---

### Dodawanie zadania

```js
addDoc(collection(db, "tasks"), {
  text: text,
  done: false,
});
```

Dodaje nowe zadanie do bazy danych.

---

### Aktualizacja zadania

```js
updateDoc(doc(db, "tasks", id), {
  done: !current,
});
```

Zmienia status zadania (wykonane / niewykonane).

---

### Usuwanie zadania

```js
deleteDoc(doc(db, "tasks", id));
```

Usuwa zadanie z bazy danych.

---

### Filtrowanie

Zadania są filtrowane lokalnie na podstawie stanu `filter`:

* `all` – wszystkie
* `active` – niewykonane
* `done` – wykonane

---

###Screenshot
<img width="1397" height="370" alt="image" src="https://github.com/user-attachments/assets/92c2eaf7-a5f5-4a84-8c9c-d1bcb22ca595" />
<img width="946" height="2047" alt="image" src="https://github.com/user-attachments/assets/79cdfcd2-5e6f-4c24-941c-12acec43bf82" />
<img width="946" height="2047" alt="image" src="https://github.com/user-attachments/assets/9cbb77e9-5b33-4d25-9ad5-341df337775c" />
<img width="946" height="2047" alt="image" src="https://github.com/user-attachments/assets/d71614dd-9986-44a5-9e01-2e09f0964b01" />



