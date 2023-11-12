import Card from "@/Components/Card";
import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import ReactCreatableSelect from "@/Components/Inputs/ReactCreatableSelect";
import ReactSelect from "@/Components/Inputs/ReactSelect";
import TextInput from "@/Components/Inputs/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Select } from "flowbite-react";
import { useState } from "react";

export default function CreateForm({ className = "" }) {
  const [showAdditionalNameInfos, setShowAdditionalNameInfos] = useState(false);
  const { person } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      anrede: "",
      titel: "",
      vorname: "",
      nachname: "",
      email: "",
      strasse: "",
      hausnummer: "",
      plz: "",
      stadt: "",
      telefonnummern: [],
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("projectci.person.store"));
  };
  return (
    <section className={className}>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <Card directClassName="grid grid-cols-1 gap-3">
          {/* Vor- und Nachname */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Vorname */}
            <div>
              <InputLabel htmlFor="vorname" value="Vorname" />
              <TextInput
                className="w-full"
                id="vorname"
                value={data.vorname}
                onChange={(e) => {
                  setData("vorname", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.vorname} />
            </div>
            {/* Nachname */}
            <div>
              <InputLabel htmlFor="nachname" value="Nachname" />
              <TextInput
                className="w-full"
                id="nachname"
                value={data.nachname}
                onChange={(e) => {
                  setData("nachname", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.nachname} />
            </div>
          </div>

          <div
            className="flex gap-2 cursor-pointer"
            onClick={(e) =>
              setShowAdditionalNameInfos(!showAdditionalNameInfos)
            }
          >
            {showAdditionalNameInfos ? (
              <ArrowDownIcon className="w-5" />
            ) : (
              <ArrowRightIcon className="w-5" />
            )}{" "}
            Anrede und Titel anzeigen
          </div>

          {/* Anrede und Titel */}
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 gap-3 " +
              (!showAdditionalNameInfos ? "hidden" : "")
            }
          >
            {/* Anrede */}
            <div>
              <InputLabel htmlFor="anrede" value="Anrede" />
              <Select
                id="anrede"
                value={data.anrede}
                onChange={(e) => {
                  setData("anrede", e.target.value);
                }}
              >
                <option value="Familie">Familie</option>
                <option value="Frau">Frau</option>
                <option value="Herr">Herr</option>
                <option value="">keine Anrede</option>
              </Select>
              <InputError className="mt-2" message={errors.anrede} />
            </div>
            {/* Titel */}
            <div>
              <InputLabel htmlFor="titel" value="Titel" />
              <TextInput
                className="w-full"
                id="titel"
                value={data.titel}
                onChange={(e) => {
                  setData("titel", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.titel} />
            </div>
          </div>
        </Card>
        {/* Kontakt */}
        <Card directClassName="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* email */}
            <div>
              <InputLabel htmlFor="email" value="E-Mail" />
              <TextInput
                className="w-full"
                id="email"
                value={data.email}
                placeholder="max@example.com"
                onChange={(e) => {
                  setData("email", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.email} />
            </div>
            {/* Telefonnummer */}
            <div>
              <InputLabel htmlFor="telefonnummern" value="Telefonnummern" />
              <ReactCreatableSelect
                id="telefonnummern"
                // options={personen}
                isMulti
                isSearchable
                isClearable
                onChange={(choice) => setData("telefonnummern", choice)}
              />
              <InputError className="mt-2" message={errors.telefonnummern} />
            </div>
          </div>
        </Card>

        <Card directClassName="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* strasse */}
            <div>
              <InputLabel htmlFor="strasse" value="Straße" />
              <TextInput
                className="w-full"
                id="strasse"
                value={data.strasse}
                placeholder="Musterstraße"
                onChange={(e) => {
                  setData("strasse", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.strasse} />
            </div>
            {/* hausnummer */}
            <div>
              <InputLabel htmlFor="hausnummer" value="Hausnummer" />
              <TextInput
                className="w-full"
                id="hausnummer"
                value={data.hausnummer}
                placeholder="1a"
                onChange={(e) => {
                  setData("hausnummer", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.hausnummer} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* plz */}
            <div>
              <InputLabel htmlFor="plz" value="Postleitzahl" />
              <TextInput
                className="w-full"
                id="plz"
                value={data.plz}
                placeholder="12345"
                onChange={(e) => {
                  setData("plz", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.plz} />
            </div>
            {/* stadt */}
            <div>
              <InputLabel htmlFor="stadt" value="Stadt" />
              <TextInput
                className="w-full"
                id="stadt"
                value={data.stadt}
                placeholder="Musterstadt"
                onChange={(e) => {
                  setData("stadt", e.target.value);
                }}
              />
              <InputError className="mt-2" message={errors.stadt} />
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Weiter</PrimaryButton>

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
