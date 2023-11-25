import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Card from "@/Components/Card";
import { Accordion, Badge, Button } from "flowbite-react";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLink from "@/Components/PrimaryLink";

export default class Index extends React.Component {
  render() {
    const { auth, statistics, kampagne, projekte, vorlagePfad } = this.props;
    console.log(this.props);
    // const filter =

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <h2 className="self-center font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              {"Kampagne: " + kampagne.bezeichnung}
            </h2>
            <div className="col-span-1 lg:col-span-2 flex justify-end space-x-3">
              {kampagne.status == 0?<PrimaryLink
                  className="place-content-center flex-grow lg:flex-none"
                  // href={route("projectci.kampagne.download", {
                  //   kampagne: kampagne.id,
                  // })}
                  target="_blank"
                >
                  <EyeIcon className="w-5 mr-2" />
                  Vorschau
                </PrimaryLink>:""}
              {kampagne.status == 0 ? (
                <PrimaryLinkButton
                  method="post"
                  as="button"
                  href={route("projectci.kampagne.abschliessen", {
                    kampagne: kampagne.id,
                  })}
                >
                  Abschließen
                </PrimaryLinkButton>
              ) : (
                <PrimaryLink
                  className="place-content-center flex-grow lg:flex-none"
                  href={route("projectci.kampagne.download", {
                    kampagne: kampagne.id,
                  })}
                >
                  <ArrowDownTrayIcon className="w-5 mr-2" />
                  Download
                </PrimaryLink>
              )}
            </div>
          </div>
        }
      >
        <Head title="Kampagne" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Card directClassName="space-y-6">
              <div className="flex justify-end">
                <div className="flex space-x-3">
                  <Badge
                    size={"md"}
                    color={kampagne.status == 0 ? "gray" : "success"}
                    className="rounded"
                  >
                    {kampagne.status == 0 ? "Entwurf" : "Abgeschlossen"}
                  </Badge>
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <div>
                  <Accordion collapseAll>
                    <Accordion.Panel>
                      <Accordion.Title>Filter</Accordion.Title>
                      <Accordion.Content>
                        <ul className="list-disc ml-2">
                          {Object.values(kampagne.filter).map(
                            (value, index) => {
                              const filtername = Object.keys(kampagne.filter)[
                                index
                              ];
                              return (
                                <li key={filtername}>
                                  {filtername}
                                  <ul className="list-disc ml-4">
                                    {value.map((singleItem) => (
                                      <li key={singleItem}>{singleItem}</li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                      <Accordion.Title>Projekte</Accordion.Title>
                      <Accordion.Content>
                        Projekte: {projekte}
                      </Accordion.Content>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="w-full">
                  <h3 className="text-xl mb-2">Vorlage</h3>
                  <iframe className="w-full h-screen" src={vorlagePfad}></iframe>
                </div>
              </div>

              <br></br>
            </Card>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
