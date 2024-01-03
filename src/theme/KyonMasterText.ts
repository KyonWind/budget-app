import type {IKyonMasterTextStyle} from '../interfaces';

export const KyonMasterText: IKyonMasterTextStyle = {
  defaultProps: {
    text: {
      color: '#63C6F4',
    },
    wrapper: {
      padding: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  variants: {
    fullWidth: {
      text: {
        color: 'blue',
      },
      wrapper: {},
    },
    fitWidth: {
      text: {
        color: 'yellow',
      },
      wrapper: {
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'flex-start',
      },
    },
  },
};
