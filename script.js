const notesData = [
    {
      name: "note 1",  
      id: 1,
      createdAt: '2023-07-29T10:00:00',
      content: "I'm gonna have a dentist appointment on 3/5/2023, I moved it from 5/5/2023",
      category: 'Task',
      archived: false,
    },
    {
      name: "note 2", 
      id: 2,
      createdAt: '2023-07-29T11:30:00',
      content: 'Buy groceries for the weekend',
      category: 'Task',
      archived: false,
    },
    {
      name: "note 3",   
      id: 3,
      createdAt: '2023-07-29T14:15:00',
      content: 'Had a great random thought today',
      category: 'Random Thought',
      archived: false,
    },
    {
      name: "note 4",
      id: 4,
      createdAt: '2023-07-29T15:00:00',
      content: 'Work on the new project idea',
      category: 'Idea',
      archived: false,
    },
    {
      name: "note 5",
      id: 5,
      createdAt: '2023-07-30T09:45:00',
      content: 'Prepare for the upcoming presentation on 8/5/2023',
      category: 'Task',
      archived: false,
    },
    {
      name: "note 6",
      id: 6,
      createdAt: '2023-07-30T14:30:00',
      content: 'Remember to book the flight for the vacation on 12/8/2023',
      category: 'Task',
      archived: false,
    },
    {
      name: "note 7",
      id: 7,
      createdAt: '2023-07-31T08:00:00',
      content: 'An idea came up in the meeting, need to discuss with the team',
      category: 'Idea',
      archived: false,
    },
  ];
  
  const categories = ['Task', 'Random Thought', 'Idea'];
  
  //const appContainer = document.getElementById('app');
  const activeNotesContainer = document.getElementById('active-notes');
  const archivedNotesContainer = document.getElementById('archived-notes');
  const summaryTableBody = document.querySelector('#summary-table tbody');

  function createImageButton(src) {
    const image = document.createElement('img');
    image.src = src;
    image.style.width = '20px';
    image.style.height = '20px';
    image.style.cursor = 'pointer';
    image.style.padding = '5px';
    return image;
  }
  
  function formatDateList(content) {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    const dates = content.match(dateRegex) || [];
    return dates.join(', ');
  }
  
  function createEditableNoteContent(note) {
    const nameCell = document.createElement('td');
    const contentCell = document.createElement('td');
    const categoryCell = document.createElement('td');
  
    const nameInput = document.createElement('input');
    const contentTextarea = document.createElement('textarea');
    const categorySelect = document.createElement('select');
  
    nameInput.value = note.name;
    nameInput.disabled = true;
    contentTextarea.value = note.content;
    contentTextarea.disabled = true;
    
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  
    categorySelect.value = note.category;
    categorySelect.disabled = true;
    categorySelect.classList.add('disabled-select');
  
    nameCell.appendChild(nameInput);
    contentCell.appendChild(contentTextarea);
    categoryCell.appendChild(categorySelect);
  
    return [nameCell, contentCell, categoryCell];
  }
  
  
  function onEditNoteButtonClick(noteId) {
    try {
    const note = notesData.find((note) => note.id === noteId);
    if (!note) return;
  
    const nameCell = note.archived
      ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(1)`)
      : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(1)`);
  
    const contentCell = note.archived
      ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(3)`)
      : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(3)`);
  
    const categoryCell = note.archived
      ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(4)`)
      : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(4)`);
  
    const nameInput = nameCell.querySelector('input');
    const contentTextarea = contentCell.querySelector('textarea');
    const categorySelect = categoryCell.querySelector('select');

    const editButton = note.archived
    ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.edit`)
    : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.edit`);

  const saveButton = note.archived
    ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.save`)
    : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.save`);
  
    nameInput.disabled = false;
    contentTextarea.disabled = false;
    categorySelect.disabled = false;
  
    editButton.classList.add('hide');
    saveButton.classList.remove('hide');
    } catch (error) {
      alert('An error occurred while editing the note. Please try again.');
      console.error(error);
    }
  }  
  
  function onSaveNoteButtonClick(noteId) {
    try {
    const note = notesData.find((note) => note.id === noteId);
    if (!note) return;
  
    const nameCell = note.archived
      ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(1)`)
      : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(1)`);
  
    const contentCell = note.archived
      ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(3)`)
      : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(3)`);
  
    const categoryCell = note.archived
      ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(4)`)
      : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] td:nth-child(4)`);
  
    const nameInput = nameCell.querySelector('input');
    note.name = nameInput.value.trim();
  
    const contentTextarea = contentCell.querySelector('textarea');
    note.content = contentTextarea.value.trim();

    if (note.name === '' || note.content === '') {
      alert('Please fill in both the Name and Content fields before saving the note.');
      return;
    }
  
    const categorySelect = categoryCell.querySelector('select');
    note.category = categorySelect.value;
  
    nameInput.disabled = false;
    contentTextarea.disabled = false;
    categorySelect.disabled = false;
  
    const editButton = note.archived
    ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.edit`)
    : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.edit`);

  const saveButton = note.archived
    ? archivedNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.save`)
    : activeNotesContainer.querySelector(`tr[data-note-id="${noteId}"] img.button.save`);
  
    editButton.classList.remove('hide');
    saveButton.classList.add('hide');
  
    renderNotesTable();
    renderSummaryTable();
  } catch (error) {
    alert('An error occurred while saving the note. Please try again.');
    console.error(error);
    }
  }  
  
  function createNoteRow(note) {    
    const row = document.createElement('tr');
    row.setAttribute('data-note-id', note.id);

    const [nameCell, contentCell, categoryCell] = createEditableNoteContent(note);
  
    const createdAtCell = document.createElement('td');
    createdAtCell.textContent = new Date(note.createdAt).toLocaleString();
    
    row.appendChild(nameCell);

    row.appendChild(createdAtCell);
  
    row.appendChild(contentCell);
  
    row.appendChild(categoryCell);
  
    const dateCell = document.createElement('td');
    dateCell.textContent = formatDateList(note.content);
    row.appendChild(dateCell);
  
    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions');
  
    const editButton = createImageButton('edit.png');
    editButton.classList.add('button', 'edit');
    editButton.addEventListener('click', () => onEditNoteButtonClick(note.id));
    actionsCell.appendChild(editButton);    
  
    const saveButton = createImageButton('save.png');
    saveButton.classList.add('button', 'save', 'hide'); // Add 'hide' class initially
    saveButton.addEventListener('click', () => onSaveNoteButtonClick(note.id));
    actionsCell.appendChild(saveButton);
  
    const deleteButton = createImageButton('delete.png');
    deleteButton.classList.add('button');
    deleteButton.addEventListener('click', () => onDeleteNoteButtonClick(note.id));
    actionsCell.appendChild(deleteButton);

    if (!note.archived) {
      const archiveButton = createImageButton('archive.png');
      archiveButton.classList.add('button');
      archiveButton.addEventListener('click', () => onArchiveNoteButtonClick(note.id));
      actionsCell.appendChild(archiveButton);
    } else {
      const unarchiveButton = createImageButton('unarchive.png');
      unarchiveButton.classList.add('button');
      unarchiveButton.addEventListener('click', () => onUnarchiveNoteButtonClick(note.id));
      actionsCell.appendChild(unarchiveButton);
    }
  
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
  
  function onDeleteNoteButtonClick(noteId) {
    try {
    notesData.splice(
      notesData.findIndex((note) => note.id === noteId),
      1
    );
    renderNotesTable();
    renderSummaryTable();
    } catch (error) {
      alert('An error occurred while deleting the note. Please try again.');
      console.error(error);
    }
  }
  
  function onArchiveNoteButtonClick(noteId) {
    try {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notesData[noteIndex].archived = true;
      renderNotesTable();
      renderSummaryTable();
    }
  } catch (error) {
    alert('An error occurred while archiving the note. Please try again.');
    console.error(error);
  }
  }
  
  function onUnarchiveNoteButtonClick(noteId) {
    try {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notesData[noteIndex].archived = false;
      renderNotesTable();
      renderSummaryTable();
    }
  } catch (error) {
    alert('An error occurred while unarchiving the note. Please try again.');
    console.error(error);
  }
  }
  
  function onAddNoteButtonClick() {
    try {
    const name = document.getElementById('note-name').value.trim();
    const content = document.getElementById('note-content').value.trim();
    const category = document.getElementById('note-category').value;
  
    if (content === '' || name === '') {
      alert('Please fill in both the Name and Content fields before saving the note.');
      return;
    }
  
    const newNote = {
      name: name,
      id: notesData.length + 1,
      createdAt: new Date().toISOString(),
      content: content,
      category: category,
      archived: false,
    };
  
    notesData.push(newNote);
    renderNotesTable();
    renderSummaryTable();
  
    document.getElementById('note-name').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-category').value = 'Task';
  } catch (error) {
    alert('An error occurred while saving the note. Please try again.');
    console.error(error);
    }
  }
  
  function initApp() {
    renderNotesTable();
    renderSummaryTable();
  
    const addNoteButton = document.getElementById('add-note-button');
    addNoteButton.addEventListener('click', onAddNoteButtonClick);
  }
  
  initApp();
  