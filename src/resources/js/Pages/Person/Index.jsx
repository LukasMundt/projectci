import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "flowbite-react";
import Pagination from "@/Components/Pagination";

export default class Index extends React.Component {
  render() {
    const { auth, personen } = this.props;
    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Übersicht
          </h2>
        }
      >
        <Head title="Übersicht" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <Table.Head>
                <Table.HeadCell>Bezeichnung</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {personen.data.map((person) => (
                  <Table.Row key={person.id}>
                    <Table.Cell>
                      <a
                        href={route("projectci.person.show", {
                          person: person.id,
                        })}
                      >
                        {person.name}
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              last_page={personen.last_page}
              current_page={personen.current_page}
            />
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
