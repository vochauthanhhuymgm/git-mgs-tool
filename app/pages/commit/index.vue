<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="">
      <h1 class="text-3xl font-bold tracking-tight">Git Commit Message Generator</h1>
      <p class="text-muted-foreground mt-2">Create standardized commit messages</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Commit Information</CardTitle>
        <CardDescription>
          Fill in the details to generate a properly formatted commit message
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <!-- Type Selection -->
        <div class="space-y-2">
          <Label for="commit-type">Commit Type</Label>
          <Select v-model="commitType">
            <SelectTrigger>
              <SelectValue placeholder="Select commit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feat">feat - A new feature</SelectItem>
              <SelectItem value="fix">fix - A bug fix</SelectItem>
              <SelectItem value="docs">docs - Documentation changes</SelectItem>
              <SelectItem value="style">style - Code style changes</SelectItem>
              <SelectItem value="refactor">refactor - Code refactoring</SelectItem>
              <SelectItem value="test">test - Adding or updating tests</SelectItem>
              <SelectItem value="chore">chore - Maintenance tasks</SelectItem>
              <SelectItem value="perf">perf - Performance improvements</SelectItem>
              <SelectItem value="ci">ci - CI/CD changes</SelectItem>
              <SelectItem value="build">build - Build system changes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Ticket Number -->
        <div class="space-y-2">
          <Label for="ticket-number">Ticket Number (Optional)</Label>
          <Input
            id="ticket-number"
            v-model="ticketNumber"
            placeholder="e.g., JIRA-123, #456"
            type="text"
          />
        </div>

        <!-- Commit Message -->
        <div class="space-y-2">
          <Label for="commit-message">Commit Message</Label>
          <Textarea
            id="commit-message"
            v-model="commitMessage"
            placeholder="Describe your changes in imperative mood"
            class="min-h-[100px]"
          />
        </div>

        <!-- Generated Output -->
        <div class="space-y-2">
          <Label>Generated Commit Message</Label>
          <div class="p-3 bg-muted rounded-md font-mono text-sm">
            {{ generatedMessage || 'Fill in the fields above to generate commit message' }}
          </div>
        </div>
      </CardContent>

      <CardFooter class="flex justify-between">
        <Button variant="outline" @click="clearForm">
          Clear
        </Button>
        <Button @click="copyToClipboard" :disabled="!generatedMessage">
          <Copy class="w-4 h-4 mr-2" />
          Copy to Clipboard
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Copy } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'

// Form data
const commitType = ref('')
const ticketNumber = ref('')
const commitMessage = ref('')

// Computed generated message
const generatedMessage = computed(() => {
  if (!commitType.value || !commitMessage.value) return ''

  const ticket = ticketNumber.value ? `(${ticketNumber.value})` : ''
  return `${commitType.value}${ticket}: ${commitMessage.value}`
})

// Methods
const clearForm = () => {
  commitType.value = ''
  ticketNumber.value = ''
  commitMessage.value = ''
}

const copyToClipboard = async () => {
  if (!generatedMessage.value) return

  try {
    await navigator.clipboard.writeText(generatedMessage.value)
    // You could add a toast notification here
    console.log('Copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Page meta
definePageMeta({
  title: 'Git Commit Generator',
})
</script>

<style scoped>
</style>
