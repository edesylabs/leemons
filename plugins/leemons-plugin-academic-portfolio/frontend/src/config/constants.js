const PLUGIN_NAME = 'academic-portfolio';

const PROGRAM_STAFF_ROLES = {
  PROGRAM_DIRECTOR: 'program-director',
  PROGRAM_COORDINATOR: 'program-coordinator',
  LEAD_INSTRUCTOR: 'lead-instructor',
  ACADEMIC_ADVISOR: 'academic-advisor',
  EXTERNAL_EVALUATOR: 'external-evaluator',
};

const SOCKET_EVENTS = {
  CLASS_UPDATE: `${PLUGIN_NAME}:class-update`,
  ENROLLMENT_UPDATE: `${PLUGIN_NAME}:enrollment-update`,
};

export { PLUGIN_NAME, PROGRAM_STAFF_ROLES, SOCKET_EVENTS };
