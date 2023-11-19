import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
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

// export default class WelcherTyp extends React.Component {
//   render() {
//     const { auth, statistics } = this.props;
//     console.log(this.props);
//     return (

//     );
//   }
// }

export default function A_WelcherTyp({}) {
  const { auth } = usePage().props;

  // const { data, setData, post, errors, processing, recentlySuccessful } =
  // useForm({
  //   key: ,
  //   titel: person.titel ?? "",
  // });

  // const submit = (e) => {
  //   e.preventDefault();
  //   console.log(data);

  //   post(route("projectci.person.update", { person: personId }));
  // };

  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={
      //   <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      //     Kampagnen-Typ wählen
      //   </h2>
      // }
    >
      <Head title="Wähle einen Kampagnen-Typ" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <Card>
            <div className="mb-10 text-center">
              <h1>Bitte wähle einen Typ für deine Kampagne</h1>
            </div>
            <div>
              
            </div>
            <div className="flex justify-center">
              <PrimaryLinkButton
                as="button"
                type="button"
                method="post"
                data={{ key: "typ", typ: "serienbrief" }}
                href={route("projectci.kampagne.SBS-SetProps")}
              >
                Serienbrief
              </PrimaryLinkButton>
            </div>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
