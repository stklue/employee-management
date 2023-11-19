<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
import { useRoute, useRouter } from 'vue-router'
import { type Employee, emptyEmployee } from '@/types/employee'
const store = useEmployeeStore()

const route = useRoute()

const employee: Ref<Employee> = ref(emptyEmployee)

const name = ref(employee.value.name)
const surname = ref(employee.value.surname)
const position = ref(employee.value.position)
const birthdate = ref(employee.value.birthdate)
const salary = ref(employee.value.salary)
const line_manager = ref(employee.value.line_manager)

type Loading = 'Initial' | 'Loading' | 'Finished'
const loading: Ref<Loading> = ref('Initial')

onMounted(async () => {
  const id = route.params.id as string
  employee.value = await store.getEmployee(id)
  name.value = employee.value.name
  surname.value = employee.value.surname
  position.value = employee.value.position
  salary.value = employee.value.salary
  birthdate.value = employee.value.birthdate
  line_manager.value = employee.value.line_manager
})

watch(
  () => route.params.id,
  async (_, __) => {
    if (route.name === 'EditView') {
      employee.value = await store.getEmployee(route.params.id as string)
    } else {
      return {}
    }
  }
)

const submit = () => {
  if (
    name.value.length > 0 &&
    surname.value.length &&
    position.value.length &&
    birthdate.value.length
  ) {
    const e = {
      id: employee.value.id,
      employeeno: employee.value.employeeno,
      name: name.value,
      surname: surname.value,
      birthdate: birthdate.value,
      position: position.value,
      created_at: employee.value.created_at,
      salary: salary.value,
      line_manager: line_manager.value
    }
    validateLineManager()
    if(!valid.value) {
      alert("Employee cannot be their own line manager.")
    } else {
      loading.value = 'Loading'
      store.updateEmployee(e)
      loading.value = 'Finished'
    }
  } else {
    alert('Fields Should not be empty')
  }
}

const router = useRouter()

const deleteEmp = async (id: string) => {
  await store.deleteEmployee(id)
  router.replace('/')
}

const valid = ref(false)

const validateLineManager = () => {
  if (line_manager.value?.includes(name.value) || line_manager.value?.includes(surname.value)) {
    valid.value = false
  } else {
    valid.value = true
  }
}
</script>

<template>
  <!-- component -->
  <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px]">
      <form v-on:submit.prevent="submit">
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]"> Name </label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="name"
            placeholder="Name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="surname" class="mb-3 block text-base font-medium text-[#07074D]">
            Surname
          </label>
          <input
            type="surname"
            name="surname"
            v-model="surname"
            id="surname"
            placeholder="Surname"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="position" class="mb-3 block text-base font-medium text-[#07074D]">
            Position
          </label>
          <select
            name="position"
            id="position"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            v-model="position"
          >
            <option disabled value="">Please select position</option>
            <option>Developer</option>
            <option>Jr Developer</option>
            <option>Line Manager</option>
          </select>
        </div>
        <div class="mb-5">
          <label for="salary" class="mb-3 block text-base font-medium text-[#07074D]">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            v-model="salary"
            id="salary"
            placeholder="Enter salary"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="line manager" class="mb-3 block text-base font-medium text-[#07074D]">
            Line Manager
          </label>
          <input
            type="text"
            name="line manager"
            v-model="line_manager"
            id="line manager"
            placeholder="Enter Line Manager"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label for="birthdate" class="mb-3 block text-base font-medium text-[#07074D]">
            Birth Date
          </label>
          <input
            type="date"
            v-model="birthdate"
            name="birthdate"
            id="birthdate"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <!-- Profile Photo upload -->
        <!-- <div class="bg-white p7 rounded w-9/12 mx-auto">
          <div x-data="dataFileDnD()" class="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
              <div x-ref="dnd"
                  class="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer">
                  <input accept="*" type="file" multiple
                      class="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                      @change="addFiles($event)"
                      @dragover="$refs.dnd.classList.add('border-blue-400'); $refs.dnd.classList.add('ring-4'); $refs.dnd.classList.add('ring-inset');"
                      @dragleave="$refs.dnd.classList.remove('border-blue-400'); $refs.dnd.classList.remove('ring-4'); $refs.dnd.classList.remove('ring-inset');"
                      @drop="$refs.dnd.classList.remove('border-blue-400'); $refs.dnd.classList.remove('ring-4'); $refs.dnd.classList.remove('ring-inset');"
                      title="" />
          
                  <div class="flex flex-col items-center justify-center py-10 text-center">
                      <svg class="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p class="m-0">Drag your profile image here or click in this area.</p>
                  </div>
              </div>
              <template x-if="files.length > 0">
                  <div class="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6" @drop.prevent="drop($event)"
                      @dragover.prevent="$event.dataTransfer.dropEffect = 'move'">
                      <template x-for="(_, index) in Array.from({ length: files.length })">
                          <div class="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none"
                              style="padding-top: 100%;" @dragstart="dragstart($event)" @dragend="fileDragging = null"
                              :class="{'border-blue-600': fileDragging == index}" draggable="true" :data-index="index">
                              <button class="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none" type="button" @click="remove(index)">
                                  <svg class="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                      viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                              </button>
                              <template x-if="files[index].type.includes('audio/')">
                                  <svg class="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                  </svg>
                              </template>
                              <template x-if="files[index].type.includes('application/') || files[index].type === ''">
                                  <svg class="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                              </template>
                              <template x-if="files[index].type.includes('image/')">
                                  <img class="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                                      x-bind:src="loadFile(files[index])" />
                              </template>
                              <template x-if="files[index].type.includes('video/')">
                                  <video
                                      class="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview">
                                      <fileDragging x-bind:src="loadFile(files[index])" type="video/mp4">
                                  </video>
                              </template>
          
                              <div class="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                                  <span class="w-full font-bold text-gray-900 truncate"
                                      x-text="files[index].name">Loading</span>
                                  <span class="text-xs text-gray-900" x-text="humanFileSize(files[index].size)">...</span>
                              </div>
          
                              <div class="absolute inset-0 z-40 transition-colors duration-300" @dragenter="dragenter($event)"
                                  @dragleave="fileDropping = null"
                                  :class="{'bg-blue-200 bg-opacity-80': fileDropping == index && fileDragging != index}">
                              </div>
                          </div>
                      </template>
                  </div>
              </template>
          </div>
        </div> -->

        <div>
          <button
            type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Update
          </button>
        </div>
        <div>
          <button
            type="button"
            @click="deleteEmp(employee.id)"
            class="hover:shadow-form rounded-md bg-[#f17464] my-4 w-full py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Delete Employee
          </button>
        </div>
        <div class="m-4 text-white">
          <div v-if="store.state === 'Fail'" class="w-full bg-red-500">
            Failed to update employee.
          </div>
          <div v-if="loading === 'Loading'" class="w-full bg-orange-300">Updating ...</div>
          <div v-if="store.state === 'Successfull'" class="w-full bg-green-500">
            Employee Updated successfully
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
