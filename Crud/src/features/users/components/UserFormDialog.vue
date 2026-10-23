<script setup>
import { ref, watch } from 'vue'

const visible = defineModel()                  // open/closed, controlled by the page
const props = defineProps({ user: Object })    // null = adding, an object = editing
const emit = defineEmits(['save'])

const emptyForm = () => ({ name: '', email: '', role: '' })
const form = ref(emptyForm())                  // the half-typed text lives only here

// every time the popup opens: fill with the user's data, or empty boxes
watch(visible, (isOpen) => {
  if (isOpen) {
    form.value = props.user ? { ...props.user } : emptyForm()
  }
})

function submit() {
  emit('save', form.value)    // announce the finished data first
  visible.value = false       // then close
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="user ? 'Edit user' : 'Add user'"
    width="400px"
  >
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

    <template #footer>
      <el-button @click="visible = false">Cancel</el-button>
      <el-button type="primary" @click="submit">Save</el-button>
    </template>
  </el-dialog>
</template>