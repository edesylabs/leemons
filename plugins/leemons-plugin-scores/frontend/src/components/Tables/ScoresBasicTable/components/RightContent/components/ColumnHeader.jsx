import { Box, createStyles, Text } from '@bubbles-ui/components';
import PropTypes from 'prop-types';

const useColumnHeaderStyles = createStyles((theme, { big }) => {
  const globalTheme = theme.other.global;

  return {
    root: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: globalTheme.spacing.padding['2xsm'],
      paddingTop: globalTheme.spacing.padding.md,
      paddingBottom: globalTheme.spacing.padding.md,
      overflow: 'hidden',
      whiteSpace: 'normal',
      overflowWrap: 'break-word',
      flex: 1,
      width: big ? 120 : 75,
      minWidth: big ? 120 : 75,
    },
  };
});

export default function ColumnHeader({ label, big }) {
  const { classes } = useColumnHeaderStyles({ big }, { name: 'ScoresBasicTableColumnHeader' });

  return (
    <Box className={classes.root}>
      <Text color="primary" role="productive" stronger transform="uppercase" size="xs">
        {label}
      </Text>
    </Box>
  );
}

ColumnHeader.propTypes = {
  label: PropTypes.string.isRequired,
  big: PropTypes.bool,
};
