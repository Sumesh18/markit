import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const data = [
  {
    "date": "Page A",
    "clicks": 4000,
  },
  {
    "date": "Page B",
    "clicks": 3000,
  },
  {
    "date": "Page C",
    "clicks": 2000,
  },
  {
    "date": "Page D",
    "clicks": 2780,
  },
  {
    "date": "Page E",
    "clicks": 1890,
  },
  {
    "date": "Page F",
    "clicks": 2390,
  },
  {
    "date": "Page G",
    "clicks": 3490,
  }
];

export default async function AnalyticsPage() {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const page = await Page.findOne({ owner: session.user.email }) || {};

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: 'view',
        uri: page.uri || ''
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        },
        count: {
          $count: {},
        }
      }
    },
    {
      $sort: { _id: 1 }
    }

  ]);

  const clicks = await Event.find({
    page: page.uri,
    type: 'click'
  }) || [];


  return (
    <div>
      <SectionBox>
        <h2 className="text-xl font-bold mb-2 text-center">Views</h2>
        <div className="text-center">
          {page.links.length && (<p className="text-gray-500">Views of your page</p>)}
        </div>
        {groupedViews.length > 0 ? (
          <Chart data={groupedViews.map(o => (
            {
              date: o._id,
              clicks: o.count
            }
          ))} />
        ) : (
          <p className="text-gray-500 text-center">No views data available yet</p>
        )}
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl font-bold mb-4 text-center">Clicks</h2>
        {!page.links.length && (
          <div className="text-center">
            {page.links.length && (<p className="text-gray-500">No clicks on links yet</p>)}
          </div>
        )}
        {page.links?.length ? (
          page.links.map((link, key) => (
            <div key={link.title} className="md:flex gap-4 items-center border-t border-gray-300 py-4">
              <div className="text-blue-500 pl-4">
                <FontAwesomeIcon icon={faLink} />
              </div>
              <div className="grow">
                <h3>{link.title || 'no title'}</h3>
                <p className="text-md text-gray-500">{link.subtitle || 'no subtitle'}</p>
                <div className="overflow-hidden">
                  <a target="_blank" href="link.url" className="text-sm text-blue-500">{link.url}</a>
                </div>
              </div>
              <div className="text-center">
                <div className="border rounded-md p-2 mt-1 md:mt-0">
                  <div className="text-3xl">
                    {clicks.filter(c => c.uri === link.url && isToday(c.createdAt)).length}
                    <div className="text-gray-500 text-sm uppercase font-bold">Clicks today</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="border rounded-md p-2 mt-1 md:mt-0">
                  <div className="text-3xl">
                    {clicks.filter(c => c.uri === link.url).length}
                    <div className="text-gray-500 text-sm uppercase font-bold">Total clicks</div>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
          <p className="text-center text-gray-500">No links yet</p>
        )}
      </SectionBox>
    </div>
  )
}
