import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Card from "@/Components/Card";
import Show_Attribute from "./partials/Show_Attribute";

export default class Show extends React.Component {
  render() {
    const { auth, person, personStr, personenAuchInGruppe} = this.props;
    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {"Ansicht: " + personStr}
          </h2>
        }
      >
        <Head title={"Ansicht: " + personStr} />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Card directClassName="grid grid-cols-2">
              <Show_Attribute person={person} attribute="Titel" />
              <Show_Attribute person={person} attribute="Anrede" />
              <Show_Attribute person={person} attribute="Vorname" />
              <Show_Attribute person={person} attribute="Nachname" />
            </Card>
            <Card>
              Kontakt
            </Card>
            <Card>
              Andere Personen in Gruppe<br/>
              {personenAuchInGruppe.length}
            </Card>
            <Card>
              Projekte
            </Card>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
