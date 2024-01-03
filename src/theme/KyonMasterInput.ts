import type {IKyonMasterInputStyle} from '../interfaces';

export const KyonMasterInput: IKyonMasterInputStyle = {
  defaultProps: {
    label: {
      defaultProps: {
        text: {
          color: '#121313',
        },
        wrapper: {
          height: 25,
          display: 'flex',
          padding: 0,
        },
      },
    },
    input: {
      borderWidth: 2,
      borderColor: '#63C6F4',
      color: '#121313',
    },
    basicInputConfigs: {
      placeholderTextColor: '#c0c0c0',
    },
    wrapper: {
      display: 'flex',
      alignContent: 'space-around',
      marginBottom: 10,
    },
  },
  variants: {},
};
