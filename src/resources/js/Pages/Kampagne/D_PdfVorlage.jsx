import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Card from "@/Components/Card";
import { Button, FileInput } from "flowbite-react";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import TextInput from "@/Components/Inputs/TextInput";
import FilterForm from "./partials/FilterForm";

export default function D_PdfVorlage({}) {
  const { auth, id, stadtteile, postleitzahlen, step, strassen } =
    usePage().props;
  console.log(usePage().props);

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      key: "vorlage",
      vorlage: null,
      bezeichnung: ""
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("projectci.kampagne.SBS-SetProps", { id: id, step: step }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={
      //   <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      //     Kampagnen-Typ wählen
      //   </h2>
      // }
    >
      <Head title="Lade eine PDF-Vorlage hoch" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <Card directClassName="pb-3">
            <div className="mb-10 text-center">
              <h1 className="text-2xl">
                Bitte lade ein PDF-Dokument als Vorlage für deine Kampagne hoch
              </h1>
            </div>
            <div></div>
            <form onSubmit={submit}>
              {/* Upload */}
              <div className="space-y-6">
                <div>
                  <InputLabel htmlFor="vorlage" value="Vorlage" />
                  <FileInput
                    className="w-full"
                    required
                    id="vorlage"
                    // placeholder="Musterstadt"
                    onChange={(e) => {
                      setData("vorlage", e.target.files[0]);
                    }}
                  />
                  <InputError className="mt-2" message={errors.vorlage} />
                </div>
                <div>
                  <InputLabel htmlFor="bezeichnung" value="Bezeichnung" />
                  <TextInput
                    className="w-full"
                    required
                    value={data.bezeichnung}
                    id="bezeichnung"
                    // placeholder="Musterstadt"
                    onChange={(e) => {
                      setData("bezeichnung", e.target.value);
                    }}
                  />
                  <InputError className="mt-2" message={errors.bezeichnung} />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <PrimaryButton disabled={processing}>Weiter</PrimaryButton>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
