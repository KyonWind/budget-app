import { ReactNode } from "react";

export interface IKyonMasterModal {
  options?: ReactNode[];
  footerOptions?: ReactNode[];
  headerTitle?: string;
  open: boolean;
  close: () => void
  onClose?: () => void;
}
