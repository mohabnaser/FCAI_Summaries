import type { LText, VisualId } from '../../types'
import { InterruptTimelineVisual } from './InterruptTimeline'
import { MultiprogrammingVisual } from './Multiprogramming'
import { DualModeVisual } from './DualMode'
import { IoMethodsVisual } from './IoMethods'
import { ProtectionVisual } from './Protection'
import { SystemLayersVisual } from './SystemLayers'
import { SystemOrganizationVisual } from './SystemOrganization'
import { StoragePyramidVisual } from './StoragePyramid'
import { CacheLookupVisual } from './CacheLookup'
import { DeviceStatusVisual } from './DeviceStatus'
import { DmaCompareVisual } from './DmaCompare'
import { MultiprocessorVisual } from './Multiprocessor'
import { VirtualizationStackVisual } from './VirtualizationStack'
import { NetworkModelsVisual } from './NetworkModels'
import { OsServicesMapVisual } from './chapter2/OsServicesMap'
import { ShellDemoVisual } from './chapter2/ShellDemo'
import { FileCopySyscallsVisual } from './chapter2/FileCopySyscalls'
import { SystemCallFlowVisual } from './chapter2/SystemCallFlow'
import { ParameterPassingVisual } from './chapter2/ParameterPassing'
import { SyscallClassifierVisual } from './chapter2/SyscallClassifier'
import { OsStructureExplorerVisual } from './chapter2/OsStructureExplorer'
import { BootSequenceVisual } from './chapter2/BootSequence'
import { ProcessMemoryVisual } from './chapter3/ProcessMemory'
import { ProcessStatesVisual } from './chapter3/ProcessStates'
import { ForkTraceVisual } from './chapter3/ForkTrace'
import { BoundedBufferVisual } from './chapter3/BoundedBuffer'
import { MessageBufferingVisual } from './chapter3/MessageBuffering'
import { RaceConditionVisual } from './chapter5/RaceCondition'
import { SemaphoreLabVisual } from './chapter5/SemaphoreLab'
import { ReadersWritersVisual } from './chapter5/ReadersWriters'
import { DiningPhilosophersVisual } from './chapter5/DiningPhilosophers'

type VisualComponent = (props: { title: LText; hint?: LText }) => React.ReactElement

/**
 * Registered visuals for every chapter. The map is typed as partial so a chapter can
 * reserve an ID before its component exists; `hasVisual` lets tests assert that every
 * visual a section actually uses is registered.
 */
export const visuals: Partial<Record<VisualId, VisualComponent>> = {
  'system-layers': SystemLayersVisual,
  'system-organization': SystemOrganizationVisual,
  'interrupt-timeline': InterruptTimelineVisual,
  'storage-pyramid': StoragePyramidVisual,
  'cache-lookup': CacheLookupVisual,
  'io-methods': IoMethodsVisual,
  'device-status': DeviceStatusVisual,
  'dma-compare': DmaCompareVisual,
  multiprocessor: MultiprocessorVisual,
  multiprogramming: MultiprogrammingVisual,
  'dual-mode': DualModeVisual,
  protection: ProtectionVisual,
  'network-models': NetworkModelsVisual,
  'virtualization-stack': VirtualizationStackVisual,
  // Chapter 2
  'os-services-map': OsServicesMapVisual,
  'shell-demo': ShellDemoVisual,
  'file-copy-syscalls': FileCopySyscallsVisual,
  'system-call-flow': SystemCallFlowVisual,
  'parameter-passing': ParameterPassingVisual,
  'syscall-classifier': SyscallClassifierVisual,
  'os-structure-explorer': OsStructureExplorerVisual,
  'boot-sequence': BootSequenceVisual,
  // Chapter 3
  'process-memory': ProcessMemoryVisual,
  'process-states': ProcessStatesVisual,
  'fork-trace': ForkTraceVisual,
  'bounded-buffer': BoundedBufferVisual,
  'message-buffering': MessageBufferingVisual,
  // Chapter 5
  'race-condition': RaceConditionVisual,
  'semaphore-lab': SemaphoreLabVisual,
  'readers-writers': ReadersWritersVisual,
  'dining-philosophers': DiningPhilosophersVisual,
}

export function hasVisual(id: VisualId): boolean {
  return Boolean(visuals[id])
}

export function VisualRenderer({ id, title, hint }: { id: VisualId; title: LText; hint?: LText }) {
  const Visual = visuals[id]
  if (!Visual) return null
  return <Visual title={title} hint={hint} />
}
