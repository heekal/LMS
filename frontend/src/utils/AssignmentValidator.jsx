import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import axios from "../api/axios";

export default function AssignmentValidator() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await axios.get(
          `/api/mahasiswa/course/${params.courseUuid}/${params.assignmentUuid}`
        );
        const assignment = res.data.data[0];
        const correctSlug = assignment.quizName.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

        if (params.assignmentName !== correctSlug) {
          navigate(
            `/mahasiswa/course/${params.courseUuid}/${params.courseName}/${params.assignmentUuid}/${correctSlug}`,
            { replace: true }
          );
          return;
        }

        setLoading(false);
      } catch (err) {
        navigate("/not-found", { replace: true });
      }
    };

    validate();
  }, [params.courseUuid, params.courseName, params.assignmentUuid, params.assignmentName]);

  if (loading) return <div className="text-center py-10">{params.courseUuid} {params.courseName} {params.assignmentUuid} {params.assignmentName}</div>;

  return <Outlet />;
}
