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
    cardText: {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
      }
    },
    mainTitle: {
      wrapper: {
        display: 'flex',
        justifyContent:'flex-start',
        width: '100%',
        padding: 10
      },
      text: {
        fontWeight:'bold',
        fontSize: 20
      },
    },
    h1: {
      wrapper: {
        display: 'flex',
        justifyContent:'flex-start',
        padding: 10
      },
      text: {
        fontWeight:'bold',
        fontSize: 20
      },
    }
  },
};
