import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CreatableSelect from "react-select/creatable";
import ReactSelect from "@/Components/Inputs/ReactSelect";
import { Card, FileInput, Select } from "flowbite-react";
import { MapPinIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

export default function EditForm({ status, className = "" }) {
  const { user, person } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      anrede: person.anrede,
      vorname: "",
      nachname: "",
      telefonnummer: "",
      email: "",
      strasse: "",
      hausnummer: "",
      plz: "",
      stadt: "",
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("projectci.person.store"));
  };

  return (
    <section className={className}>
      <form onSubmit={submit} className="mt-6 space-y-14">
        {/* Name */}
        <div className="space-y-4">
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-emerald-400 p-4">
              <UserIcon className="w-7" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow sm:rounded-lg">
            {/* Anrede */}
            <div className="w-full col-span-1 md:col-span-2">
              <InputLabel htmlFor="anrede" value="Anrede" />

              <Select
                id="anrede"
                className="w-full"
                onChange={(e) => {
                  setData("anrede", e.target.value);
                }}
              >
                <option value="">keine Anrede</option>
                <option value="Frau">Frau</option>
                <option value="Herr">Herr</option>
              </Select>

              <InputError className="mt-2" message={errors.anrede} />
            </div>
            {/* Vorname */}
            <div className="w-full">
              <InputLabel htmlFor="vorname" value="Vorname" />

              <TextInput
                id="vorname"
                className="w-full"
                onChange={(e) => {
                  setData("vorname", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.vorname} />
            </div>
            {/* Nachname */}
            <div className="w-full">
              <InputLabel htmlFor="nachname" value="Nachname" />

              <TextInput
                id="nachname"
                className="w-full"
                onChange={(e) => {
                  setData("nachname", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.nachname} />
            </div>
          </div>
        </div>
        {/* Kontakt */}
        <div className="space-y-4">
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-emerald-400 p-4">
              <PhoneIcon className="w-7" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow sm:rounded-lg">
            {/* Telefonnummer */}
            <div className="w-full">
              <InputLabel htmlFor="telefonnummer" value="Telefonnummer" />

              <TextInput
                id="telefonnummer"
                className="w-full"
                onChange={(e) => {
                  setData("telefonnummer", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.telefonnummer} />
            </div>
            {/* email */}
            <div className="w-full">
              <InputLabel htmlFor="email" value="E-Mail" />

              <TextInput
                // icon={EnvelopeIcon}
                id="email"
                className="w-full"
                onChange={(e) => {
                  setData("email", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.email} />
            </div>
          </div>
        </div>
        {/* Adresse */}
        <div className="space-y-4">
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-emerald-400 p-4">
              <MapPinIcon className="w-7" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow sm:rounded-lg">
            {/* Strasse */}
            <div className="w-full col-span-1 md:col-span-3 lg:col-span-5">
              <InputLabel htmlFor="strasse" value="Straße" />

              <TextInput
                id="strasse"
                className="w-full"
                onChange={(e) => {
                  setData("strasse", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.strasse} />
            </div>
            {/* hausnummer */}
            <div className="w-full col-span-1">
              <InputLabel htmlFor="hausnummer" value="Hausnummer" />

              <TextInput
                id="hausnummer"
                className="w-full"
                onChange={(e) => {
                  setData("hausnummer", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.hausnummer} />
            </div>
            {/* plz */}
            <div className="w-full col-span-1 md:col-span-2 lg:col-span-3">
              <InputLabel htmlFor="plz" value="Postleitzahl" />

              <TextInput
                id="plz"
                className="w-full"
                onChange={(e) => {
                  setData("plz", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.plz} />
            </div>
            {/* stadt */}
            <div className="w-full col-span-1 md:col-span-2 lg:col-span-3">
              <InputLabel htmlFor="stadt" value="Stadt" />

              <TextInput
                id="stadt"
                className="w-full"
                value="Hamburg"
                onChange={(e) => {
                  setData("stadt", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.stadt} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
