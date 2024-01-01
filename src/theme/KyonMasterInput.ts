import type {IKyonMasterInputStyle} from '../interfaces';

export const KyonMasterInput: IKyonMasterInputStyle = {
  defaultProps: {
    label: {
      defaultProps: {
        text: {
          backgroundColor: 'transparent',
        },
        wrapper: {
          padding: 0,
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
        },
      },
    },
    input: {},
    wrapper: {
      padding: 15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  variants: {
    sideLabel: {
      label: {
        defaultProps: {
          wrapper: {
            width: '50%',
          },
        },
      },
      input: {
        width: '50%',
      },
      wrapper: {},
    },
    fitWidth: {
      input: {},
      wrapper: {
        alignSelf: 'center',
        width: '40%',
        justifyContent: 'center',
      },
    },
  },
};
