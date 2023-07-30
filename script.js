// Sample data for pre-populating the notes
const notesData = [
    {
      id: 1,
      createdAt: '2023-07-29T10:00:00',
      content: "I'm gonna have a dentist appointment on 3/5/2023, I moved it from 5/5/2023",
      category: 'Task',
      archived: false,
    },
    {
      id: 2,
      createdAt: '2023-07-29T11:30:00',
      content: 'Buy groceries for the weekend',
      category: 'Task',
      archived: false,
    },
    {
      id: 3,
      createdAt: '2023-07-29T14:15:00',
      content: 'Had a great random thought today',
      category: 'Random Thought',
      archived: false,
    },
    {
      id: 4,
      createdAt: '2023-07-29T15:00:00',
      content: 'Work on the new project idea',
      category: 'Idea',
      archived: false,
    },
    {
      id: 5,
      createdAt: '2023-07-30T09:45:00',
      content: 'Prepare for the upcoming presentation on 8/5/2023',
      category: 'Task',
      archived: false,
    },
    {
      id: 6,
      createdAt: '2023-07-30T14:30:00',
      content: 'Remember to book the flight for the vacation on 12/8/2023',
      category: 'Task',
      archived: false,
    },
    {
      id: 7,
      createdAt: '2023-07-31T08:00:00',
      content: 'An idea came up in the meeting, need to discuss with the team',
      category: 'Idea',
      archived: false,
    },
  ];
  
  const categories = ['Task', 'Random Thought', 'Idea'];
  
  const appContainer = document.getElementById('app');
  const activeNotesContainer = document.getElementById('active-notes');
  const archivedNotesContainer = document.getElementById('archived-notes');
  const summaryTableBody = document.querySelector('#summary-table tbody');
  
  function formatDateList(content) {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    const dates = content.match(dateRegex) || [];
    return dates.join(', ');
  }
  
  function createEditableNoteContent(note) {
    const contentCell = document.createElement('td');
    const contentTextarea = document.createElement('textarea');
    contentTextarea.value = note.content;
    contentTextarea.disabled = true; // Disable editing by default
    contentCell.appendChild(contentTextarea);
    return contentCell;
  }
  
  function onEditNoteButtonClick(noteId) {
    const contentCell = activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(2)`);
    const contentTextarea = contentCell.querySelector('textarea');
    const editButton = contentCell.querySelector('button.edit');
    const saveButton = contentCell.querySelector('button.save');
    contentTextarea.disabled = false;
    editButton.classList.add('hide');
    saveButton.classList.remove('hide');
  }
  
  function onSaveNoteButtonClick(noteId) {
    onEditNoteClick(noteId);
    const contentCell = activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(2)`);
    const contentTextarea = contentCell.querySelector('textarea');
    const editButton = contentCell.querySelector('button.edit');
    const saveButton = contentCell.querySelector('button.save');
    contentTextarea.disabled = true;
    editButton.classList.remove('hide');
    saveButton.classList.add('hide');
  }
  
  function createNoteRow(note) {
    const row = document.createElement('tr');
    row.setAttribute('data-note-id', note.id);
  
    const createdAtCell = document.createElement('td');
    createdAtCell.textContent = new Date(note.createdAt).toLocaleString();
    row.appendChild(createdAtCell);
  
    const contentCell = createEditableNoteContent(note);
    row.appendChild(contentCell);
  
    const categoryCell = document.createElement('td');
    categoryCell.textContent = note.category;
    row.appendChild(categoryCell);
  
    const dateCell = document.createElement('td');
    dateCell.textContent = formatDateList(note.content);
    row.appendChild(dateCell);
  
    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions');
  
    if (!note.archived) {
      const archiveButton = document.createElement('button');
      archiveButton.textContent = 'Archive';
      archiveButton.classList.add('button');
      archiveButton.addEventListener('click', () => onArchiveNoteClick(note.id));
      actionsCell.appendChild(archiveButton);
    } else {
      const unarchiveButton = document.createElement('button');
      unarchiveButton.textContent = 'Unarchive';
      unarchiveButton.classList.add('button');
      unarchiveButton.addEventListener('click', () => onUnarchiveNoteClick(note.id));
      actionsCell.appendChild(unarchiveButton);
    }
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('button', 'edit');
    editButton.addEventListener('click', () => onEditNoteButtonClick(note.id));
    actionsCell.appendChild(editButton);
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('button', 'save', 'hide');
    saveButton.addEventListener('click', () => onSaveNoteButtonClick(note.id));
    actionsCell.appendChild(saveButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button');
    deleteButton.addEventListener('click', () => onDeleteNoteClick(note.id));
    actionsCell.appendChild(deleteButton);
  
    row.appendChild(actionsCell);
  
    return row;
  }
  
  function renderNotesTable() {
    activeNotesContainer.innerHTML = '';
    archivedNotesContainer.innerHTML = '';
  
    notesData.forEach((note) => {
      const row = createNoteRow(note);
      if (!note.archived) {
        activeNotesContainer.appendChild(row);
      } else {
        archivedNotesContainer.appendChild(row);
      }
    });
  }
  
  function countNotesByCategory(notes, category) {
    return notes.filter((note) => note.category === category).length;
  }
  
  function renderSummaryTable() {
    const activeNotesCountByCategory = {};
    const archivedNotesCountByCategory = {};
  
    categories.forEach((category) => {
      activeNotesCountByCategory[category] = countNotesByCategory(
        notesData.filter((note) => !note.archived),
        category
      );
  
      archivedNotesCountByCategory[category] = countNotesByCategory(
        notesData.filter((note) => note.archived),
        category
      );
    });
  
    summaryTableBody.innerHTML = '';
  
    categories.forEach((category) => {
      const row = document.createElement('tr');
  
      const categoryCell = document.createElement('td');
      categoryCell.textContent = category;
      row.appendChild(categoryCell);
  
      const activeCountCell = document.createElement('td');
      activeCountCell.textContent = activeNotesCountByCategory[category];
      row.appendChild(activeCountCell);
  
      const archivedCountCell = document.createElement('td');
      archivedCountCell.textContent = archivedNotesCountByCategory[category];
      row.appendChild(archivedCountCell);
  
      summaryTableBody.appendChild(row);
    });
  }
  
  function onDeleteNoteClick(noteId) {
    notesData.splice(
      notesData.findIndex((note) => note.id === noteId),
      1
    );
    renderNotesTable();
    renderSummaryTable();
  }
  
  function onArchiveNoteClick(noteId) {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notesData[noteIndex].archived = true;
      renderNotesTable();
      renderSummaryTable();
    }
  }
  
  function onUnarchiveNoteClick(noteId) {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notesData[noteIndex].archived = false;
      renderNotesTable();
      renderSummaryTable();
    }
  }
  
  function onAddNoteClick() {
    const content = document.getElementById('note-content').value.trim();
    const category = document.getElementById('note-category').value;
  
    if (content === '') {
      alert('Note content cannot be empty.');
      return;
    }
  
    const newNote = {
      id: notesData.length + 1,
      createdAt: new Date().toISOString(),
      content: content,
      category: category,
      archived: false,
    };
  
    notesData.push(newNote);
    renderNotesTable();
    renderSummaryTable();
  
    // Clear the input fields after adding a note
    document.getElementById('note-content').value = '';
    document.getElementById('note-category').value = 'Task';
  }
  
  function onEditNoteClick(noteId) {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      const contentCell = activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(2)`);
      const contentTextarea = contentCell.querySelector('textarea');
      notesData[noteIndex].content = contentTextarea.value;
      renderSummaryTable();
    }
  }
  
  function initApp() {
    renderNotesTable();
    renderSummaryTable();
  
    const addNoteButton = document.getElementById('add-note-button');
    addNoteButton.addEventListener('click', onAddNoteClick);
  }
  
  initApp();
  