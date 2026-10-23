<script setup>
defineProps({ users: Array })            // the list comes in from the parent
defineEmits(['edit', 'remove'])          // the two things it can announce
</script>

<template>
  <el-table :data="users">
    <el-table-column prop="id" label="Id" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="role" label="Role" />

    <el-table-column label="Actions">
      <template #default="{ row }">
        <!-- Delete announces which user (the id) -->
        <el-button type="danger" size="small" @click="$emit('remove', row.id)">
          Delete
        </el-button>
        <!-- Edit announces the whole user, so the form can be prefilled -->
        <el-button size="small" @click="$emit('edit', row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>