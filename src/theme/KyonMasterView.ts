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
    }
  },
};
