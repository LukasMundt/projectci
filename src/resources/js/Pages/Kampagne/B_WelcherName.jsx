import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Card from "@/Components/Card";
import { Button } from "flowbite-react";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import TextInput from "@/Components/Inputs/TextInput";

export default function B_WelcherName({}) {
  const { auth, id} = usePage().props;
  console.log(usePage().props);

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      key: "name",
      name: "",
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("projectci.kampagne.SBS-SetProps", {id: id}));
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
      <Head title="Wähle einen Kampagnen-Namen" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <Card>
            <div className="mb-10 text-center">
              <h1>Bitte wähle einen Namen für deine Kampagne</h1>
            </div>
            <div></div>
            <form onSubmit={submit}>
              {/* Name */}
              <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                  className="w-full"
                  id="name"
                  value={data.name}
                  // placeholder="Musterstadt"
                  onChange={(e) => {
                    setData("name", e.target.value);
                  }}
                />
                <InputError className="mt-2" message={errors.name} />
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
