import React from "react";
import AgencyList from "../../components/Agencylist";
import Header from "../../components/Header/index";
const agencylist = [
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
  {
    name: "땡땡 업체",
    forSale: 12,
    saleComplete: 2,
  },
];

function authAgency(props) {
  return (
    <div>
      <Header children="인증업체 리스트" />
      <AgencyList list={agencylist}></AgencyList>
    </div>
  );
}

export default authAgency;
