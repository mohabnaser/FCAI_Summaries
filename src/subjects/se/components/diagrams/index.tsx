import type { ComponentType } from 'react'
import { FloatDigitsDiagram, FloatSequenceDiagram, HarnessDiagram, PidLoopDiagram } from './week1'
import {
  ArchitectDeveloperDiagram,
  CircleOfLifeDiagram,
  ComplexityDiagram,
  CostCurveDiagram,
  DesignOvalsDiagram,
  EisenhowerDiagram,
  KnowledgePyramidDiagram,
  MlInversionDiagram,
  ScopeShapeDiagram,
} from './week2'
import {
  DipInversionDiagram,
  IspSplitDiagram,
  LspHeightDiagram,
  OcpPluginDiagram,
  SolidTempleDiagram,
  SrpActorsDiagram,
} from './week3'
import {
  AllocationStylesDiagram,
  ClimateViewsDiagram,
  DecompositionDiagram,
  DeploymentDiagram,
  ModuleVsComponentDiagram,
  ThreeStructuresDiagram,
  UmlComponentDiagram,
  UsesDiagram,
  ViewsEquationDiagram,
} from './week4'
import {
  ArchProcessDiagram,
  ClientServerDiagram,
  MessagingDiagram,
  NTierDiagram,
  P2PDiagram,
  PipeFilterDiagram,
  TopologiesDiagram,
} from './week5'

/** Every diagram a lesson can embed with `{ kind: 'diagram', id }`. */
export const diagrams = {
  harness: HarnessDiagram,
  'pid-loop': PidLoopDiagram,
  'float-sequence': FloatSequenceDiagram,
  'float-digits': FloatDigitsDiagram,
  complexity: ComplexityDiagram,
  'design-ovals': DesignOvalsDiagram,
  'architect-developer': ArchitectDeveloperDiagram,
  'cost-curve': CostCurveDiagram,
  eisenhower: EisenhowerDiagram,
  'scope-shape': ScopeShapeDiagram,
  'knowledge-pyramid': KnowledgePyramidDiagram,
  'ml-inversion': MlInversionDiagram,
  'circle-of-life': CircleOfLifeDiagram,
  'solid-temple': SolidTempleDiagram,
  'srp-actors': SrpActorsDiagram,
  'ocp-plugin': OcpPluginDiagram,
  'lsp-height': LspHeightDiagram,
  'isp-split': IspSplitDiagram,
  'dip-inversion': DipInversionDiagram,
  'views-equation': ViewsEquationDiagram,
  'three-structures': ThreeStructuresDiagram,
  'module-vs-component': ModuleVsComponentDiagram,
  decomposition: DecompositionDiagram,
  uses: UsesDiagram,
  'uml-component': UmlComponentDiagram,
  'climate-views': ClimateViewsDiagram,
  'allocation-styles': AllocationStylesDiagram,
  deployment: DeploymentDiagram,
  topologies: TopologiesDiagram,
  'arch-process': ArchProcessDiagram,
  ntier: NTierDiagram,
  'client-server': ClientServerDiagram,
  p2p: P2PDiagram,
  'pipe-filter': PipeFilterDiagram,
  messaging: MessagingDiagram,
} satisfies Record<string, ComponentType>

export type DiagramId = keyof typeof diagrams
