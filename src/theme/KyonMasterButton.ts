import { IKyonMasterButtonStyle } from "../interfaces/IKyonMasterButtonStyle.ts";

export const KyonMasterButton: IKyonMasterButtonStyle = {
  defaultProps: {
    wrapper: {
      padding: 0,
      display: 'flex',
      width: '100%',
      height: 40,
      backgroundColor: '#63C6F4',
      borderRadius: 10,
      marginBottom: 15,
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
      fontSize: 13,
      color: '#ffffff'
    }
  },
  variants: {
    close: {
      wrapper: {
        backgroundColor: '#ee2e2e'
      }
    },
    floatingButton: {
      wrapper: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 50,
        backgroundColor: '#63C6F4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 25
      }
    }
  },
};
