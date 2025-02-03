import { collection, addDoc, getDocs, query, Timestamp, doc, deleteDoc, updateDoc, orderBy } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseconfig.js";

const addTask = document.querySelector("#inputBtn");
const description = document.querySelector("#DescriptionTask");
const title = document.querySelector("#titleTask");
const div = document.querySelector("#rendering");


const allTodo = []

addTask.addEventListener('click', async (event) => {
  
  event.preventDefault();
  
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      Title: title.value,
      Description: description.value,
      Date: Timestamp.fromDate(new Date()),
    });
    window.location.reload()
    console.log(docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
});

async function getData() {
  const q = query(collection(db, "todos"));
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allTodo.push({ ...doc.data(), id: doc.id });
  });
  
  
  console.log(allTodo);
  renderItems(allTodo); 
}


getData()

// RENDERING

function renderItems(arr) {
  div.innerHTML = ""
  
  arr.map(item => {
    div.innerHTML += `
    <div class="taskItem d-flex mt-4 py-4">
    <p class="tasks">Title: ${item.Title} <br/> Description: ${item.Description}</p> 
    <button class="icon" id="delete"><i class="fa-solid fa-trash-can"></i></button>
    <button class="icon" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>
    `
  })
  
  const deleteBtn = document.querySelectorAll("#delete");
  const editBtn = document.querySelectorAll("#edit");

  deleteBtn.forEach((item , index) => {
    item.addEventListener("click", async event => {
      await deleteDoc(doc(db, "todos", allTodo[index].id));
      allTodo.splice(index , 1)
      renderItems(allTodo)
    })
  })

  editBtn.forEach((item , index) => {
    item.addEventListener("click", async event => {
      const update = prompt("Update the value")
      console.log(allTodo[index]);
      allTodo[index].Title = update
      const tasksRef = doc(db, "todos", allTodo[index].id);
      await updateDoc(tasksRef, {
        Title: update
      });
      window.location.reload()
      renderItems(allTodo)
    })
  })
}






