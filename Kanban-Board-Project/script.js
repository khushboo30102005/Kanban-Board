let tasksData = {};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const addModal = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal .bg');
const addTaskBtn = document.querySelector('#add-new-task');
const columns = [todo, progress, done];
let draggedTask;

function addTask(title, desc, column) {
  const div = document.createElement('div');
  div.classList.add('task');
  div.draggable = true;
  div.innerHTML = `
            <h2>${title}</h2>
            <p>${desc}</p>
            <button class="delete" >Delete</button>
            `;
  column.appendChild(div);
  div.addEventListener('drag', (e) => {
    draggedTask = div;
  });
  const deleteBtn = div.querySelector('.delete');
  deleteBtn.addEventListener('click', (e) => {
    div.remove();
    updateCount();
  });
  return div;
}
console.log('hii from script.js');
function updateCount() {
  columns.forEach((col) => {
    const tasks = col.querySelectorAll('.task');
    const count = col.querySelector('.right');
    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector('h2').innerText,
        desc: t.querySelector('p').innerText,
      };
    });
    localStorage.setItem('tasks', JSON.stringify(tasksData));
    count.innerText = tasks.length;
  });
}

if (localStorage.getItem('tasks')) {
  const data = JSON.parse(localStorage.getItem('tasks'));
  for (col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      addTask(task.title, task.desc, column);
    });
    updateCount();
  }
}
const tasks = document.querySelectorAll('.task');
tasks.forEach((task) => {
  task.addEventListener('drag', (e) => {
    draggedTask = task;
  });
});

tasks.forEach((task) => {});

function dragEventsOnCol(col) {
  col.addEventListener('dragenter', (e) => {
    e.preventDefault();
    col.classList.add('hover-over');
  });
  col.addEventListener('dragleave', (e) => {
    col.classList.remove('hover-over');
  });
  col.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  col.addEventListener('drop', (e) => {
    col.appendChild(draggedTask);
    col.classList.remove('hover-over');
    updateCount();
  });
}

dragEventsOnCol(todo);
dragEventsOnCol(progress);
dragEventsOnCol(done);

addModal.addEventListener('click', (e) => {
  modal.classList.add('active');
});
modalBg.addEventListener('click', (e) => {
  modal.classList.remove('active');
});

addTaskBtn.addEventListener('click', (e) => {
  let taskTitle = document.querySelector('#task-title-input').value;
  let taskDesc = document.querySelector('#task-decs-input').value;
  addTask(taskTitle, taskDesc, todo);
  updateCount();
  taskTitle = document.querySelector('#task-title-input').value = '';
  taskDesc = document.querySelector('#task-decs-input').value = '';
  modal.classList.remove('active');
});
