import { ref, watch } from 'vue'

// shown the first time, before anything is saved in the browser
const defaultUsers = [
  { id: 1, name: 'Asha', email: 'asha@mail.com', role: 'Admin' },
  { id: 2, name: 'Ravi', email: 'ravi@mail.com', role: 'Editor' },
  { id: 3, name: 'Meera', email: 'meera@mail.com', role: 'Viewer' },
]

export function useUsers() {
  // load saved users if there are any, otherwise use the defaults
  const users = ref(JSON.parse(localStorage.getItem('users')) ?? defaultUsers)

  // CREATE: build a full user (with a unique id) from the typed data
  function addUser(data) {
    users.value.push({ id: Date.now(), ...data })
  }

  // UPDATE: replace only the matching user, keep the id, keep everyone else
  function updateUser(id, data) {
    users.value = users.value.map((u) =>
      u.id === id ? { id: u.id, ...data } : u
    )
  }

  // DELETE: keep everyone except the user with this id
  function removeUser(id) {
    users.value = users.value.filter((u) => u.id !== id)
  }

  // save to the browser every time the list changes
  watch(users, () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }, { deep: true })

  return { users, addUser, updateUser, removeUser }
}