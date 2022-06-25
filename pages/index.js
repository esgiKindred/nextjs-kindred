import { LayoutHome } from "../components/layout-home/layout-home";
import { Button, Form } from "react-bulma-components";
import { useSession } from "next-auth/react";
import CardPoint from "../components/card-point/card-point";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [userInformation, setUserInformation] = useState({
    kins: "-",
    pointsBonus: "-",
    lastName: "-",
    firstName: "-",
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/" + "users/" + session.user.id,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const newData = await response.json();
      setUserInformation(newData);
    };

    fetchData();
  }, [session.user.id]);

  console.log(session);

  return (
    <div>
      <h1>
        Bienvenue {userInformation.firstName} {userInformation.lastName}
      </h1>
      <CardPoint
        title={"Total des points bonus"}
        points={userInformation.kins + " points"}
      ></CardPoint>
      <CardPoint
        title={"Total des points"}
        points={userInformation.pointsBonus + " Kin's"}
      ></CardPoint>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};

Dashboard.auth = true;
