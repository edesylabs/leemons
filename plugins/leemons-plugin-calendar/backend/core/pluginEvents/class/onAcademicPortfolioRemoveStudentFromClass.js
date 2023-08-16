const {
  unGrantAccessUserAgentToCalendar,
} = require('../../calendar/unGrantAccessUserAgentToCalendar');

async function remove({ classId, student, ctx }) {
  await unGrantAccessUserAgentToCalendar({
    key: ctx.prefixPN(`class.${classId}`),
    userAgentId: student,
    actionName: 'view',
    ctx,
  });
}

function onAcademicPortfolioRemoveStudentFromClass({
  // data // unused old param
  classId,
  studentId,
  ctx,
}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      await remove({ classId, student: studentId, ctx });
      resolve();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}

module.exports = { onAcademicPortfolioRemoveStudentFromClass };
