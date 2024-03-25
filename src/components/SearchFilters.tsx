import { KyonMasterInput } from "../KyonToolBox/components";
import { GaliciaIcon } from "../assets/images";


export const SearchFilters = () => {
  return (
    <KyonMasterInput rightIcon={GaliciaIcon} onChangeText={()=> {}} type={'select'} label={''} />
  )
}
