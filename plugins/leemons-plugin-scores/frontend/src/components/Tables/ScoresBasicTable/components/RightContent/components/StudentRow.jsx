import { Box, createStyles } from '@bubbles-ui/components';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';

import { ScoreCell } from '../../../ScoreCell';

import { StudentScore } from './StudentScore';

const useStudentRowStyles = createStyles((theme) => ({
  root: {
    borderBottom: `1px solid #F2F2F2`,
    height: 47,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

export function StudentRow({
  id,
  customScore,
  customScoreRetake,
  allowCustomChange,
  grades,
  avgScore,
  retakes,
  onDataChange,
  usePercentage,
  viewOnly,
  retakeScores,
  hideCustom,
  labels,
}) {
  const { classes } = useStudentRowStyles();

  const onlyShowRetakes = retakes?.length === 1;

  const retake = isNil(customScoreRetake)
    ? null
    : retakes?.find((r) => r.id === customScoreRetake || r.index === Number(customScoreRetake));

  return (
    <Box className={classes.root}>
      <StudentScore>{avgScore}</StudentScore>
      {retakes?.map((retake) => {
        const retakeScore = retakeScores?.find((rs) => rs.retakeId === retake.id);
        return (
          <StudentScore key={retake.id}>
            <ScoreCell
              value={isNaN(retakeScore?.grade) ? '-' : retakeScore?.grade}
              allowChange={allowCustomChange && !viewOnly}
              grades={grades}
              usePercentage={usePercentage}
              row={id}
              column={`retake-${retake.id}`}
              onDataChange={onDataChange}
              isCustom={true}
            />
          </StudentScore>
        );
      })}
      {!onlyShowRetakes && !hideCustom && (
        <StudentScore big>
          <ScoreCell
            value={isNaN(customScore) ? 8 : customScore}
            allowChange={allowCustomChange && !viewOnly}
            grades={grades}
            usePercentage={usePercentage}
            row={id}
            column={'customScore'}
            onDataChange={onDataChange}
            isCustom={true}
            retake={retake ? retake.index : null}
            labels={labels}
          />
        </StudentScore>
      )}
    </Box>
  );
}

StudentRow.propTypes = {
  id: PropTypes.string,
  activities: PropTypes.array,
  customScore: PropTypes.number,
  customScoreRetake: PropTypes.string,
  allowCustomChange: PropTypes.bool,
  grades: PropTypes.array,
  avgScore: PropTypes.number,
  retakes: PropTypes.array,
  onDataChange: PropTypes.func,
  usePercentage: PropTypes.bool,
  viewOnly: PropTypes.bool,
  retakeScores: PropTypes.array,
  hideCustom: PropTypes.bool,
  labels: PropTypes.object,
};
