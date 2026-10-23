<script setup>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUsers } from '@/features/users/composables/useUsers'
import UserTable from '@/features/users/components/UserTable.vue'
import UserFormDialog from '@/features/users/components/UserFormDialog.vue'

const { users, addUser, updateUser, removeUser } = useUsers()

const dialogVisible = ref(false)    // is the popup open?
const editingUser = ref(null)       // null = adding, an object = editing

function openAdd() {
  editingUser.value = null
  dialogVisible.value = true
}

function openEdit(row) {
  editingUser.value = row
  dialogVisible.value = true
}

// the dialog hands over the finished form; the page picks add or update
function handleSave(data) {
  if (editingUser.value) {
    updateUser(editingUser.value.id, data)
  } else {
    addUser(data)
  }
}

// ask "are you sure?" before deleting
async function handleRemove(id) {
  try {
    await ElMessageBox.confirm('Delete this user?', 'Confirm', {
      type: 'warning',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    })
    removeUser(id)                      // runs only if they clicked Delete
    ElMessage.success('User deleted')
  } catch {
    // they clicked Cancel, so do nothing
  }
}
</script>

<template>
  <h1>Users</h1>
  <el-button type="primary" @click="openAdd">Add user</el-button>

  <UserTable :users="users" @edit="openEdit" @remove="handleRemove" />

  <UserFormDialog
    v-model="dialogVisible"
    :user="editingUser"
    @save="handleSave"
  />
</template>