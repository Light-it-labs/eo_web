import { useNavigate } from "react-router-dom";

import { Button, Typography } from "@eo/ui";

import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

export const EligibleProfile = () => {
  const navigate = useNavigate();

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large" className="mx-10 text-center">
          Looks like you’re eligible for eo! Next, we’ll get you to fill out
          <br />
          <br />
          Next, we’ll get you to fill out some information{" "}
          <br className="hidden md:block" /> so we can better serve you...
        </Typography>
        <div className="mt-10 flex flex-row justify-center">
          <Button
            className="text-center"
            onClick={() => navigate(ROUTES.profilingOne)}
          >
            Continue
          </Button>
        </div>
      </div>
    </LayoutDefault>
  );
};
