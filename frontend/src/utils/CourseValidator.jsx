import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import axios from "../api/axios";

export default function ValidatorRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await axios.get(`/api/mahasiswa/course/${params.courseUuid}`);
        const course = res.data.data;

        const correctSlug = course.courseName
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

        if (params.courseName !== correctSlug) {
          navigate(`/mahasiswa/course/${params.courseUuid}/${correctSlug}`, { replace: true });
          return;
        }

        setLoading(false);
      } catch (err) {
        navigate("/not-found", { replace: true });
      }
    };

    validate();
  }, [params.courseUuid, params.courseName]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return <Outlet />;
}
