import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../../../components/Loading";

const Settings = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/fitness/settings/account");
  }, []);

  return <Loading />;
};

export default Settings;
