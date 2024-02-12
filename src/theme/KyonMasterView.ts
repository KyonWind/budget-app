import { IKyonMasterViewStyle } from "../interfaces/IKyonMasterViewStyle.ts";

export const KyonMasterView: IKyonMasterViewStyle = {
  defaultProps: {
    view: {},
  },
  variants: {
    background: {
      view: {
        padding: 15,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignContent: 'center'
      }
    },
    card: {
      view: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 10
        },
        paddingLeft: 10,
        backgroundColor: '#ffffff',
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 10,
        borderRadius: 15,
        width: '90%',
        minHeight: 80,
      }
    },
    container: {
     view: {
       padding: 0,
       margin: 0,
     }
     },
    'container-row': {
      view: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width:'100%',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
      }
    }
  },
};
