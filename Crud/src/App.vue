<script setup>
// ---------- 1. IMPORTS ----------
// ref creates reactive "boxes" that Vue watches for changes
import { ref } from 'vue'

// ---------- 2. DATA (the boxes Vue watches) ----------
// The list of users shown in the table
const users = ref([
  { id: 1, name: 'Asha', email: 'asha@mail.com', role: 'Admin' },
  { id: 2, name: 'Ravi', email: 'ravi@mail.com', role: 'Editor' },
  { id: 3, name: 'Meera', email: 'meera@mail.com', role: 'Viewer' },
])

// true = popup is showing, false = popup is hidden
const dialogVisible = ref(false)

// The popup's input boxes: one object holding all three fields
const form = ref({ name: '', email: '', role: '' })

// null   = we are ADDING a new user
// number = we are EDITING the user with that id
const editingId = ref(null)

// ---------- 3. DELETE ----------
// Keep every user except the one whose id was passed in
function removeUser(id) {
  users.value = users.value.filter((u) => u.id !== id)
}

// ---------- 4. OPEN THE POPUP IN EDIT MODE ----------
// Runs when Edit is clicked. "row" is the whole user object for that line.
function openEdit(row) {
  editingId.value = row.id      // remember WHICH user is being edited
  form.value = { ...row }       // copy their data into the form (a copy, so the table doesn't change live)
  dialogVisible.value = true    // open the popup
}

// ---------- 5. SAVE (handles both Add and Edit) ----------
// Runs when Save is clicked
function saveUser() {
  if (editingId.value === null) {
    // ADD mode: new user with a unique id (from the current time) plus the form's fields
    users.value.push({ id: Date.now(), ...form.value })
  } else {
    // EDIT mode: go through the list, replace only the matching user, keep the rest as is
    users.value = users.value.map((u) =>
      u.id === editingId.value ? { id: u.id, ...form.value } : u
    )
  }

  // Cleanup after saving
  form.value = { name: '', email: '', role: '' }  // empty the input boxes
  editingId.value = null                          // back to "adding" mode
  dialogVisible.value = false                     // close the popup
}

// ---------- 6. CANCEL / RESET ----------
// Resets everything. Runs from the Cancel button AND from the dialog's @closed event.
function cancelEdit() {
  form.value = { name: '', email: '', role: '' }  // empty the input boxes
  editingId.value = null                          // back to "adding" mode
  dialogVisible.value = false                     // close the popup
}
</script>

<template>
  <!-- ---------- 7. PAGE HEADER AND ADD BUTTON ---------- -->
  <h1>Users</h1>
  <!-- Opens the popup. editingId is null here, so the popup is in "Add" mode -->
  <el-button type="primary" @click="dialogVisible = true">Add user</el-button>

  <!-- ---------- 8. THE POPUP (used for both Add and Edit) ---------- -->
  <!-- v-model: popup open/closed is linked to dialogVisible in both directions -->
  <!-- :title: shows "Add user" or "Edit user" depending on editingId -->
  <!-- @closed: runs cancelEdit whenever the popup finishes closing (Cancel, X, Esc, clicking outside) -->
  <el-dialog
    v-model="dialogVisible"
    :title="editingId === null ? 'Add user' : 'Edit user'"
    width="400px"
    @closed="cancelEdit"
  >
    <!-- The form: each input is linked to one field of "form" -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Role">
        <el-input v-model="form.role" />
      </el-form-item>
    </el-form>

    <!-- Popup buttons, placed in the dialog's footer slot -->
    <template #footer>
      <!-- Resets the form and closes the popup without saving -->
      <el-button @click="cancelEdit">Cancel</el-button>
      <!-- Runs saveUser: adds or updates depending on editingId -->
      <el-button type="primary" @click="saveUser">Save</el-button>
    </template>
  </el-dialog>

  <!-- ---------- 9. THE TABLE (Read) ---------- -->
  <!-- :data gives the table its list; it draws one row per user -->
  <el-table :data="users">
    <!-- Each column shows one field of every user (prop = field name) -->
    <el-table-column prop="id" label="Id" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="role" label="Role" />

    <!-- Actions column: custom buttons, so we use the default slot -->
    <!-- "row" is the user object for that line of the table -->
    <el-table-column label="Actions">
      <template #default="{ row }">
        <!-- Delete: sends this row's id to removeUser -->
        <el-button type="danger" size="small" @click="removeUser(row.id)">
          Delete
        </el-button>
        <!-- Edit: sends the whole row to openEdit -->
        <el-button size="small" @click="openEdit(row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>