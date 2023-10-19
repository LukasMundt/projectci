import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import CreateForm from "./partials/CreateForm";

export default class Create extends React.Component {
  render() {
    const { auth, statistics } = this.props;
    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Admin-Dashboard
          </h2>
        }
      >
        <Head title="Person erstellen" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            {/* <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow sm:rounded-lg"> */}
              <CreateForm/>
            {/* </div> */}
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
