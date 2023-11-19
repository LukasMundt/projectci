import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import FilterForm from "./partials/FilterForm";

export default function C_Filter({}) {
  const { auth, id, stadtteile, postleitzahlen, step, strassen } =
    usePage().props;
  console.log(usePage().props);
  console.log(postleitzahlen);

  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={
      //   <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      //     Kampagnen-Typ wählen
      //   </h2>
      // }
    >
      <Head title="Passe die Kampagnen-Filter an" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <Card directClassName="pb-3">
            <div className="mb-10 text-center">
              <h1 className="text-2xl">
                Bitte wähle die Filter für deine Kampagne
              </h1>
            </div>

            <div className="">
              <FilterForm
                headline={"Stadtteil"}
                first
                active={step === "2"}
                completed={step === "2.1" || step === "2.2"}
                list={stadtteile}
              />
              <FilterForm
                filterName="plz"
                headline={"Postleitzahl"}
                active={step === "2.1"}
                completed={step === "2.2"}
                list={postleitzahlen}
              />
              <FilterForm
                filterName="strasse"
                headline={"Straße"}
                active={step === "2.2"}
                list={strassen}
                last
              />
              {/* <FilterForm headline={"Weiteres"} last active={false} /> */}
            </div>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
