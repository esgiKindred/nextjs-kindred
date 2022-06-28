import enfant from "../../assets/images/enfant1.png";
import parent from "../../assets/images/parent1.png";

import Image from "next/image";
import { GetFromUri} from "../../swr/service";

export default function CardUser({ user}) {

  const { data: userData, error: userError } = GetFromUri(user);

    if (userError) return <h1>Something went wrong!</h1>;
    if (!userData) return <h1>Loading...</h1>;
  return (
      <div>
          <Image src={userData.roles[0] == 'parent' ? parent : enfant} alt="logo" />
          <p> {userData.firstName} {userData.lastName}</p>
      </div>
  );
}
