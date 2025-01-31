import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseconfig.js";

const addTask = document.querySelector("#inputBtn");
const input = document.querySelector("#inputTask");
const div = document.querySelector(".todoContainer");

addTask.addEventListener('click', async (event) => {
    event.preventDefault();


    try {
      const docRef = await addDoc(collection(db, "todos"), {
        Task: input.value,
      });
      console.log("Document written with ID: ", docRef.id);
      input.value = ""
      fetchData(); 
    } catch (e) {
      console.error("Error adding document: ", e);
    }

});

async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "Todo"));
    querySnapshot.forEach((doc) => {
        renderData(doc.data().Task);
    });
}

function renderData(task) {
    div.innerHTML += `
       <div class="renderItems d-flex flex-column align-items-center">
           <div class="taskItem d-flex">
               <input type="checkbox"><p class="tasks">${task}</p>
           </div>
       </div>
    `;
}

fetchData();
