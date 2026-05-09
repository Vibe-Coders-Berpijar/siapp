export type WorkflowCode = 'surat.keluar' | 'room_booking' | 'cuti.pegawai'

export type WorkflowStatus =
  | 'DRAFT' | 'SUBMITTED' | 'REVIEW' | 'APPROVED'
  | 'REJECTED' | 'SIGNED' | 'SENT'
  | 'PENDING' | 'AUTO_APPROVED' | 'NEEDS_REVIEW'

export interface WorkflowEvent {
  action: string
  fromStatus: WorkflowStatus
  toStatus: WorkflowStatus
  actor: string
  note?: string
  timestamp: string
}

export interface WorkflowInstance {
  id: string
  code: WorkflowCode
  entityId: string
  currentStatus: WorkflowStatus
  history: WorkflowEvent[]
}

const TRANSITIONS: Record<WorkflowCode, Record<string, WorkflowStatus>> = {
  'surat.keluar': {
    submit:  'SUBMITTED',
    review:  'REVIEW',
    approve: 'APPROVED',
    reject:  'REJECTED',
    sign:    'SIGNED',
    send:    'SENT',
  },
  'room_booking': {
    submit: 'AUTO_APPROVED',
    reject: 'REJECTED',
  },
  'cuti.pegawai': {
    submit:  'SUBMITTED',
    approve: 'APPROVED',
    reject:  'REJECTED',
  },
}

// In-memory store — resets on page refresh, fine for demo
const store: Record<string, WorkflowInstance> = {}

export function createWorkflow(code: WorkflowCode, entityId: string, initialStatus: WorkflowStatus = 'DRAFT'): WorkflowInstance {
  const instance: WorkflowInstance = {
    id: crypto.randomUUID(),
    code,
    entityId,
    currentStatus: initialStatus,
    history: [],
  }
  store[instance.id] = instance
  return instance
}

export function transition(
  instanceId: string,
  action: string,
  actor: string = 'Sekretariat',
  note?: string
): WorkflowInstance {
  const instance = store[instanceId]
  if (!instance) throw new Error('Workflow not found')

  const nextStatus = TRANSITIONS[instance.code][action]
  if (!nextStatus) throw new Error(`Action "${action}" not allowed`)

  const event: WorkflowEvent = {
    action,
    fromStatus: instance.currentStatus,
    toStatus: nextStatus,
    actor,
    note,
    timestamp: new Date().toLocaleString('id-ID'),
  }

  instance.history.push(event)
  instance.currentStatus = nextStatus
  store[instanceId] = instance
  return { ...instance, history: [...instance.history] }
}

export function getWorkflow(instanceId: string): WorkflowInstance | null {
  return store[instanceId] ?? null
}

export function getAllowedActions(instance: WorkflowInstance): string[] {
  return Object.keys(TRANSITIONS[instance.code])
}

export const STATUS_TO_STEP: Record<WorkflowStatus, number> = {
  DRAFT:        0,
  SUBMITTED:    1,
  REVIEW:       1,
  APPROVED:     2,
  SIGNED:       3,
  SENT:         4,
  REJECTED:     1,
  PENDING:      0,
  AUTO_APPROVED: 2,
  NEEDS_REVIEW: 1,
}
