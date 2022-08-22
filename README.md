## The challenge

Your challenge is to build out this task management app and get it looking as close to the design as possible.

Your users should be able to:

- [x] View the optimal layout for the app depending on their device's screen size
- [x] See hover states for all interactive elements on the page
- [x] Create, read, update, and delete boards and tasks
- [x] Receive form validations when trying to create/edit boards and tasks
- [x] Mark subtasks as complete and move tasks between columns
- [x] Hide/show the board sidebar
- [x] Toggle the theme between light/dark modes
- [x] **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- [x] **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- [ ] **Bonus**: Build this project as a full-stack application

### Expected Behaviour

- Boards
  - [x] Clicking different boards in the sidebar will change to the selected board.
  - [x] Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - [x] Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - [x] Columns are added and removed for the Add/Edit Board modals.
  - [x] Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - [x] A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
  - [x] Clicking "Add New Column" opens the "Edit Board" modal where columns are added.
- Tasks
  - [x] Adding a new task adds it to the bottom of the relevant column.
  - [x] Updating a task's status will move the task to the relevant column. If you're taking on the drag and drop bonus, dragging a task to a different column will also update the status.


