import { KyonMasterInput } from "@kyon/components";
import { GaliciaIcon } from "../assets/images";
import {Dispatch, SetStateAction} from "react";

interface ISearchFilters {
  searchText: Dispatch<SetStateAction<any>>
}

export const SearchFilters = ({searchText}: ISearchFilters) => {

  return (
    <KyonMasterInput rightIcon={GaliciaIcon} onChangeText={(v) =>
        searchText((prev:ISearchFilters) =>
        ({...prev, description: v }))}
                     type={'select'}
                     label={''} />
  )
}
