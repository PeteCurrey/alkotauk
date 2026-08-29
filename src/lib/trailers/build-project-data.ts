import type {
  BuildStageId,
  BuildStage,
  BuildStageStatus,
  BuildProjectStatus,
  BuildUpdate,
  ComponentSerial,
  HandoverDocument,
  HandoverChecklistItem,
  BuildMediaItem,
  CustomerApproval,
  ServiceScheduleItem,
  ServiceHistoryEntry,
  WeightRecord,
  AuditLogEntry,
  TrailerBuildProject,
  TrailerConfiguration,
} from './types';

// ─── 01: ALL BUILD STAGES (ORDERED) ──────────────────────────────────────────

export const ALL_BUILD_STAGES: Array<{
  id: BuildStageId;
  internal_label: string;
  customer_label: string;
}> = [
  {
    id: 'order_confirmed',
    internal_label: 'Order Confirmed',
    customer_label: 'Order Confirmed',
  },
  {
    id: 'engineering_release',
    internal_label: 'Engineering Release',
    customer_label: 'Engineering Preparation',
  },
  {
    id: 'chassis_received',
    internal_label: 'Chassis / Base Received',
    customer_label: 'Chassis Received',
  },
  {
    id: 'fabrication',
    internal_label: 'Fabrication',
    customer_label: 'Fabrication & Bodywork',
  },
  {
    id: 'equipment_installation',
    internal_label: 'Equipment Installation',
    customer_label: 'Alkota System Installation',
  },
  {
    id: 'plumbing_fluid_systems',
    internal_label: 'Plumbing & Fluid Systems',
    customer_label: 'Water & System Integration',
  },
  {
    id: 'electrical_power',
    internal_label: 'Electrical & Power',
    customer_label: 'Electrical & Power',
  },
  {
    id: 'water_recovery_integration',
    internal_label: 'Water & Recovery Integration',
    customer_label: 'Recovery System Integration',
  },
  {
    id: 'livery_finish',
    internal_label: 'Livery & Finish',
    customer_label: 'Livery & Final Finish',
  },
  {
    id: 'system_testing',
    internal_label: 'System Testing',
    customer_label: 'System Testing',
  },
  {
    id: 'quality_check',
    internal_label: 'Quality Check',
    customer_label: 'Quality Check',
  },
  {
    id: 'ready_for_handover',
    internal_label: 'Ready for Handover',
    customer_label: 'Ready for Collection / Delivery',
  },
  {
    id: 'delivered',
    internal_label: 'Delivered',
    customer_label: 'Delivered',
  },
];

// ─── 02: FULL HANDOVER CHECKLIST ─────────────────────────────────────────────

export const FULL_HANDOVER_CHECKLIST: HandoverChecklistItem[] = [
  {
    id: 'final_system_test',
    test_type: 'System',
    description: 'Full system pressurisation and operational test',
    required_for: ['always'],
  },
  {
    id: 'pressure_flow_check',
    test_type: 'Performance',
    description: 'Pressure and flow readings verified against specification',
    required_for: ['always'],
  },
  {
    id: 'leak_check',
    test_type: 'Safety',
    description: 'All fluid connections leak-checked under operating pressure',
    required_for: ['always'],
  },
  {
    id: 'burner_operation',
    test_type: 'Performance',
    description: 'Burner ignition, temperature control and shutdown verified',
    required_for: ['always'],
  },
  {
    id: 'generator_test',
    test_type: 'Electrical',
    description: 'Generator start, load test and safety shutdown verified',
    required_for: ['generator'],
  },
  {
    id: 'dual_operator_test',
    test_type: 'Performance',
    description: 'Dual lance operation confirmed at full simultaneous flow',
    required_for: ['dual_operator'],
  },
  {
    id: 'recovery_system_test',
    test_type: 'Recovery',
    description: 'Recovery system operation, suction and discharge verified',
    required_for: ['recovery'],
  },
  {
    id: 'closed_loop_water_test',
    test_type: 'Recovery',
    description: 'Closed-loop recirculation cycle tested and confirmed',
    required_for: ['closed_loop'],
  },
  {
    id: 'vfs_filtration_test',
    test_type: 'Filtration',
    description: 'VFS filtration system flow and discharge quality verified',
    required_for: ['vfs_filtration'],
  },
  {
    id: 'vacgd_test',
    test_type: 'Recovery',
    description: 'VACGD vacuum recovery suction lift confirmed',
    required_for: ['vacgd'],
  },
  {
    id: 'enclosure_check',
    test_type: 'Physical',
    description: 'Enclosure doors, seals, ventilation and acoustic lining inspected',
    required_for: ['enclosed'],
  },
  {
    id: 'lighting_check',
    test_type: 'Electrical',
    description: 'All trailer and working lighting tested',
    required_for: ['always'],
  },
  {
    id: 'livery_check',
    test_type: 'Finish',
    description: 'Livery, graphics and finish quality inspected',
    required_for: ['always'],
  },
  {
    id: 'weight_verified',
    test_type: 'Compliance',
    description: 'Finished weight confirmed and recorded. MAM compliance verified',
    required_for: ['always'],
  },
  {
    id: 'document_pack_complete',
    test_type: 'Documentation',
    description: 'Full handover documentation pack assembled and verified',
    required_for: ['always'],
  },
  {
    id: 'serial_numbers_recorded',
    test_type: 'Documentation',
    description: 'All major component serial numbers recorded',
    required_for: ['always'],
  },
  {
    id: 'customer_training_complete',
    test_type: 'Training',
    description: 'Operator training completed and signed off',
    required_for: ['always'],
  },
  {
    id: 'hose_reel_check',
    test_type: 'Physical',
    description: 'Hose reels extend, retract and lock correctly under pressure',
    required_for: ['always'],
  },
];

// ─── 03: SAMPLE BUILD PROJECT (IN PRODUCTION: ABP-2509-001) ─────────────────

export const SAMPLE_BUILD_PROJECT: TrailerBuildProject = {
  id: 'bp-001',
  build_reference: 'ABP-2509-001',
  build_code: 'AKT-MRPQ47-UK',
  quote_reference: 'QT-2025-089',
  accepted_revision: 2,

  accepted_configuration: {
    build_code: 'AKT-MRPQ47-UK',
    format: 'enclosed',
    chassis_id: 'chassis-tandem-3500-enclosed',
    machine_id: 'machine-ded-big-boy',
    operator_count: 2,
    water_storage_id: 'tank-1000l-baffled',
    power_options: ['power-gen-5kw-diesel'],
    recovery_option_id: 'recovery-closed-loop-recycle',
    hose_storage_options: ['hose-dual-100m-manual'],
    site_options: ['site-internal-plant-lights', 'site-winterisation-purge'],
    finish_livery_id: 'finish-enclosed-full-fleet-wrap',
    pipeline_stage: 'won',
    contact: {
      name: 'James Hargreaves',
      company: 'Hargreaves Environmental Services Ltd',
      email: 'j.hargreaves@hargreaves-env.co.uk',
      phone: '07812 345678',
      postcode: 'BD1 1AA',
    },
  },

  customer_name: 'James Hargreaves',
  customer_company: 'Hargreaves Environmental Services Ltd',
  customer_email: 'j.hargreaves@hargreaves-env.co.uk',
  customer_phone: '07812 345678',
  customer_site: 'Bradford Depot, West Yorkshire',

  project_owner: 'Pete Currey',
  engineering_owner: 'Alkota Engineering',
  production_owner: 'Alkota Production',
  status: 'in_production',

  order_confirmed_at: '2025-09-05T09:00:00Z',
  target_handover_date: '2025-10-24T00:00:00Z',
  confirmed_handover_date: undefined,
  actual_handover_date: undefined,
  target_customer_visible: false,

  stages: [
    {
      id: 'order_confirmed',
      internal_label: 'Order Confirmed',
      customer_label: 'Order Confirmed',
      status: 'complete',
      started_at: '2025-09-05T09:00:00Z',
      completed_at: '2025-09-05T09:30:00Z',
      technician: 'P. Currey',
    },
    {
      id: 'engineering_release',
      internal_label: 'Engineering Release',
      customer_label: 'Engineering Preparation',
      status: 'complete',
      started_at: '2025-09-05T10:00:00Z',
      completed_at: '2025-09-08T16:00:00Z',
      technician: 'Lead Engineer',
    },
    {
      id: 'chassis_received',
      internal_label: 'Chassis / Base Received',
      customer_label: 'Chassis Received',
      status: 'complete',
      started_at: '2025-09-09T08:00:00Z',
      completed_at: '2025-09-12T11:00:00Z',
      technician: 'Workshop Lead',
    },
    {
      id: 'fabrication',
      internal_label: 'Fabrication',
      customer_label: 'Fabrication & Bodywork',
      status: 'complete',
      started_at: '2025-09-12T13:00:00Z',
      completed_at: '2025-09-18T17:00:00Z',
      technician: 'Fab Team A',
    },
    {
      id: 'equipment_installation',
      internal_label: 'Equipment Installation',
      customer_label: 'Alkota System Installation',
      status: 'complete',
      started_at: '2025-09-19T08:00:00Z',
      completed_at: '2025-09-22T12:00:00Z',
      technician: 'Rigging Team',
    },
    {
      id: 'plumbing_fluid_systems',
      internal_label: 'Plumbing & Fluid Systems',
      customer_label: 'Water & System Integration',
      status: 'in_progress',
      started_at: '2025-09-22T13:00:00Z',
      technician: 'Hydraulics Tech',
    },
    {
      id: 'electrical_power',
      internal_label: 'Electrical & Power',
      customer_label: 'Electrical & Power',
      status: 'not_started',
    },
    {
      id: 'water_recovery_integration',
      internal_label: 'Water & Recovery Integration',
      customer_label: 'Recovery System Integration',
      status: 'not_started',
    },
    {
      id: 'livery_finish',
      internal_label: 'Livery & Finish',
      customer_label: 'Livery & Final Finish',
      status: 'not_started',
    },
    {
      id: 'system_testing',
      internal_label: 'System Testing',
      customer_label: 'System Testing',
      status: 'not_started',
    },
    {
      id: 'quality_check',
      internal_label: 'Quality Check',
      customer_label: 'Quality Check',
      status: 'not_started',
    },
    {
      id: 'ready_for_handover',
      internal_label: 'Ready for Handover',
      customer_label: 'Ready for Collection / Delivery',
      status: 'not_started',
    },
    {
      id: 'delivered',
      internal_label: 'Delivered',
      customer_label: 'Delivered',
      status: 'not_started',
    },
  ],

  updates: [
    {
      id: 'upd-001',
      date: '2025-09-05',
      message: 'Your order has been confirmed and build project opened. Our engineering team is reviewing your specification.',
      is_milestone: true,
      stage_id: 'order_confirmed',
    },
    {
      id: 'upd-002',
      date: '2025-09-12',
      message: 'The 3,500kg tandem chassis has been received and positioned for fabrication. Enclosed body construction has commenced.',
      is_milestone: true,
      stage_id: 'chassis_received',
      photo_url: '/images/trailers/builds/sample-chassis-received.jpg',
    },
    {
      id: 'upd-003',
      date: '2025-09-22',
      message: 'The Alkota DED-4000 diesel machine has been installed and mounted. Dual-gun plumbing is now underway.',
      is_milestone: false,
      stage_id: 'equipment_installation',
    },
  ],

  component_serials: [
    {
      id: 'cs-001',
      category: 'chassis',
      description: '3500kg Tandem Enclosed Chassis',
      make: 'Ifor Williams',
      model: 'GH1054BT-ENC',
      vin: 'SIFXX000000123456',
    },
    {
      id: 'cs-002',
      category: 'machine',
      description: 'Alkota DED-4000 Diesel',
      make: 'Alkota',
      model: 'DED-4000',
      serial_number: 'AK-DED-2025-0089',
    },
    {
      id: 'cs-003',
      category: 'engine',
      description: 'Diesel Engine',
      make: 'Hatz',
      model: '1D81Z',
      serial_number: 'HZ-25-081234',
    },
    {
      id: 'cs-004',
      category: 'pump',
      description: 'Triplex High Pressure Pump',
      make: 'CAT Pumps',
      model: '530',
      serial_number: 'CAT-530-25-00412',
    },
  ],

  media: [
    {
      id: 'med-001',
      stage_id: 'chassis_received',
      filename: 'chassis_delivery_abp001.jpg',
      url: '/images/trailers/builds/sample-chassis-received.jpg',
      alt_text: '3500kg heavy duty chassis positioned in fabrication bay',
      caption: '3,500kg chassis arrival at Alkota UK workshop',
      classification: 'customer_visible',
      uploaded_at: '2025-09-12T11:15:00Z',
      uploaded_by: 'Workshop Lead',
    },
    {
      id: 'med-002',
      stage_id: 'equipment_installation',
      filename: 'machine_mounting_ded4000.jpg',
      url: '/images/trailers/builds/sample-machine-mounted.jpg',
      alt_text: 'DED-4000 skid secured with anti-vibration mountings',
      caption: 'Alkota DED-4000 installed with AV dampers',
      classification: 'customer_visible',
      uploaded_at: '2025-09-22T11:45:00Z',
      uploaded_by: 'Rigging Team',
    },
  ],

  customer_approvals: [
    {
      id: 'app-001',
      type: 'livery',
      title: 'Full Enclosure Fleet Vinyl Wrap — Revision 1',
      version: 1,
      document_url: '/docs/livery-proof-hargreaves-v1.pdf',
      submitted_at: '2025-09-20T10:00:00Z',
      status: 'pending_customer_approval',
      customer_notes: undefined,
    },
  ],

  weights: {
    estimated_dry_kg: 2450,
    estimated_wet_kg: 3400,
    verified_finished_weight_kg: undefined,
  },

  final_engineering_notes: 'Dual-gun plumbing configured for simultaneous 8.5 LPM per lance at 200 bar. Closed-loop tank positioned at rear for optimal axle download balancing.',

  handover_checklist: FULL_HANDOVER_CHECKLIST,
  handover_documents: [
    {
      id: 'doc-001',
      type: 'machine_manual',
      title: 'Alkota DED-4000 Operator Manual',
      revision: 'Rev 3.2',
      date: '2025-09-10',
      customer_visible: true,
      url: '/docs/ded-4000-manual.pdf',
      superseded: false,
    },
    {
      id: 'doc-002',
      type: 'warranty',
      title: 'Alkota Warranty Certificate — DED-4000',
      revision: 'Rev 1',
      date: '2025-09-10',
      customer_visible: true,
      url: '/docs/warranty-ded4000.pdf',
      superseded: false,
    },
    {
      id: 'doc-003',
      type: 'trailer_docs',
      title: 'Trailer Type Approval Certificate',
      revision: 'Rev 1',
      date: '2025-09-08',
      customer_visible: true,
      url: '/docs/trailer-approval.pdf',
      superseded: false,
    },
    {
      id: 'doc-004',
      type: 'maintenance_schedule',
      title: 'Planned Maintenance Schedule — Enclosed Dual-Operator System',
      revision: 'Rev 1',
      date: '2025-09-10',
      customer_visible: true,
      url: '/docs/ppm-schedule.pdf',
      superseded: false,
    },
  ],

  handover_completed: false,
  training_completed: false,
  asset_created: false,
  qr_token: 'MXKP7RNQWZ4B',

  case_study_candidate: false,
  marketing_permission: false,

  audit_log: [
    {
      id: 'aud-001',
      action: 'Project Created from Won Quote QT-2025-089',
      performed_by: 'Pete Currey',
      performed_at: '2025-09-05T09:00:00Z',
    },
    {
      id: 'aud-002',
      action: 'Engineering Release Approved',
      performed_by: 'Lead Engineer',
      performed_at: '2025-09-08T16:00:00Z',
    },
    {
      id: 'aud-003',
      action: 'Chassis Received & Logged',
      performed_by: 'Workshop Lead',
      performed_at: '2025-09-12T11:00:00Z',
    },
  ],

  created_at: '2025-09-05T09:00:00Z',
  updated_at: '2025-09-22T14:30:00Z',
};

// ─── 04: SAMPLE DELIVERED ASSET (DELIVERED: ABP-2508-002) ───────────────────

export const SAMPLE_DELIVERED_ASSET: TrailerBuildProject = {
  id: 'bp-002',
  build_reference: 'ABP-2508-002',
  build_code: 'AKT-KXPR85-UK',
  quote_reference: 'QT-2025-044',
  accepted_revision: 1,

  accepted_configuration: {
    build_code: 'AKT-KXPR85-UK',
    format: 'enclosed',
    chassis_id: 'chassis-tandem-3500-enclosed',
    machine_id: 'machine-ded-big-boy',
    operator_count: 2,
    water_storage_id: 'tank-1000l-baffled',
    power_options: ['power-gen-5kw-diesel'],
    recovery_option_id: 'recovery-closed-loop-recycle',
    hose_storage_options: ['hose-dual-100m-manual'],
    site_options: ['site-internal-plant-lights', 'site-winterisation-purge'],
    finish_livery_id: 'finish-enclosed-full-fleet-wrap',
    pipeline_stage: 'won',
    contact: {
      name: 'David Collins',
      company: 'Midlands Fleet Services Ltd',
      email: 'd.collins@midlandsfleet.co.uk',
      phone: '07700 900123',
      postcode: 'CV1 2AA',
    },
  },

  customer_name: 'David Collins',
  customer_company: 'Midlands Fleet Services Ltd',
  customer_email: 'd.collins@midlandsfleet.co.uk',
  customer_phone: '07700 900123',
  customer_site: 'Coventry Vehicle Depot',

  project_owner: 'Pete Currey',
  engineering_owner: 'Alkota Engineering',
  production_owner: 'Alkota Production',
  status: 'delivered',

  order_confirmed_at: '2025-08-01T09:00:00Z',
  target_handover_date: '2025-08-29T00:00:00Z',
  confirmed_handover_date: '2025-08-29T00:00:00Z',
  actual_handover_date: '2025-08-29T14:00:00Z',
  target_customer_visible: true,

  stages: ALL_BUILD_STAGES.map((s, i) => ({
    ...s,
    status: 'complete' as BuildStageStatus,
    completed_at: `2025-08-${String(Math.min(29, 2 + i * 2)).padStart(2, '0')}T16:00:00Z`,
    technician: 'Production Lead',
  })),

  updates: [
    {
      id: 'upd-201',
      date: '2025-08-01',
      message: 'Your bespoke trailer build has been confirmed and placed into the production schedule.',
      is_milestone: true,
      stage_id: 'order_confirmed',
    },
    {
      id: 'upd-202',
      date: '2025-08-08',
      message: 'Chassis received and passed incoming engineering inspection.',
      is_milestone: true,
      stage_id: 'chassis_received',
    },
    {
      id: 'upd-203',
      date: '2025-08-18',
      message: 'Alkota DED-4000 machine, 10kVA generator, and closed-loop filtration module installed.',
      is_milestone: true,
      stage_id: 'equipment_installation',
    },
    {
      id: 'upd-204',
      date: '2025-08-26',
      message: 'Full system pressure and dual-operator tests completed with 100% pass mark.',
      is_milestone: true,
      stage_id: 'system_testing',
    },
    {
      id: 'upd-205',
      date: '2025-08-29',
      message: 'System handed over to Midlands Fleet Services Ltd at Coventry Depot. Handover certificate and manuals issued.',
      is_milestone: true,
      stage_id: 'delivered',
    },
  ],

  component_serials: [
    {
      id: 'cs-201',
      category: 'chassis',
      description: '3500kg Tandem Enclosed Chassis',
      make: 'Ifor Williams',
      model: 'GH1054BT-ENC',
      vin: 'SIFXX000000987654',
    },
    {
      id: 'cs-202',
      category: 'machine',
      description: 'Alkota DED-4000 Diesel',
      make: 'Alkota',
      model: 'DED-4000',
      serial_number: 'AK-DED-2025-0044',
    },
    {
      id: 'cs-203',
      category: 'engine',
      description: 'Diesel Engine',
      make: 'Hatz',
      model: '1D81Z',
      serial_number: 'HZ-25-044890',
    },
    {
      id: 'cs-204',
      category: 'pump',
      description: 'Triplex High Pressure Pump',
      make: 'CAT Pumps',
      model: '530',
      serial_number: 'CAT-530-25-00389',
    },
    {
      id: 'cs-205',
      category: 'generator',
      description: '10.0 kVA On-Board Generator',
      make: 'Mecc Alte',
      model: 'S20W-130',
      serial_number: 'MA-GEN-25-0104',
    },
    {
      id: 'cs-206',
      category: 'recovery',
      description: 'Closed-Loop Recycle System Module',
      make: 'Hydro-Recycle',
      model: 'HR-3000-VFS',
      serial_number: 'HR-VFS-2025-0021',
    },
  ],

  media: [
    {
      id: 'med-201',
      stage_id: 'delivered',
      filename: 'midlands_fleet_delivered_hero.jpg',
      url: '/images/trailers/builds/midlands-delivered-hero.jpg',
      alt_text: 'Midlands Fleet Services finished bespoke enclosed trailer system',
      caption: 'Completed rig at customer handover',
      classification: 'hero',
      uploaded_at: '2025-08-29T14:30:00Z',
      uploaded_by: 'Pete Currey',
    },
  ],

  customer_approvals: [
    {
      id: 'app-201',
      type: 'livery',
      title: 'Full Enclosure Fleet Livery Approval',
      version: 1,
      document_url: '/docs/livery-proof-midlands-v1.pdf',
      submitted_at: '2025-08-12T10:00:00Z',
      status: 'approved',
      approved_at: '2025-08-14T11:20:00Z',
      approved_by: 'David Collins',
    },
  ],

  weights: {
    estimated_dry_kg: 2450,
    estimated_wet_kg: 3400,
    verified_finished_weight_kg: 2508,
    verified_at: '2025-08-27',
    verified_by: 'Production QC Lead',
  },

  final_engineering_notes: 'Delivered in full working order. Calibrated to 200 bar @ 17 LPM total (8.5 LPM per gun). Closed-loop tested with 5-stage filtration media.',

  handover_checklist: FULL_HANDOVER_CHECKLIST.map(item => ({
    ...item,
    result: 'pass' as const,
    date: '2025-08-28',
    technician: 'Senior QA Engineer',
  })),

  handover_documents: [
    {
      id: 'doc-201',
      type: 'final_specification',
      title: 'Final As-Built Specification — ABP-2508-002',
      revision: 'Rev 1.0',
      date: '2025-08-28',
      customer_visible: true,
      url: '/docs/as-built-abp2508002.pdf',
      superseded: false,
    },
    {
      id: 'doc-202',
      type: 'machine_manual',
      title: 'Alkota DED-4000 Operator & Parts Manual',
      revision: 'Rev 3.2',
      date: '2025-08-28',
      customer_visible: true,
      url: '/docs/ded-4000-manual.pdf',
      superseded: false,
    },
    {
      id: 'doc-203',
      type: 'warranty',
      title: 'Official Alkota UK 12-Month System Warranty Pack',
      revision: 'Rev 1',
      date: '2025-08-29',
      customer_visible: true,
      url: '/docs/warranty-abp2508002.pdf',
      superseded: false,
    },
    {
      id: 'doc-204',
      type: 'trailer_docs',
      title: 'IVA / Trailer Type Approval Certificate',
      revision: 'Rev 1',
      date: '2025-08-20',
      customer_visible: true,
      url: '/docs/trailer-approval.pdf',
      superseded: false,
    },
    {
      id: 'doc-205',
      type: 'maintenance_schedule',
      title: 'Planned Preventative Maintenance Schedule',
      revision: 'Rev 1.0',
      date: '2025-08-28',
      customer_visible: true,
      url: '/docs/ppm-schedule.pdf',
      superseded: false,
    },
    {
      id: 'doc-206',
      type: 'training_record',
      title: 'Signed Operator Training Record (3 Attendees)',
      revision: 'Rev 1',
      date: '2025-08-29',
      customer_visible: true,
      url: '/docs/training-record.pdf',
      superseded: false,
    },
    {
      id: 'doc-207',
      type: 'certificate',
      title: 'Factory Commissioning & Pressure Certificate',
      revision: 'Rev 1',
      date: '2025-08-28',
      customer_visible: true,
      url: '/docs/commissioning-cert.pdf',
      superseded: false,
    },
    {
      id: 'doc-208',
      type: 'photographs',
      title: 'Handover Photographic Record',
      revision: 'Rev 1',
      date: '2025-08-29',
      customer_visible: true,
      url: '/docs/handover-photos.pdf',
      superseded: false,
    },
  ],

  handover_completed: true,
  handover_date: '2025-08-29',
  handover_customer_representative: 'David Collins',
  training_completed: true,
  training_notes: 'Full operator training completed for 3 staff. Daily checks, machine operation, dual-gun procedure, winterisation and basic maintenance.',

  asset_created: true,
  qr_token: 'BVNQ8XKRMJ2P',
  warranty_start: '2025-08-29',
  warranty_end: '2026-08-29',
  warranty_covered_equipment: [
    'Alkota DED-4000 — 12 months parts and labour',
    '3500kg Enclosed Chassis — 12 months structural',
    '10kVA Generator — 12 months manufacturer warranty',
    'Closed-Loop Recovery System — 12 months parts',
  ],

  service_schedule: [
    {
      id: 'srv-001',
      component: 'Alkota DED-4000 Pressure Washer',
      service_type: '6-Month Pump & Burner Inspection',
      interval_months: 6,
      next_due_date: '2026-02-28',
      last_completed_date: '2025-08-29',
      status: 'current',
      assigned_provider: 'Alkota UK Direct Service',
    },
    {
      id: 'srv-002',
      component: 'Mecc Alte 10kVA Generator',
      service_type: '12-Month Electrical & Engine Service',
      interval_months: 12,
      next_due_date: '2026-08-29',
      last_completed_date: '2025-08-29',
      status: 'current',
      assigned_provider: 'Alkota UK Direct Service',
    },
    {
      id: 'srv-003',
      component: 'Trailer Chassis & Running Gear',
      service_type: '3-Month Visual Brake & Hitch Inspection',
      interval_months: 3,
      next_due_date: '2025-11-29',
      last_completed_date: '2025-08-29',
      status: 'due_soon',
      assigned_provider: 'Customer In-House Maintenance / Alkota',
    },
  ],

  service_history: [],
  case_study_candidate: true,
  marketing_permission: false,

  audit_log: [
    {
      id: 'aud-201',
      action: 'Project Created from Won Quote QT-2025-044',
      performed_by: 'Pete Currey',
      performed_at: '2025-08-01T09:00:00Z',
    },
    {
      id: 'aud-202',
      action: 'System Passed All QA Checks & Weight Verified',
      performed_by: 'Senior QA Engineer',
      performed_at: '2025-08-28T16:00:00Z',
    },
    {
      id: 'aud-203',
      action: 'Handover Completed & Asset Record Generated',
      performed_by: 'Pete Currey',
      performed_at: '2025-08-29T14:00:00Z',
    },
  ],

  created_at: '2025-08-01T09:00:00Z',
  updated_at: '2025-08-29T14:30:00Z',
};

// ─── 05: HELPER FUNCTIONS ───────────────────────────────────────────────────

export function deriveBuildProjectStatus(stages: BuildStage[]): BuildProjectStatus {
  const delivered = stages.find(s => s.id === 'delivered');
  if (delivered?.status === 'complete') return 'delivered';
  const qc = stages.find(s => s.id === 'quality_check');
  if (qc?.status === 'in_progress' || qc?.status === 'complete') return 'quality_check';
  const handover = stages.find(s => s.id === 'ready_for_handover');
  if (handover?.status === 'in_progress' || handover?.status === 'complete') return 'ready_for_handover';
  const hasBlocked = stages.some(s => s.status === 'blocked');
  if (hasBlocked) return 'blocked';
  const hasInProgress = stages.some(s => s.status === 'in_progress');
  if (hasInProgress) return 'in_production';
  const orderConfirmed = stages.find(s => s.id === 'order_confirmed');
  if (orderConfirmed?.status === 'complete') return 'in_production';
  return 'order_confirmed';
}

export function deriveChecklistForConfig(
  checklist: HandoverChecklistItem[],
  config: TrailerConfiguration
): HandoverChecklistItem[] {
  const isEnclosed = config.format === 'enclosed';
  const isDual = config.operator_count === 2;
  const hasGenerator = Array.isArray(config.power_options) && config.power_options.some(p => p.includes('gen'));
  const hasRecovery = config.recovery_option_id && config.recovery_option_id !== 'none';
  const isClosedLoop = config.recovery_option_id === 'closed-loop-recycle';
  const isVfs = config.recovery_option_id === 'vfs-filtration';
  const isVacgd = config.recovery_option_id === 'vacgd-vacuum';

  return checklist.filter(item =>
    item.required_for.some(condition => {
      if (condition === 'always') return true;
      if (condition === 'enclosed') return isEnclosed;
      if (condition === 'dual_operator') return isDual;
      if (condition === 'generator') return hasGenerator;
      if (condition === 'recovery') return hasRecovery;
      if (condition === 'closed_loop') return isClosedLoop;
      if (condition === 'vfs_filtration') return isVfs;
      if (condition === 'vacgd') return isVacgd;
      return false;
    })
  );
}

export function generateQrToken(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0,O,1,I
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return token;
}
