import React, {useEffect} from 'react';
import useSWR from "swr";
import {defaultFetcher} from "@/lib/axios";
import Loading from "@/components/ui/Loading";
import select from "@/components/ui/Select";
import InputGroup from "@/components/ui/InputGroup";

const SelectBranch = ({selectedBranchId, setSelectedBranchId, errors, name = 'branch_id'}) => {
  const {data, isLoading, error} = useSWR('/branches', defaultFetcher)

  if (isLoading) {
    return <Loading className="h-24 gap-0" />
  }

  if (error) {
    return <div>Ошибка загрузки филиалов: { error }</div>
  }

  return (
    <InputGroup label="Филиал, где получать посылку в городе" id="branch" errors={errors}>
      <select required name={name} onChange={(e) => {
        setSelectedBranchId(e.target.value)
      }} className="outline-none mt-1 max-h-60 overflow-auto rounded-md bg-white border-1 border-primary-8 text-md p-2">
        <option value="0" disabled selected>Выберите пункт выдачи</option>
        {data.map((branch) => (
          <option key={branch.id} value={branch.id}>{branch.city.key} - {branch.address.street}</option>
        ))}
      </select>
    </InputGroup>
  );
}

export default SelectBranch;
