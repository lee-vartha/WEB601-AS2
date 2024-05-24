document.addEventListener('DOMContentLoaded', function() {
    const notesListSection = document.getElementById('notes-list-section');
    const addNoteSection = document.getElementById('add-note-section');
    const viewNoteSection = document.getElementById('view-note-section');
    const editNoteSection = document.getElementById('edit-note-section');
    const newNoteBtn = document.getElementById('new-note-btn');
    const addNoteForm = document.getElementById('add-note-form');
    const editNoteForm = document.getElementById('edit-note-form');
    const backButton = document.getElementById('back-btn');
    const notesList = document.getElementById('notes-list');
    const viewNoteForm = document.getElementById('view-note-form');

    let editingIndex = -1;

    function showNotesListSection() {
        notesListSection.style.display = 'block';
        addNoteSection.style.display = 'none';
        viewNoteSection.style.display = 'none';
        editNoteSection.style.display = 'none';
    }

    function showAddNoteSection() {
        notesListSection.style.display = 'none';
        addNoteSection.style.display = 'block';
        viewNoteSection.style.display = 'none';
        editNoteSection.style.display = 'none';
    }

    function showViewNoteSection() {
        notesListSection.style.display = 'none';
        addNoteSection.style.display = 'none';
        viewNoteSection.style.display = 'block';
        editNoteSection.style.display = 'none';
    }

    function showEditNoteSection() {
        notesListSection.style.display = 'none';
        addNoteSection.style.display = 'none';
        viewNoteSection.style.display = 'none';
        editNoteSection.style.display = 'block';
    }


    // when clicking on 'new note' button
    newNoteBtn.addEventListener('click', function(event) {
        event.preventDefault();
        showAddNoteSection();
        editingIndex = -1; 
    })

     // Event listener for form submission (adding note)
     addNoteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveOrUpdateNote();
        editingIndex = -1; 
    });


     // event listener for form submission (editing note)
     editNoteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveOrUpdateNote();
    });


    // when clicking on 'edit' button in the view note section
    document.getElementById('edit-note-btn').addEventListener('click', function(event) {
        event.preventDefault();
        showEditNoteSection();

        var title = document.getElementById('view-note-title').value;
        var content = document.getElementById('view-note-content').value;
        document.getElementById('edit-note-title').value = title;
        document.getElementById('edit-note-content').value = content;
    });

    // when clicking on 'delete' button in the view note section
    document.getElementById('delete-note-btn').addEventListener('click', function(event) {
        event.preventDefault();
        var storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        storedNotes.splice(editingIndex, 1);
        localStorage.setItem('notes', JSON.stringify(storedNotes));
        showNotesListSection();
        renderNotes();
        editingIndex = -1;
    });


     // clicking on "back" button in add note section
     document.getElementById('backBtnAddNote').addEventListener('click', function(event) {
        event.preventDefault();
        showNotesListSection();
        editingIndex = -1; // Reset editing index when going back
    });

    // clicking on "back" button in view note section
    document.getElementById('backBtnViewNote').addEventListener('click', function(event) {
        event.preventDefault();
        showNotesListSection();
        editingIndex = -1;
    });


    // clicking on "back" button in edit note section
    document.getElementById('backBtnEditNote').addEventListener('click', function(event) {
    event.preventDefault();
    showViewNoteSection();
    editingIndex = -1;
});


    // function to render notes list
function renderNotes() {
    var storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // clearing existing list

    storedNotes.forEach(function(note, index) {
        var listItem = document.createElement('li');
        listItem.classList.add('note-item'); // Add class for styling

        // creating a container div for note title
        var noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');

        // creating a span for note title
        var titleSpan = document.createElement('span');
        titleSpan.textContent = note.title;
        noteContainer.appendChild(titleSpan);

        listItem.appendChild(noteContainer);

        // event listener to display note content on click
        listItem.addEventListener('click', function() {
            showViewNoteSection(); // Show view note section
            document.getElementById('view-note-title').value = note.title;
            document.getElementById('view-note-content').value = note.content;
            editingIndex = index; // Set editing index to current note index
        });

        notesList.appendChild(listItem); // Append list item to notes list
    });
}

showNotesListSection();
renderNotes();


    // Function to handle adding or updating a note
    function saveOrUpdateNote() {
        var title, content;

        if (editingIndex !== -1) {
            title = document.getElementById('edit-note-title').value;
            content = document.getElementById('edit-note-content').value;
        } else {
            title = document.getElementById('add-note-title').value;
            content = document.getElementById('add-note-content').value;
        }

        if (title.trim() !== '' && content.trim() !== '') {
            var storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

            if (editingIndex === -1) {
                // If adding a new note, push it to the array
                storedNotes.push({ title: title, content: content });
            } else {
                // If editing an existing note, update it
                storedNotes[editingIndex] = { title: title, content: content };
            }

            
            localStorage.setItem('notes', JSON.stringify(storedNotes));
            showNotesListSection(); // Switch back to the notes list section
            renderNotes(); // Update the notes list
            addNoteForm.reset(); // Clear the add note form
            editNoteForm.reset(); // Clear the edit note form
            editingIndex = -1; // Reset editing index
        }
    }



})