import {
  createStyles,
  getFontExpressive,
  pxToRem,
  getBoxShadowFromToken,
} from '@bubbles-ui/components';

const LibraryCardCCStyles = createStyles((theme) => {
  const cardTheme = theme.other.cardLibrary;
  const cardShadow = getBoxShadowFromToken(cardTheme.shadow.hover);
  return {
    root: {
      ...getFontExpressive(theme.fontSizes['2']),
      border: `1px solid ${cardTheme.border.color.subtle}`,
      borderRadius: cardTheme.border.radius.sm,
      backgroundColor: cardTheme.background.color.default,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      minWidth: pxToRem(264),
      maxWidth: pxToRem(283),
      minHeight: pxToRem(396),
      '&:hover': {
        boxShadow: cardShadow.boxShadow,
      },
    },
  };
});

export { LibraryCardCCStyles };
