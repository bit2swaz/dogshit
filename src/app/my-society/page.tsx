import Link from "next/link";import Link from "next/link";import Link from "next/link";

import db from "~/data/mock-db.json";

import db from "~/data/mock-db.json";import db from "~/data/mock-db.json";

const MySocietyPage = () => {

  const society = db.elysium123;



  return (const MySocietyPage = () => {const MySocietyPage = () => {

    <main className="min-h-screen bg-slate-50 px-4 py-8">

      <div className="mx-auto max-w-7xl">  const society = db.elysium123;  const society = db.elysium123;

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-gray-900 mb-2">

            Welcome to {society.name}

          </h1>  return (  return (

          <p className="text-gray-600">Your community dashboard</p>

        </div>    <main className="min-h-screen bg-slate-50 px-4 py-8">    <main className="min-h-screen bg-slate-50 px-4 py-8">



        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">      <div className="mx-auto max-w-7xl">      <div className="mx-auto max-w-7xl">

          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900">{society.forum.length}</h3>        {/* Welcome Header */}        {/* Welcome Header */}

            <p className="text-sm text-gray-600">Forum Posts</p>

          </div>        <div className="mb-8 text-center">        <div className="mb-8 text-center">

          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900">{society.marketplace.length}</h3>          <h1 className="text-4xl font-bold text-gray-900 mb-2">          <h1 className="text-4xl font-bold text-gray-900 mb-2">

            <p className="text-sm text-gray-600">Marketplace</p>

          </div>            Welcome to {society.name}            Welcome to {society.name}

          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900">{society.gatePasses.length}</h3>          </h1>          </h1>

            <p className="text-sm text-gray-600">Gate Passes</p>

          </div>          <p className="text-gray-600">          <p className="text-gray-600">

          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900">{society.complaints.length}</h3>            Your community dashboard            Your community dashboard - {society.location}

            <p className="text-sm text-gray-600">Complaints</p>

          </div>          </p>          </p>

        </div>

        </div>        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

          <Link

            href="/forum"

            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"        {/* Summary Stats */}        {/* Summary Stats */}

          >

            <h3 className="mb-2 text-lg font-semibold text-gray-900">        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

              Recent Announcements

            </h3>          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

            <p className="mb-4 text-sm text-gray-600">

              {society.forum.length} forum posts            <h3 className="text-2xl font-bold text-gray-900">{society.forum.length}</h3>            <h3 className="text-2xl font-bold text-gray-900">{society.totalUnits}</h3>

            </p>

            <div className="space-y-2">            <p className="text-sm text-gray-600">Forum Posts</p>            <p className="text-sm text-gray-600">Total Units</p>

              {society.forum.slice(0, 2).map((post) => (

                <div          </div>          </div>

                  key={post.id}

                  className="rounded border-l-4 border-brand bg-gray-50 p-2"          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

                >

                  <p className="text-xs font-medium text-gray-900">            <h3 className="text-2xl font-bold text-gray-900">{society.marketplace.length}</h3>            <h3 className="text-2xl font-bold text-gray-900">{society.totalMembers}</h3>

                    {post.title}

                  </p>            <p className="text-sm text-gray-600">Marketplace</p>            <p className="text-sm text-gray-600">Members</p>

                  <p className="text-xs text-gray-600">by {post.author}</p>

                </div>          </div>          </div>

              ))}

            </div>          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

          </Link>

            <h3 className="text-2xl font-bold text-gray-900">{society.gatePasses.length}</h3>            <h3 className="text-2xl font-bold text-gray-900">{society.recentAnnouncements.length}</h3>

          <Link

            href="/marketplace"            <p className="text-sm text-gray-600">Gate Passes</p>            <p className="text-sm text-gray-600">Announcements</p>

            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"

          >          </div>          </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">

              New Marketplace Items          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

            </h3>

            <p className="mb-4 text-sm text-gray-600">            <h3 className="text-2xl font-bold text-gray-900">{society.complaints.length}</h3>            <h3 className="text-2xl font-bold text-gray-900">{society.marketplaceItems.length}</h3>

              {society.marketplace.length} items available

            </p>            <p className="text-sm text-gray-600">Complaints</p>            <p className="text-sm text-gray-600">Marketplace</p>

            <div className="space-y-2">

              {society.marketplace.slice(0, 2).map((item) => (          </div>          </div>

                <div

                  key={item.id}        </div>        </div>

                  className="rounded border-l-4 border-green-500 bg-gray-50 p-2"

                >

                  <p className="text-xs font-medium text-gray-900">

                    {item.item}        {/* Quick Access Cards */}        {/* Quick Access Cards */}

                  </p>

                  <p className="text-xs text-gray-600">₹{item.price}</p>        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

                </div>

              ))}          {/* Recent Announcements Card */}          {/* Recent Announcements Card */}

            </div>

          </Link>          <Link          <Link



          <Link            href="/forum"            href="/forum"

            href="/gate"

            className="group col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md md:col-span-1"            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"

          >

            <h3 className="mb-2 text-lg font-semibold text-gray-900">          >          >

              Recent Gate Activity

            </h3>            <div className="mb-4">            <div className="mb-4">

            <p className="mb-4 text-sm text-gray-600">

              {society.gatePasses.length} recent activities              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100">              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100">

            </p>

            <div className="space-y-2">                <svg                <svg

              {society.gatePasses.slice(0, 2).map((activity) => (

                <div                  className="h-6 w-6 text-brand"                  className="h-6 w-6 text-brand"

                  key={activity.id}

                  className="rounded border-l-4 border-purple-500 bg-gray-50 p-2"                  fill="none"                  fill="none"

                >

                  <p className="text-xs font-medium text-gray-900">                  stroke="currentColor"                  stroke="currentColor"

                    {activity.visitor}

                  </p>                  viewBox="0 0 24 24"                  viewBox="0 0 24 24"

                  <p className="text-xs text-gray-600">

                    {activity.type} • {activity.status}                >                >

                  </p>

                </div>                  <path                  <path

              ))}

            </div>                    strokeLinecap="round"                    strokeLinecap="round"

          </Link>

        </div>                    strokeLinejoin="round"                    strokeLinejoin="round"

      </div>

    </main>                    strokeWidth={2}                    strokeWidth={2}

  );

};                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"



export default MySocietyPage;                  />                  />

                </svg>                </svg>

              </div>              </div>

            </div>            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">            <h3 className="mb-2 text-lg font-semibold text-gray-900">

              Recent Announcements              Recent Announcements

            </h3>            </h3>

            <p className="mb-4 text-sm text-gray-600">            <p className="mb-4 text-sm text-gray-600">

              {society.forum.length} forum posts              {society.recentAnnouncements.length} new announcements

            </p>            </p>

            <div className="space-y-2">            <div className="space-y-2">

              {society.forum.slice(0, 2).map((post) => (              {society.recentAnnouncements.slice(0, 2).map((announcement) => (

                <div                <div

                  key={post.id}                  key={announcement.id}

                  className="rounded border-l-4 border-brand bg-gray-50 p-2"                  className="rounded border-l-4 border-brand bg-gray-50 p-2"

                >                >

                  <p className="text-xs font-medium text-gray-900">                  <p className="text-xs font-medium text-gray-900">

                    {post.title}                    {announcement.title}

                  </p>                  </p>

                  <p className="text-xs text-gray-600">                  <p className="text-xs text-gray-600">

                    by {post.author}                    {new Date(announcement.date).toLocaleDateString()}

                  </p>                  </p>

                </div>                </div>

              ))}              ))}

            </div>            </div>

          </Link>          </Link>



          {/* New Marketplace Items Card */}          {/* New Marketplace Items Card */}

          <Link          <Link

            href="/marketplace"            href="/marketplace"

            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"

          >          >

            <div className="mb-4">            <div className="mb-4">

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 group-hover:bg-green-100">              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 group-hover:bg-green-100">

                <svg                <svg

                  className="h-6 w-6 text-green-600"                  className="h-6 w-6 text-green-600"

                  fill="none"                  fill="none"

                  stroke="currentColor"                  stroke="currentColor"

                  viewBox="0 0 24 24"                  viewBox="0 0 24 24"

                >                >

                  <path                  <path

                    strokeLinecap="round"                    strokeLinecap="round"

                    strokeLinejoin="round"                    strokeLinejoin="round"

                    strokeWidth={2}                    strokeWidth={2}

                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"

                  />                  />

                </svg>                </svg>

              </div>              </div>

            </div>            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">            <h3 className="mb-2 text-lg font-semibold text-gray-900">

              New Marketplace Items              New Marketplace Items

            </h3>            </h3>

            <p className="mb-4 text-sm text-gray-600">            <p className="mb-4 text-sm text-gray-600">

              {society.marketplace.length} items available              {society.marketplaceItems.length} items available

            </p>            </p>

            <div className="space-y-2">            <div className="space-y-2">

              {society.marketplace.slice(0, 2).map((item) => (              {society.marketplaceItems.slice(0, 2).map((item) => (

                <div                <div

                  key={item.id}                  key={item.id}

                  className="rounded border-l-4 border-green-500 bg-gray-50 p-2"                  className="rounded border-l-4 border-green-500 bg-gray-50 p-2"

                >                >

                  <p className="text-xs font-medium text-gray-900">                  <p className="text-xs font-medium text-gray-900">

                    {item.item}                    {item.title}

                  </p>                  </p>

                  <p className="text-xs text-gray-600">₹{item.price}</p>                  <p className="text-xs text-gray-600">{item.price}</p>

                </div>                </div>

              ))}              ))}

            </div>            </div>

          </Link>          </Link>



          {/* Recent Gate Activity Card */}          {/* Recent Gate Activity Card */}

          <Link          <Link

            href="/gate"            href="/gate"

            className="group col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md md:col-span-1"            className="group col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md md:col-span-1"

          >          >

            <div className="mb-4">            <div className="mb-4">

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 group-hover:bg-purple-100">              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 group-hover:bg-purple-100">

                <svg                <svg

                  className="h-6 w-6 text-purple-600"                  className="h-6 w-6 text-purple-600"

                  fill="none"                  fill="none"

                  stroke="currentColor"                  stroke="currentColor"

                  viewBox="0 0 24 24"                  viewBox="0 0 24 24"

                >                >

                  <path                  <path

                    strokeLinecap="round"                    strokeLinecap="round"

                    strokeLinejoin="round"                    strokeLinejoin="round"

                    strokeWidth={2}                    strokeWidth={2}

                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"

                  />                  />

                </svg>                </svg>

              </div>              </div>

            </div>            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">            <h3 className="mb-2 text-lg font-semibold text-gray-900">

              Recent Gate Activity              Recent Gate Activity

            </h3>            </h3>

            <p className="mb-4 text-sm text-gray-600">            <p className="mb-4 text-sm text-gray-600">

              {society.gatePasses.length} recent activities              {society.gateActivity.length} recent activities

            </p>            </p>

            <div className="space-y-2">            <div className="space-y-2">

              {society.gatePasses.slice(0, 2).map((activity) => (              {society.gateActivity.slice(0, 2).map((activity) => (

                <div                <div

                  key={activity.id}                  key={activity.id}

                  className="rounded border-l-4 border-purple-500 bg-gray-50 p-2"                  className="rounded border-l-4 border-purple-500 bg-gray-50 p-2"

                >                >

                  <p className="text-xs font-medium text-gray-900">                  <p className="text-xs font-medium text-gray-900">

                    {activity.visitor}                    {activity.type === "visitor" 

                  </p>                      ? activity.visitor 

                  <p className="text-xs text-gray-600">                      : activity.type === "resident" 

                    {activity.type} • {activity.status}                      ? activity.resident 

                  </p>                      : activity.service}

                </div>                  </p>

              ))}                  <p className="text-xs text-gray-600">

            </div>                    {activity.unit} • {activity.status}

          </Link>                  </p>

        </div>                </div>

      </div>              ))}

    </main>            </div>

  );          </Link>

};        </div>

      </div>

export default MySocietyPage;    </main>
  );
};

export default MySocietyPage;0 px-4 py-8\">\n      <div className=\"mx-auto max-w-7xl\">\n        {/* Welcome Header */}\n        <div className=\"mb-8 text-center\">\n          <h1 className=\"text-4xl font-bold text-gray-900 mb-2\">\n            Welcome to {society.name}\n          </h1>\n          <p className=\"text-gray-600\">\n            Your community dashboard - {society.location}\n          </p>\n        </div>\n\n        {/* Summary Stats */}\n        <div className=\"mb-8 grid grid-cols-2 gap-4 md:grid-cols-4\">\n          <div className=\"rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm\">\n            <h3 className=\"text-2xl font-bold text-gray-900\">{society.totalUnits}</h3>\n            <p className=\"text-sm text-gray-600\">Total Units</p>\n          </div>\n          <div className=\"rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm\">\n            <h3 className=\"text-2xl font-bold text-gray-900\">{society.totalMembers}</h3>\n            <p className=\"text-sm text-gray-600\">Members</p>\n          </div>\n          <div className=\"rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm\">\n            <h3 className=\"text-2xl font-bold text-gray-900\">{society.recentAnnouncements.length}</h3>\n            <p className=\"text-sm text-gray-600\">Announcements</p>\n          </div>\n          <div className=\"rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm\">\n            <h3 className=\"text-2xl font-bold text-gray-900\">{society.marketplaceItems.length}</h3>\n            <p className=\"text-sm text-gray-600\">Marketplace</p>\n          </div>\n        </div>\n\n        {/* Quick Access Cards */}\n        <div className=\"grid grid-cols-2 gap-4 md:grid-cols-3\">\n          {/* Recent Announcements Card */}\n          <Link\n            href=\"/forum\"\n            className=\"group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md\"\n          >\n            <div className=\"mb-4\">\n              <div className=\"inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100\">\n                <svg\n                  className=\"h-6 w-6 text-brand\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  viewBox=\"0 0 24 24\"\n                >\n                  <path\n                    strokeLinecap=\"round\"\n                    strokeLinejoin=\"round\"\n                    strokeWidth={2}\n                    d=\"M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z\"\n                  />\n                </svg>\n              </div>\n            </div>\n            <h3 className=\"mb-2 text-lg font-semibold text-gray-900\">\n              Recent Announcements\n            </h3>\n            <p className=\"mb-4 text-sm text-gray-600\">\n              {society.recentAnnouncements.length} new announcements\n            </p>\n            <div className=\"space-y-2\">\n              {society.recentAnnouncements.slice(0, 2).map((announcement) => (\n                <div\n                  key={announcement.id}\n                  className=\"rounded border-l-4 border-brand bg-gray-50 p-2\"\n                >\n                  <p className=\"text-xs font-medium text-gray-900\">\n                    {announcement.title}\n                  </p>\n                  <p className=\"text-xs text-gray-600\">\n                    {new Date(announcement.date).toLocaleDateString()}\n                  </p>\n                </div>\n              ))}\n            </div>\n          </Link>\n\n          {/* New Marketplace Items Card */}\n          <Link\n            href=\"/marketplace\"\n            className=\"group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md\"\n          >\n            <div className=\"mb-4\">\n              <div className=\"inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 group-hover:bg-green-100\">\n                <svg\n                  className=\"h-6 w-6 text-green-600\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  viewBox=\"0 0 24 24\"\n                >\n                  <path\n                    strokeLinecap=\"round\"\n                    strokeLinejoin=\"round\"\n                    strokeWidth={2}\n                    d=\"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z\"\n                  />\n                </svg>\n              </div>\n            </div>\n            <h3 className=\"mb-2 text-lg font-semibold text-gray-900\">\n              New Marketplace Items\n            </h3>\n            <p className=\"mb-4 text-sm text-gray-600\">\n              {society.marketplaceItems.length} items available\n            </p>\n            <div className=\"space-y-2\">\n              {society.marketplaceItems.slice(0, 2).map((item) => (\n                <div\n                  key={item.id}\n                  className=\"rounded border-l-4 border-green-500 bg-gray-50 p-2\"\n                >\n                  <p className=\"text-xs font-medium text-gray-900\">\n                    {item.title}\n                  </p>\n                  <p className=\"text-xs text-gray-600\">{item.price}</p>\n                </div>\n              ))}\n            </div>\n          </Link>\n\n          {/* Recent Gate Activity Card */}\n          <Link\n            href=\"/gate\"\n            className=\"group col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md md:col-span-1\"\n          >\n            <div className=\"mb-4\">\n              <div className=\"inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 group-hover:bg-purple-100\">\n                <svg\n                  className=\"h-6 w-6 text-purple-600\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  viewBox=\"0 0 24 24\"\n                >\n                  <path\n                    strokeLinecap=\"round\"\n                    strokeLinejoin=\"round\"\n                    strokeWidth={2}\n                    d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\"\n                  />\n                </svg>\n              </div>\n            </div>\n            <h3 className=\"mb-2 text-lg font-semibold text-gray-900\">\n              Recent Gate Activity\n            </h3>\n            <p className=\"mb-4 text-sm text-gray-600\">\n              {society.gateActivity.length} recent activities\n            </p>\n            <div className=\"space-y-2\">\n              {society.gateActivity.slice(0, 2).map((activity) => (\n                <div\n                  key={activity.id}\n                  className=\"rounded border-l-4 border-purple-500 bg-gray-50 p-2\"\n                >\n                  <p className=\"text-xs font-medium text-gray-900\">\n                    {activity.type === \"visitor\" \n                      ? activity.visitor \n                      : activity.type === \"resident\" \n                      ? activity.resident \n                      : activity.service}\n                  </p>\n                  <p className=\"text-xs text-gray-600\">\n                    {activity.unit} • {activity.status}\n                  </p>\n                </div>\n              ))}\n            </div>\n          </Link>\n        </div>\n      </div>\n    </main>\n  );\n};\n\nexport default MySocietyPage;
