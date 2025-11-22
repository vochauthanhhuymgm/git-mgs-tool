<template>
  <div class="container mx-auto  max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Branch Name Generator</h1>
      <p class="text-muted-foreground">
        Generate standardized branch names following conventional branch naming standards
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Form -->
      <Card>
        <CardHeader>
          <CardTitle>Create Branch Name</CardTitle>
          <CardDescription>
            Fill in the details to generate a standardized branch name
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Branch Type -->
          <div class="space-y-2">
            <Label for="branch-type">Branch Type *</Label>
            <Select v-model="selectedType">
              <SelectTrigger>
                <SelectValue placeholder="Select branch type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="type in branchTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  <span>{{ type.value }}</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Issue/Ticket Number -->
          <div class="space-y-2">
            <Label for="ticket">Issue/Ticket Number *</Label>
            <Input
              id="ticket"
              v-model="ticketNumber"
              placeholder="JIRA-123, #456, etc."
            />
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Input
              id="description"
              v-model="description"
              placeholder="Brief description using kebab-case"
            />
          </div>

          <!-- Additional Options -->
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <Checkbox id="initials" v-model:checked="includeInitials" />
              <Label for="initials">Include developer initials</Label>
            </div>
            <Input
              v-if="includeInitials"
              v-model="developerInitials"
              placeholder="Your initials (e.g., jd)"
              class="ml-6"
            />
          </div>

          <!-- Actions -->
          <div class="flex space-x-2 pt-4">
            <Button @click="generateBranch" :disabled="!isFormValid" class="flex-1">
              <GitBranch class="w-4 h-4 mr-2" />
              Generate Branch
            </Button>
            <Button variant="outline" @click="resetForm">
              <RotateCcw class="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Preview and Output -->
      <Card>
        <CardHeader>
          <CardTitle>Generated Branch Name</CardTitle>
          <CardDescription>
            Your standardized branch name ready to use
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Live Preview -->
          <div class="space-y-2">
            <Label>Preview</Label>
            <div class="p-3 bg-muted rounded-md font-mono text-sm break-all">
              {{ generatedBranch || 'Select options to generate branch name...' }}
            </div>
          </div>

          <!-- Copy Button -->
          <Button
            v-if="generatedBranch"
            @click="copyToClipboard"
            variant="outline"
            class="w-full"
          >
            <Copy class="w-4 h-4 mr-2" />
            {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
          </Button>

          <!-- Git Commands -->
          <div v-if="generatedBranch" class="space-y-3 pt-4 border-t">
            <Label>Git Commands</Label>
            <div class="space-y-2">
              <div class="p-2 bg-muted rounded text-sm font-mono">
                git checkout -b {{ generatedBranch }}
              </div>
              <Button
                variant="ghost"
                size="sm"
                @click="copyCommand"
                class="w-full text-xs"
              >
                <Terminal class="w-3 h-3 mr-1" />
                Copy Git Command
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Branch Types Reference -->
    <Card class="mt-8">
      <CardHeader>
        <CardTitle>Branch Types Reference</CardTitle>
        <CardDescription>
          Based on <a href="https://conventional-branch.github.io/" target="_blank"
                      class="text-primary hover:underline font-medium
 ">
          conventional-branch.github.io
        </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="type in branchTypes" :key="type.value" class="p-3 border rounded-lg">
            <div class="font-medium text-sm">{{ type.value }}</div>
            <div class="text-xs text-muted-foreground mt-1">{{ type.description }}</div>
            <div class="text-xs text-primary mt-1">{{ type.example }}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { GitBranch, Copy, RotateCcw, Terminal } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Checkbox } from '../../components/ui/checkbox'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
// Reactive state
const selectedType = ref('')
const ticketNumber = ref('')
const description = ref('')
const includeInitials = ref(false)
const developerInitials = ref('')
const copied = ref(false)

// Branch types based on conventional-branch.github.io
const branchTypes = [
  { value: 'feature', description: 'New feature development', example: 'feature/user-authentication' },
  { value: 'fix', description: 'Bug fixes', example: 'bugfix/login-error' },
  { value: 'hotfix', description: 'Critical production fixes', example: 'hotfix/security-patch' },
  { value: 'release', description: 'Release preparation', example: 'release/v1.2.0' },
  { value: 'support', description: 'Support branches', example: 'support/legacy-api' },
  { value: 'experimental', description: 'Experimental features', example: 'experimental/new-ui' },
  { value: 'refactor', description: 'Code refactoring', example: 'refactor/database-layer' },
  { value: 'docs', description: 'Documentation updates', example: 'docs/api-documentation' },
  { value: 'test', description: 'Test improvements', example: 'test/unit-tests' },
  { value: 'chore', description: 'Maintenance tasks', example: 'chore/dependency-update' },
]

// Computed properties
const isFormValid = computed(() => {
  return selectedType.value && ticketNumber.value.trim()
})

const generatedBranch = computed(() => {
  if (!isFormValid.value) return ''

  const parts = [selectedType.value]

  if (ticketNumber.value.trim()) {
    parts.push(ticketNumber.value.trim().toLowerCase())
  }

  if (includeInitials.value && developerInitials.value.trim()) {
    parts.push(developerInitials.value.trim().toLowerCase())
  }

  parts.push(description.value.trim().toLowerCase().replace(/\s+/g, '-'))

  return parts.join('/')
})

// Methods
const generateBranch = () => {
  if (!isFormValid.value) return
  // Branch is automatically generated via computed property
}

const resetForm = () => {
  selectedType.value = ''
  ticketNumber.value = ''
  description.value = ''
  includeInitials.value = false
  developerInitials.value = ''
  copied.value = false
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedBranch.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(`git checkout -b ${generatedBranch.value}`)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy command:', err)
  }
}

// Watch for changes to auto-generate
watch([selectedType, ticketNumber, description, includeInitials, developerInitials], () => {
  copied.value = false
})

// Page meta
useHead({
  title: 'Branch Name Generator - Git Tools',
  meta: [
    {
      name: 'description',
      content: 'Generate standardized Git branch names following conventional branch naming standards',
    },
  ],
})
</script>
