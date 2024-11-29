import { useEffect, useState } from "react";
import { fetchCompanyProfile } from "../../../company-api-clients";
function CompanyProfile() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetchCompanyProfile();
      setProfile(res);
    };
    fetchProfile();
  }, []);

  console.log(profile);
  return (
    <div>
      <h1>Company Profile</h1>
    </div>
  );
}

export default CompanyProfile;
