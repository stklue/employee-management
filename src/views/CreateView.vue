<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
import DropZone from '@/components/DropZone.vue'
import { uuid } from 'vue3-uuid'
import { supabase } from '../lib/supabaseClient'
import { emptyEmployee, type Employee } from '@/types/employee'
const store = useEmployeeStore()

const name = ref('')
const surname = ref('')
const email = ref('')
const position = ref('')
const profile = ref('')
const birthdate = ref('')
const salary = ref(0)
const uuid_id = ref(uuid.v4())
const uuid_employee = ref(uuid.v4())
const line_manager = ref('')

type Loading = 'Initial' | 'Loading' | 'Finished'
const loading: Ref<Loading> = ref('Initial')
const employee: Ref<Employee> = ref(emptyEmployee)
const submit = async () => {
  if (
    name.value.length > 0 &&
    surname.value.length &&
    email.value.length &&
    position.value.length &&
    birthdate.value.length
  ) {
    const profileUrl = await saveImage()
    if (profileUrl) {
      profile.value = profileUrl
    }
    const emp = {
      id: uuid_id.value,
      employeeno: uuid_employee.value,
      name: name.value,
      email: email.value,
      surname: surname.value,
      birthdate: birthdate.value,
      profileUrl: profile.value,
      position: position.value,
      line_manager: line_manager.value,
      created_at: new Date(),
      salary: salary.value
    }
    employee.value = emp
    validateLineManager()
    if (!valid.value) {
      alert('Employee cannot be their own line manager.')
    }
    {
      loading.value = 'Loading'
      store.createEmployee(employee.value)
      loading.value = 'Finished'
      setInterval(() => { store.state = 'Initial'}, 1000)
    }
  } else {
    alert('Fields Should not be empty')
  }
}

const valid = ref(false)

const validateLineManager = () => {
  if (line_manager.value?.includes(name.value) || line_manager.value?.includes(surname.value)) {
    valid.value = false
  } else {
    valid.value = true
  }
}

const dropzoneFile: Ref<File | undefined | null> = ref()
const uploaded = ref(false)
const drop = (e: DragEvent) => {
  dropzoneFile.value = e.dataTransfer?.files[0]
  uploaded.value = true
}
const selectedFile = () => {
  const element = document.querySelector<HTMLInputElement>('.dropzoneFile')
  if (element !== null) {
    if (element.files !== null) {
      dropzoneFile.value = element.files[0]
      uploaded.value = true
    }
  }
}

const saveImage = async () => {
  const { data: dataPath, error } = await supabase.storage
    .from('employees')
    .upload(`${employee.value.id}/${dropzoneFile.value?.name}`, dropzoneFile.value!, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) {
    return alert('Storage upload: ' + error.message)
  }
  const { data } = supabase.storage.from('employees').getPublicUrl(dataPath.path)
  return data.publicUrl
}
</script>

<template>
  <!-- component -->
  <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="submit">
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
          <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
            Email
          </label>
          <input
            type="email"
            name="email"
            v-model="email"
            id="email"
            placeholder="Email"
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
            <option>Architect</option>
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
        <DropZone @drop.prevent="drop" @change="selectedFile" :uploaded="uploaded" />
        <span v-if="dropzoneFile">File: {{ dropzoneFile.name }}</span>
        <span v-else>No file selected</span>

        <div>
          <button
            type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Create
          </button>
        </div>
        <div class="m-4 text-white">
          <div v-if="store.state === 'Fail'" class="w-full bg-red-500">
            Failed to create employee.
          </div>
          <div v-if="loading === 'Loading'" class="w-full bg-orange-300">Creating ...</div>
          <div v-if="store.state === 'Successfull'" class="w-full bg-green-500">
            Employee Created successfully
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
