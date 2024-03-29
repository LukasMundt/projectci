import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChatBubbleLeftRightIcon, HomeModernIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Card from "@/Components/Card";

export default class Index extends React.Component {
  render() {
    const { auth, statistics } = this.props;
    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Kampagnen
          </h2>
        }
      >
        <Head title="Kampagnen" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Card>
                Hier werden die Kampagnen aufgelistet.
            </Card>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
