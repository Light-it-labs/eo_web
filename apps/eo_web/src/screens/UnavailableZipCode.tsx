import { useLocation, useNavigate } from "react-router-dom";

import { Button, Typography } from "@eo/ui";

import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

export const UnavailableZipCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { zip } = location.state as { zip: string };

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center px-2">
        <Typography variant="large" font="bold" className="mx-10 text-center">
          Sorry, this eo offering is not currently{" "}
          <br className="hidden md:block" />
          available in {zip}. We’ll notify you
          <br className="hidden md:block" />
          when we have licensed clinicians in your area.{" "}
        </Typography>
        <div className="mt-10 flex flex-row justify-center">
          <Button
            className="text-center"
            onClick={() => navigate(ROUTES.zipCodeValidation)}
          >
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.home)}
            className="ml-4"
          >
            Continue
          </Button>
        </div>
      </div>
    </LayoutDefault>
  );
};
