import { LayoutHome } from "../components/layout-home/layout-home";
import { useSession } from "next-auth/react";
import CardPoint from "../components/card-point/card-point";
import { useEffect, useState } from "react";
import {GetMissionByUserId, GetUserBy} from "../swr/service";
export default function Dashboard() {


  const { data: session, status } = useSession();
  console.log(session);

  const { data : userData, error : userError } = GetUserBy(session.user.id)
    if (userError) return <h1>Something went wrong!</h1>
    if (!userData) return <h1>Loading...</h1>

  return (
    <div>
      <h1>
        Bienvenue {userData.firstName} {userData.lastName}
      </h1>
      <CardPoint
        title={"Total des points"}
        points={userData.kins + " Kin's"}
        type={'kins'}
      ></CardPoint>
      <CardPoint
        title={"Total des points bonus"}
        points={userData.pointsBonus + " bonus"}
        type={'bonus'}
      ></CardPoint>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};

Dashboard.auth = true;
