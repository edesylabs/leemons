/* eslint-disable import/prefer-default-export */
import { createStyles, pxToRem } from '@bubbles-ui/components';

export const LibraryCardBodyStyles = createStyles((theme, { fullHeight }) => {
  const cardLibraryStyles = theme.other.cardLibrary;
  return {
    root: {
      padding: pxToRem(16),
      // paddingTop: pxToRem(24),
      flex: fullHeight && 1,
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginBottom: pxToRem(16),
    },

    draftBadge: {
      '& > div': {
        backgroundColor: 'transparent',
        border: '1px solid #878D96',
        borderRadius: 4,
        fontSize: 10,
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#4D5358',
        },
        '& > span': {
          marginTop: 2,
          color: '#4D5358',
        },
      },
    },
    draftText: {
      color: '#4D5358',

      fontSize: '10px',
    },
    titleContainer: {
      paddingTop: pxToRem(10),
    },
    title: {
      ...cardLibraryStyles.content.typo.lg,
      color: cardLibraryStyles.content.color.emphasis,
      paddingTop: '0px !important',
    },
    description: {
      ...cardLibraryStyles.content.typo.md,
      lineHeight: '20px',
      color: cardLibraryStyles.content.color.default,
      paddingTop: pxToRem(4),
    },
    subjectsContainer: {
      marginTop: pxToRem(8),
      display: 'flex',
      alignContent: 'flex-start',
    },
    subjectIcon: {
      marginRight: pxToRem(4),
    },
    subject: {
      paddingTop: pxToRem(8),
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 5,
    },
    subjectName: {
      paddingTop: pxToRem(8),
      ...cardLibraryStyles.content.typo.md,
      lineHeight: '20px',
      color: cardLibraryStyles.content.color.subje,
    },
    programName: {
      ...cardLibraryStyles.content.typo.md,
      lineHeight: '20px',
      color: cardLibraryStyles.content.color.muted,
    },
  };
});
